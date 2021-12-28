import type { SvgCssUri as SvgCssUriType } from '@sotaoi/client/definitions/react-native-svg';
import React from 'react';
import { Navigation } from '@sotaoi/client/router/navigation';
import { State } from '@sotaoi/contracts/state';
import { Helper } from '@sotaoi/client/helper';
import { store } from '@sotaoi/client/store';
import { Action, Dispatch } from 'redux';
import { ListenerEvent, ListenerEventType, RequestAbortHandlerAbstract } from '@sotaoi/contracts/transactions';
import { RecordRef } from '@sotaoi/contracts/artifacts';
import { socket } from '@sotaoi/client/socket';
import { SocketListener } from '@sotaoi/contracts/http/socket-contract';
import { pushRoute } from '@sotaoi/client/router';
import { getPackage } from '@sotaoi/client/mpackages';
import { settings } from '@sotaoi/client/settings';

interface NoProps {}

interface RouteData<ComponentProps = NoProps> {
  params: ComponentProps;
  appState: State;
}
abstract class RouteComponent<ComponentProps> extends React.Component<ComponentProps> {
  protected component: (props: RouteData<ComponentProps>) => null | React.ReactElement;

  public web(props: RouteData<ComponentProps>): null | React.ReactElement {
    return null;
  }
  public mobile(props: RouteData<ComponentProps>): null | React.ReactElement {
    return null;
  }
  public electron(props: RouteData<ComponentProps>): null | React.ReactElement {
    return null;
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {};
    switch (true) {
      case Helper.isWeb():
        this.component = (data: RouteData<ComponentProps>): null | React.ReactElement => {
          try {
            return this.web(data);
          } catch (err: any) {
            const Component = this.errorComponent;
            return <Component error={err} />;
          }
        };
        break;
      case Helper.isMobile():
        this.component = (data: RouteData<ComponentProps>): null | React.ReactElement => {
          try {
            return this.mobile(data);
          } catch (err: any) {
            const Component = this.errorComponent;
            return <Component error={err} />;
          }
        };
        break;
      case Helper.isElectron():
        this.component = (data: RouteData<ComponentProps>): null | React.ReactElement => {
          try {
            return this.electron(data);
          } catch (err: any) {
            const Component = this.errorComponent;
            return <Component error={err} />;
          }
        };
        break;
      default:
        throw new Error('Unknown environment');
    }
  }

  public extendedView<ViewComponentProps>(
    extendedView:
      | null
      | { prototype: ViewComponent<ViewComponentProps> }
      | React.Component<ViewComponentProps>
      | React.FunctionComponent<ViewComponentProps>,
    props: ViewComponentProps
  ): null | React.ReactElement {
    if (!extendedView) {
      return null;
    }
    let Render: any = extendedView;
    for (const extendedComponent of Navigation.extendedComponents) {
      Object.getPrototypeOf(extendedComponent).toString() === extendedView.toString() && (Render = extendedComponent);
    }
    return <Render {...props} />;
  }

  public errorComponent(props: { error: Error }): null | React.ReactElement {
    console.error(props.error);
    return <GenericErrorComponent />;
  }

  public asset(item: null | string, role = 'assets'): null | string {
    return Helper.asset(item, role);
  }
  public assets(items: null | string, role = 'assets'): null | string[] {
    return (items && JSON.parse(items).map((item: string) => Helper.asset(item, role))) || null;
  }

  public readonly render = (): null | React.ReactElement => {
    const appState = store().getState();
    const params = Navigation.getParams<ComponentProps>();
    const Component = this.component;
    return <Component appState={appState} params={params} />;
  };
}

abstract class RouteCpComponent<RouteCpComponentProps> extends RouteComponent<RouteCpComponentProps> {
  abstract display(props: RouteData<RouteCpComponentProps>): null | React.ReactElement;

  public web(props: RouteData<RouteCpComponentProps>): null | React.ReactElement {
    return this.display(props);
  }
  public mobile(props: RouteData<RouteCpComponentProps>): null | React.ReactElement {
    return this.display(props);
  }
  public electron(props: RouteData<RouteCpComponentProps>): null | React.ReactElement {
    return this.display(props);
  }
}

