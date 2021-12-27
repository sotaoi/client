declare class RouterEvents {
    static listeners: {
        [key: string]: {
            [key: string]: () => void;
        };
    };
    protected static redirectingTo: false | string;
    protected static executingRedirect: boolean;
    protected static isRunningConditions: boolean;
    static listen(event: string, callback: () => void): () => void;
    static fire(event: string): void;
    static redirect(to: string): void;
    static setExecuteRedirect(): void;
    static getRedirectTo(): false | string;
    static endRedirect(): void;
    static isRedirecting(): boolean;
    static isExecutingRedirect(): boolean;
    static setIsRunningConditions(flag: boolean): void;
    static getIsRunningConditions(): boolean;
}
export { RouterEvents };
