"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = __importDefault(require("react"));
const helper_1 = require("@sotaoi/client/helper");
const route_change_1 = require("@sotaoi/client/router/route-change");
const Link = (props) => {
    if (helper_1.Helper.isWeb()) {
        if (typeof props.to === 'function') {
            return (react_1.default.createElement("a", { onClick: (ev) => {
                    ev.preventDefault();
                    typeof props.to === 'function' && props.to(ev);
                    return false;
                } }, props.children));
        }
        return (react_1.default.createElement("a", { href: props.to, onClick: (ev) => {
                ev.preventDefault();
                route_change_1.RouteChange.pushRoute(typeof props.to === 'string' ? props.to : '/', !props.noGoTop);
                return false;
            } }, props.children));
    }
    if (helper_1.Helper.isMobile()) {
        throw new Error('Please update this section');
        // const item = typeof props.children === 'string' ? <Text>{props.children}</Text> : props.children;
        // return (
        //   <TouchableOpacity
        //     hitSlop={{
        //       bottom: 10,
        //       left: 10,
        //       right: 10,
        //       top: 10,
        //     }}
        //     onPressOut={
        //       ((ev: any): void => {
        //         if (typeof props.to === 'function') {
        //           props.to(ev);
        //           return;
        //         }
        //         RouteChange.pushRoute(props.to);
        //       }) as any
        //     }
        //     style={{ opacity: 0.9 }}
        //   >
        //     {item}
        //   </TouchableOpacity>
        // );
    }
    if (helper_1.Helper.isElectron()) {
        // nothing here yet
        return null;
    }
    throw new Error('Unknown environment');
};
exports.Link = Link;
