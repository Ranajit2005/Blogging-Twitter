import {connect, ConnectOptions} from "mongoose";

let isConnected: boolean = false;
export const connectionDatabase = async () => {

    if(!process.env.DATABASE_URL){
        return console.log("database is not connected");
    }
    
    if(isConnected){
        return console.log("database is already connected");
    }

   try {
     const options: ConnectOptions = {
         dbName: "twitter-clone",
         autoCreate: true,
     };
 
     await connect(process.env.DATABASE_URL,options)
 
     isConnected = true;
 
     console.log("database is connected successfully");
   } catch (error) {
        console.log("database connected error",error);
   }
};
