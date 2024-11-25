
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class LikesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private connectedUsers: Map<number, string> = new Map();


    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.connectedUsers.set(Number(userId), client.id);
            console.log(`User ${userId} connected with socket ID ${client.id}`);
        }
    }


    handleDisconnect(client: Socket) {
        for (const [userId, socketId] of this.connectedUsers.entries()) {
            if (socketId === client.id) {
                this.connectedUsers.delete(userId);
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    }


    notifyPostOwner(postOwnerId: number, message: string) {
        const socketId = this.connectedUsers.get(postOwnerId);
        if (socketId) {
            this.server.to(socketId).emit('notification', { message });
            console.log(`Notification sent to user ${postOwnerId}: ${message}`);
        } else {
            console.log(`Post owner with ID ${postOwnerId} is not connected.`);
        }
    }

}





// import {
//     WebSocketGateway,
//     OnGatewayInit,
//     SubscribeMessage,
//     WebSocketServer,
//     MessageBody,
//     ConnectedSocket,
// } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';
// import { LikeService } from './like.service';

// @WebSocketGateway()
// export class LikeGateway implements OnGatewayInit {
//     @WebSocketServer() server: Server;

//     constructor(private readonly likeService: LikeService) { }

//     // Called when a socket client is connected
//     afterInit(server: Server) {
//         console.log('Socket.IO server initialized');
//     }

//     // Handling incoming like request
//     @SubscribeMessage('likePost')
//     async handleLikePost(@MessageBody() data: { postId: number; userId: number }, @ConnectedSocket() socket: Socket) {
//         // Call the LikeService to like the post
//         const likeResponse = await this.likeService.likePost(data);

//         // Emit the 'postLiked' event to the post owner
//         const postOwnerSocketId = this.getSocketIdForUser(likeResponse.like.post.user.id); // Assuming you store user socket IDs somewhere

//         if (postOwnerSocketId) {
//             this.server.to(postOwnerSocketId).emit('postLiked', {
//                 message: `${likeResponse.like.user.name} liked your post "${likeResponse.like.post.title}"`,
//                 postId: likeResponse.like.post.id,
//                 likedByUserId: likeResponse.like.user.id,
//             });
//         }

//         return likeResponse;
//     }

//     // Function to get the Socket ID of the user (assuming you store it somewhere like in a Map or in-memory store)
//     // private getSocketIdForUser(userId: number): string | undefined {
//     //     // Retrieve the socket ID from where you store it (e.g., Redis, in-memory, etc.)
//     //     // This is just a placeholder
//     //     return this.socket.id;
//     // }
// }
