"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericErrorComponent = exports.RequestAbortHandler = exports.ViewComponent = exports.RouteCpComponent = exports.RouteComponent = void 0;
const react_1 = __importDefault(require("react"));
const navigation_1 = require("@sotaoi/client/router/navigation");
const helper_1 = require("@sotaoi/client/helper");
const store_1 = require("@sotaoi/client/store");
const transactions_1 = require("@sotaoi/contracts/transactions");
const artifacts_1 = require("@sotaoi/contracts/artifacts");
const socket_1 = require("@sotaoi/client/socket");
const router_1 = require("@sotaoi/client/router");
const mpackages_1 = require("@sotaoi/client/mpackages");
const settings_1 = require("@sotaoi/client/settings");
class RouteComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.render = () => {
            const appState = store_1.store().getState();
            const params = navigation_1.Navigation.getParams();
            const Component = this.component;
            return react_1.default.createElement(Component, { appState: appState, params: params });
        };
        this.state = {};
        switch (true) {
            case helper_1.Helper.isWeb():
                this.component = (data) => {
                    try {
                        return this.web(data);
                    }
                    catch (err) {
                        const Component = this.errorComponent;
                        return react_1.default.createElement(Component, { error: err });
                    }
                };
                break;
            case helper_1.Helper.isMobile():
                this.component = (data) => {
                    try {
                        return this.mobile(data);
                    }
                    catch (err) {
                        const Component = this.errorComponent;
                        return react_1.default.createElement(Component, { error: err });
                    }
                };
                break;
            case helper_1.Helper.isElectron():
                this.component = (data) => {
                    try {
                        return this.electron(data);
                    }
                    catch (err) {
                        const Component = this.errorComponent;
                        return react_1.default.createElement(Component, { error: err });
                    }
                };
                break;
            default:
                throw new Error('Unknown environment');
        }
    }
    web(props) {
        return null;
    }
    mobile(props) {
        return null;
    }
    electron(props) {
        return null;
    }
    extendedView(extendedView, props) {
        if (!extendedView) {
            return null;
        }
        let Render = extendedView;
        for (const extendedComponent of navigation_1.Navigation.extendedComponents) {
            Object.getPrototypeOf(extendedComponent).toString() === extendedView.toString() && (Render = extendedComponent);
        }
        return react_1.default.createElement(Render, Object.assign({}, props));
    }
    errorComponent(props) {
        console.error(props.error);
        return react_1.default.createElement(GenericErrorComponent, null);
    }
    asset(item, role = 'assets') {
        return helper_1.Helper.asset(item, role);
    }
    assets(items, role = 'assets') {
        return (items && JSON.parse(items).map((item) => helper_1.Helper.asset(item, role))) || null;
    }
}
exports.RouteComponent = RouteComponent;
class RouteCpComponent extends RouteComponent {
    web(props) {
        return this.display(props);
    }
    mobile(props) {
        return this.display(props);
    }
    electron(props) {
        return this.display(props);
    }
}
exports.RouteCpComponent = RouteCpComponent;
class ViewComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.refreshes = {};
        this.refreshRemoveRedirect = {};
        this.refreshListeners = {};
        this.componentDidMount = () => {
            this.unmounted = false;
            this.state.success = true;
            if (this.state.done) {
                return;
            }
            this.parsePromises(this.promises(this.props), this.props, this.state).then((state) => this.updateState(state));
        };
        this.componentWillUnmount = () => {
            this.unmounted = true;
            this.requestAbortHandler.abort();
            this.abortRefreshers();
        };
        this.componentDidUpdate = (prevProps, prevState, snapshot) => {
            if (Object.keys(prevProps).length !== Object.keys(this.props).length) {
                this.parsePromises(this.promises(this.props), this.props, this.state).then((state) => this.updateState(state));
                return;
            }
            for (const index of Object.keys(prevProps)) {
                if (prevProps[index] !== this.props[index]) {
                    this.parsePromises(this.promises(this.props), this.props, this.state).then((state) => this.updateState(state));
                    return;
                }
            }
        };
        this.render = () => {
            if (!this.state.done) {
                return null;
            }
            if (!this.state.success) {
                console.error('one or more promises failed:', this.state.results);
                return null;
            }
            const connect = navigation_1.Navigation.reactRedux.connect;
            const Component = this.component;
            if (navigation_1.Navigation.reduxStore) {
                // const Connect = connect<
                //   { state: MappedState },
                //   undefined,
                //   Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>,
                //   State
                // >((state: State, props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>) => ({
                //   state: this.mapStateToProps(state, props),
                // }))((props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>) => {
                const Connect = connect((state, props) => ({
                    state: this.mapStateToProps(state, props),
                }))((props) => {
                    return (react_1.default.createElement(Component, { dispatch: this.dispatch.bind(this), results: this.state.results, props: this.props, state: props.state }));
                });
                return react_1.default.createElement(Connect, { results: this.state.results, props: this.props, state: {} });
            }
            return (react_1.default.createElement(Component, { dispatch: this.dispatch.bind(this), results: this.state.results, props: this.props, state: {} }));
        };
        this.state = {
            results: {},
            success: true,
            done: false,
        };
        this.unmounted = false;
        this.requestAbortHandler = new RequestAbortHandler();
        switch (true) {
            case helper_1.Helper.isWeb():
                this.component = (data) => {
                    try {
                        return this.web(data);
                    }
                    catch (err) {
                        const Component = this.errorComponent;
                        return react_1.default.createElement(Component, { error: err });
                    }
                };
                break;
            case helper_1.Helper.isMobile():
                this.component = (data) => {
                    try {
                        return this.mobile(data);
                    }
                    catch (err) {
                        const Component = this.errorComponent;
                        return react_1.default.createElement(Component, { error: err });
                    }
                };
                break;
            case helper_1.Helper.isElectron():
                this.component = (data) => {
                    try {
                        return this.electron(data);
                    }
                    catch (err) {
                        const Component = this.errorComponent;
                        return react_1.default.createElement(Component, { error: err });
                    }
                };
                break;
            default:
                throw new Error('Unknown environment');
        }
        this.dispatch = (action) => { var _a; return ((_a = navigation_1.Navigation.reduxStore) === null || _a === void 0 ? void 0 : _a.dispatch(action)) || action; };
    }
    web(data) {
        return null;
    }
    mobile(data) {
        return null;
    }
    electron(data) {
        return null;
    }
    updateState(state) {
        !this.unmounted && this.setState(state);
    }
    errorComponent(props) {
        console.error(props.error);
        return react_1.default.createElement(GenericErrorComponent, null);
    }
    asset(item, role = 'assets') {
        return helper_1.Helper.asset(item, role);
    }
    assets(items, role = 'assets') {
        return (items && JSON.parse(items).map((item) => helper_1.Helper.asset(item, role))) || null;
    }
    mapStateToProps(state, props) {
        return state;
    }
    refresh(key, recordRef, refreshRemoveRedirect) {
        this.refreshes[key] = recordRef;
        this.refreshRemoveRedirect[key] = refreshRemoveRedirect;
    }
    parsePromises(promises, props, state) {
        this.requestAbortHandler.abort();
        this.abortRefreshers();
        return new Promise((resolve) => {
            Promise.all(Object.values(promises).map((promise) => promise(props, this.requestAbortHandler)))
                .then((res) => {
                Object.keys(promises).map((key, index) => {
                    typeof res[index].success !== 'undefined' && !res[index].success && (state.success = false);
                    state.results[key] = res[index];
                });
                this.parseRefreshers();
            })
                .catch((err) => {
                console.error(err);
            })
                .finally(() => {
                this.requestAbortHandler.clear();
                resolve({ results: state.results, success: state.success, done: true });
            });
        });
    }
    parseRefreshers() {
        this.abortRefreshers();
        if (!Object.keys(this.refreshes).length) {
            return;
        }
        Object.entries(this.refreshes).map(([key, recordRef]) => {
            const listener = () => {
                const promise = this.promises(this.props)[key];
                if (!promise) {
                    return;
                }
                this.requestAbortHandler.abort();
                const state = this.state;
                promise(this.props, this.requestAbortHandler)
                    .then((res) => {
                    if (res && res.code === 404) {
                        const redirectRoute = this.refreshRemoveRedirect[key];
                        redirectRoute && router_1.pushRoute(redirectRoute);
                        return;
                    }
                    state.results[key] = res;
                    this.updateState(state);
                })
                    .catch((err) => {
                    console.error(err);
                })
                    .finally(() => {
                    this.requestAbortHandler.clear();
                });
            };
            try {
                !settings_1.settings().bootstrapOptions.disableSocket &&
                    socket_1.socket().io().on(transactions_1.ListenerEvent(transactions_1.ListenerEventType.DB.Records.UPDATED, recordRef), listener);
                !settings_1.settings().bootstrapOptions.disableSocket &&
                    socket_1.socket().io().on(transactions_1.ListenerEvent(transactions_1.ListenerEventType.DB.Records.REMOVED, recordRef), listener);
            }
            catch (err) {
                console.warn(err);
            }
            this.refreshListeners[recordRef.serialize()] = listener;
        });
    }
    abortRefreshers() {
        if (!Object.keys(this.refreshListeners).length) {
            return;
        }
        Object.entries(this.refreshListeners).map(([key, listener]) => {
            try {
                !settings_1.settings().bootstrapOptions.disableSocket &&
                    socket_1.socket()
                        .io()
                        .off(transactions_1.ListenerEvent(transactions_1.ListenerEventType.DB.Records.UPDATED, artifacts_1.RecordRef.deserialize(key)), listener);
                !settings_1.settings().bootstrapOptions.disableSocket &&
                    socket_1.socket()
                        .io()
                        .off(transactions_1.ListenerEvent(transactions_1.ListenerEventType.DB.Records.REMOVED, artifacts_1.RecordRef.deserialize(key)), listener);
            }
            catch (err) {
                console.warn(err);
            }
        });
    }
}
exports.ViewComponent = ViewComponent;
class RequestAbortHandler extends transactions_1.RequestAbortHandlerAbstract {
    constructor() {
        super();
        this.aborts = [];
    }
    abort() {
        this.aborts.map((abort) => abort());
    }
    register(abort) {
        this.aborts.push(abort);
    }
    clear() {
        this.aborts = [];
    }
}
exports.RequestAbortHandler = RequestAbortHandler;
const GenericErrorComponent = (props) => {
    if (helper_1.Helper.isWeb()) {
        return react_1.default.createElement("img", { src: `/sotaoi/errors/error.svg`, style: { margin: 10, width: 100, height: 100 } });
    }
    if (helper_1.Helper.isMobile()) {
        const { View } = require('react-native');
        const SvgCssUri = mpackages_1.getPackage('svgCssUri');
        return (react_1.default.createElement(View, { style: { flex: 1, margin: 20 } },
            react_1.default.createElement(View, { style: { width: 200, height: 200, justifyContent: 'center', alignItems: 'center' } },
                react_1.default.createElement(SvgCssUri, { uri: `/sotaoi/errors/error.svg`, width: 200, height: 200 }))));
    }
    if (helper_1.Helper.isElectron()) {
        throw new Error('Electron not yet implemented');
    }
    throw new Error('Unknown environment');
};
exports.GenericErrorComponent = GenericErrorComponent;