interface ViewData<
  ComponentProps,
  MappedState extends { [key: string]: any } = { [key: string]: any },
  DispatchProps extends Action = { type: string; value: any }
> {
  results: { [key: string]: any };
  props: ComponentProps;
  state: MappedState;
  dispatch: Dispatch<DispatchProps>;
}
interface ViewState {
  results: { [key: string]: any };
  success: boolean;
  done: boolean;
}
interface ViewPromises<ComponentProps> {
  // [key: string]: (props: ComponentProps, requestAbortHandler: RequestAbortHandler) => Promise<any>;
  [key: string]: (props: ComponentProps, requestAbortHandler: any) => Promise<any>;
}
abstract class ViewComponent<
  ComponentProps extends { [key: string]: any },
  State extends { [key: string]: any } = { [key: string]: any },
  MappedState extends { [key: string]: any } = { [key: string]: any },
  DispatchProps extends Action = { type: string; value: any }
> extends React.Component<ComponentProps> {
  abstract promises(props: ComponentProps): ViewPromises<ComponentProps>;

  public state: ViewState;
  protected unmounted: boolean;
  // protected requestAbortHandler: RequestAbortHandler;
  protected requestAbortHandler: any;
  protected refreshes: { [key: string]: RecordRef } = {};
  protected refreshRemoveRedirect: { [key: string]: null | string } = {};
  protected refreshListeners: { [key: string]: SocketListener } = {};

  protected component: (data: ViewData<ComponentProps, MappedState, DispatchProps>) => null | React.ReactElement;
  protected dispatch: Dispatch<DispatchProps>;

  public web(data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement {
    return null;
  }
  public mobile(data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement {
    return null;
  }
  public electron(data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement {
    return null;
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      results: {},
      success: true,
      done: false,
    };
    this.unmounted = false;
    this.requestAbortHandler = new RequestAbortHandler();

    switch (true) {
      case Helper.isWeb():
        this.component = (data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement => {
          try {
            return this.web(data);
          } catch (err: any) {
            const Component = this.errorComponent;
            return <Component error={err} />;
          }
        };
        break;
      case Helper.isMobile():
        this.component = (data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement => {
          try {
            return this.mobile(data);
          } catch (err: any) {
            const Component = this.errorComponent;
            return <Component error={err} />;
          }
        };
        break;
      case Helper.isElectron():
        this.component = (data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement => {
          try {
            return this.electron(data);
          } catch (err: any) {
            const Component = this.errorComponent;
            return <Component error={err} />;
          }
        };
        break;
      default:
        throw new Error('Unknown environment');
    }
    this.dispatch = <T extends DispatchProps>(action: T): T => Navigation.reduxStore?.dispatch(action) || action;
  }

  public updateState(state: ViewState): void {
    !this.unmounted && this.setState(state);
  }

  public errorComponent(props: { error: Error }): null | React.ReactElement {
    console.error(props.error);
    return <GenericErrorComponent />;
  }

  public asset(item: null | string, role = 'assets'): null | string {
    return Helper.asset(item, role);
  }
  public assets(items: null | string, role = 'assets'): null | string[] {
    return (items && JSON.parse(items).map((item: string) => Helper.asset(item, role))) || null;
  }

  public mapStateToProps(
    state: State,
    props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>
  ): MappedState {
    return state as any;
  }

  public refresh(key: string, recordRef: RecordRef, refreshRemoveRedirect: null | string): void {
    this.refreshes[key] = recordRef;
    this.refreshRemoveRedirect[key] = refreshRemoveRedirect;
  }

  public readonly componentDidMount = (): void => {
    this.unmounted = false;
    this.state.success = true;
    if (this.state.done) {
      return;
    }
    this.parsePromises(this.promises(this.props), this.props, this.state).then((state) => this.updateState(state));
  };

  public readonly componentWillUnmount = (): void => {
    this.unmounted = true;
    this.requestAbortHandler.abort();
    this.abortRefreshers();
  };

  public readonly componentDidUpdate = (
    prevProps: Readonly<ComponentProps>,
    prevState: Readonly<ViewState>,
    snapshot: any
  ): void => {
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

  public readonly render = (): null | React.ReactElement => {
    if (!this.state.done) {
      return null;
    }
    if (!this.state.success) {
      console.error('one or more promises failed:', this.state.results);
      return null;
    }

    const connect = Navigation.reactRedux.connect;
    const Component = this.component;
    if (Navigation.reduxStore) {
      // const Connect = connect<
      //   { state: MappedState },
      //   undefined,
      //   Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>,
      //   State
      // >((state: State, props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>) => ({
      //   state: this.mapStateToProps(state, props),
      // }))((props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>) => {
      const Connect = connect(
        (state: State, props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>) => ({
          state: this.mapStateToProps(state, props),
        })
      )((props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>) => {
        return (
          <Component
            dispatch={this.dispatch.bind(this)}
            results={this.state.results}
            props={this.props}
            state={props.state}
          />
        );
      });
      return <Connect results={this.state.results} props={this.props} state={{} as MappedState} />;
    }
    return (
      <Component
        dispatch={this.dispatch.bind(this)}
        results={this.state.results}
        props={this.props}
        state={{} as MappedState}
      />
    );
  };

  protected parsePromises(promises: ViewPromises<any>, props: ComponentProps, state: ViewState): Promise<any> {
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

  protected parseRefreshers(): void {
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
              redirectRoute && pushRoute(redirectRoute);
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
        !settings().bootstrapOptions.disableSocket &&
          socket().io().on(ListenerEvent(ListenerEventType.DB.Records.UPDATED, recordRef), listener);
        !settings().bootstrapOptions.disableSocket &&
          socket().io().on(ListenerEvent(ListenerEventType.DB.Records.REMOVED, recordRef), listener);
      } catch (err) {
        console.warn(err);
      }
      this.refreshListeners[recordRef.serialize()] = listener;
    });
  }

  protected abortRefreshers(): void {
    if (!Object.keys(this.refreshListeners).length) {
      return;
    }
    Object.entries(this.refreshListeners).map(([key, listener]) => {
      try {
        !settings().bootstrapOptions.disableSocket &&
          socket()
            .io()
            .off(ListenerEvent(ListenerEventType.DB.Records.UPDATED, RecordRef.deserialize(key)), listener);
        !settings().bootstrapOptions.disableSocket &&
          socket()
            .io()
            .off(ListenerEvent(ListenerEventType.DB.Records.REMOVED, RecordRef.deserialize(key)), listener);
      } catch (err) {
        console.warn(err);
      }
    });
  }
}

class RequestAbortHandler extends RequestAbortHandlerAbstract {
  constructor() {
    super();
    this.aborts = [];
  }

  public abort(): void {
    this.aborts.map((abort) => abort());
  }

  public register(abort: () => void): void {
    this.aborts.push(abort);
  }

  public clear(): void {
    this.aborts = [];
  }
}

const GenericErrorComponent = (props: NoProps) => {
  if (Helper.isWeb()) {
    return <img src={`/sotaoi/errors/error.svg`} style={{ margin: 10, width: 100, height: 100 }} />;
  }
  if (Helper.isMobile()) {
    const { View } = require('react-native');
    const SvgCssUri = getPackage<typeof SvgCssUriType>('svgCssUri');
    return (
      <View style={{ flex: 1, margin: 20 }}>
        <View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <SvgCssUri uri={`/sotaoi/errors/error.svg`} width={200} height={200} />
        </View>
      </View>
    );
  }
  if (Helper.isElectron()) {
    throw new Error('Electron not yet implemented');
  }
  throw new Error('Unknown environment');
};

export { RouteComponent, RouteCpComponent, ViewComponent, RequestAbortHandler, GenericErrorComponent };
export type { RouteData, ViewData, ViewPromises };
