import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection
{
  private logger: Logger = new Logger('AppGateWay');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`client connected ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    client.emit('message', 'Hello world!');
  }
}
