import React from 'react';
import { State } from '@sotaoi/contracts/state';
import { Action, Dispatch } from 'redux';
import { RequestAbortHandlerAbstract } from '@sotaoi/contracts/transactions';
import { RecordRef } from '@sotaoi/contracts/artifacts';
import { SocketListener } from '@sotaoi/contracts/http/socket-contract';
interface NoProps {
}
interface RouteData<ComponentProps = NoProps> {
    params: ComponentProps;
    appState: State;
}
declare abstract class RouteComponent<ComponentProps> extends React.Component<ComponentProps> {
    protected component: (props: RouteData<ComponentProps>) => null | React.ReactElement;
    web(props: RouteData<ComponentProps>): null | React.ReactElement;
    mobile(props: RouteData<ComponentProps>): null | React.ReactElement;
    electron(props: RouteData<ComponentProps>): null | React.ReactElement;
    constructor(props: ComponentProps);
    extendedView<ViewComponentProps>(extendedView: null | {
        prototype: ViewComponent<ViewComponentProps>;
    } | React.Component<ViewComponentProps> | React.FunctionComponent<ViewComponentProps>, props: ViewComponentProps): null | React.ReactElement;
    errorComponent(props: {
        error: Error;
    }): null | React.ReactElement;
    asset(item: null | string, role?: string): null | string;
    assets(items: null | string, role?: string): null | string[];
    readonly render: () => null | React.ReactElement;
}
declare abstract class RouteCpComponent<RouteCpComponentProps> extends RouteComponent<RouteCpComponentProps> {
    abstract display(props: RouteData<RouteCpComponentProps>): null | React.ReactElement;
    web(props: RouteData<RouteCpComponentProps>): null | React.ReactElement;
    mobile(props: RouteData<RouteCpComponentProps>): null | React.ReactElement;
    electron(props: RouteData<RouteCpComponentProps>): null | React.ReactElement;
}
interface ViewData<ComponentProps, MappedState extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, DispatchProps extends Action = {
    type: string;
    value: any;
}> {
    results: {
        [key: string]: any;
    };
    props: ComponentProps;
    state: MappedState;
    dispatch: Dispatch<DispatchProps>;
}
interface ViewState {
    results: {
        [key: string]: any;
    };
    success: boolean;
    done: boolean;
}
interface ViewPromises<ComponentProps> {
    [key: string]: (props: ComponentProps, requestAbortHandler: any) => Promise<any>;
}
declare abstract class ViewComponent<ComponentProps extends {
    [key: string]: any;
}, State extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, MappedState extends {
    [key: string]: any;
} = {
    [key: string]: any;
}, DispatchProps extends Action = {
    type: string;
    value: any;
}> extends React.Component<ComponentProps> {
    abstract promises(props: ComponentProps): ViewPromises<ComponentProps>;
    state: ViewState;
    protected unmounted: boolean;
    protected requestAbortHandler: any;
    protected refreshes: {
        [key: string]: RecordRef;
    };
    protected refreshRemoveRedirect: {
        [key: string]: null | string;
    };
    protected refreshListeners: {
        [key: string]: SocketListener;
    };
    protected component: (data: ViewData<ComponentProps, MappedState, DispatchProps>) => null | React.ReactElement;
    protected dispatch: Dispatch<DispatchProps>;
    web(data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement;
    mobile(data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement;
    electron(data: ViewData<ComponentProps, MappedState, DispatchProps>): null | React.ReactElement;
    constructor(props: ComponentProps);
    updateState(state: ViewState): void;
    errorComponent(props: {
        error: Error;
    }): null | React.ReactElement;
    asset(item: null | string, role?: string): null | string;
    assets(items: null | string, role?: string): null | string[];
    mapStateToProps(state: State, props: Omit<ViewData<ComponentProps, MappedState, DispatchProps>, 'dispatch'>): MappedState;
    refresh(key: string, recordRef: RecordRef, refreshRemoveRedirect: null | string): void;
    readonly componentDidMount: () => void;
    readonly componentWillUnmount: () => void;
    readonly componentDidUpdate: (prevProps: Readonly<ComponentProps>, prevState: Readonly<ViewState>, snapshot: any) => void;
    readonly render: () => null | React.ReactElement;
    protected parsePromises(promises: ViewPromises<any>, props: ComponentProps, state: ViewState): Promise<any>;
    protected parseRefreshers(): void;
    protected abortRefreshers(): void;
}
declare class RequestAbortHandler extends RequestAbortHandlerAbstract {
    constructor();
    abort(): void;
    register(abort: () => void): void;
    clear(): void;
}
declare const GenericErrorComponent: (props: NoProps) => JSX.Element;
export { RouteComponent, RouteCpComponent, ViewComponent, RequestAbortHandler, GenericErrorComponent };
export type { RouteData, ViewData, ViewPromises };
