import mongose, { Connection } from "mongoose"
type ConnectionObject = {
    isConnected?:number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected) {
        console.log("Already Connected To database")
        return
    }

    try{
        const db = await mongose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected =db.connections[0].readyState

        console.log("DB Connected Sucessfully")
    } catch(error) {
        console.log("Database Connection Failed",error);
        process.exit(1);
    }

}


export default dbConnect