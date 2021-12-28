import { SocketContract, SocketClass, SocketOptions } from '@sotaoi/contracts/http/socket-contract';
declare class SocketService extends SocketContract {
    protected _io: null | SocketClass;
    connect(url: string, options: SocketOptions): SocketClass;
    io(): SocketClass;
}
export { SocketService };
