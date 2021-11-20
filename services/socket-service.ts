import { SocketContract, SocketClass, SocketOptions } from '@sotaoi/omni/contracts/socket-contract';
// @ts-ignore
import { io } from 'socket.io/client-dist/socket.io';

class SocketService extends SocketContract {
  protected _io: null | SocketClass = null;

  public connect(url: string, options: SocketOptions): SocketClass {
    this._io = io.connect(url, options);
    if (!this._io) {
      throw new Error('Socket connection failed');
    }
    this.io().on('socket:greetings', async (data) => {
      if (!data) {
        return;
      }
      console.info(`Server socket hailed (${typeof data}):`, data);
    });
    return this._io;
  }

  public io(): SocketClass {
    if (!this._io) {
      throw new Error('Socket is not yet connected');
    }
    return this._io;
  }
}

export { SocketService };
