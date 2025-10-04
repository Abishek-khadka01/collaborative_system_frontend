import { Socket, io } from "socket.io-client";

class SocketSingleton {
    private static  SocketInstance : Socket | null  = null;

    private static ConnectSocket (){



    }

    public  static GetInstance (){
        if(!this.SocketInstance){
            this.ConnectSocket();
        }

        return this.SocketInstance;
    } 


    public  static EmitEvent<T> (EventName : string , Data : T ){
        this.SocketInstance?.emit(EventName, Data);
    }

    // for listening to the events
     // the callback function will be implemented 
    public static OnEvent<T>(EventName : string ,callback  : (data : T )=>void)  {
        
        this.SocketInstance?.on(EventName, callback);
    }
}

export default SocketSingleton;