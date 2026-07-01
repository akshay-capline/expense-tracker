import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors : {
    origin : '*'
  }
})
export class ExpenseGateway {

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket,) {

    console.log("data", data);
    // console.log("client", client);

    this.server.emit('message', data);
  }
  
}
