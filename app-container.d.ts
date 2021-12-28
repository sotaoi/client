declare class AppContainer {
    protected services: {
        [key: string]: () => any;
    };
    get<ClassType>(type: string): ClassType;
    bind<ClassType>(type: string, implementation: any): void;
    singleton<ClassType>(type: string, implementation: () => ClassType): void;
    has(item: string): boolean;
}
export { AppContainer };
