import mongoose from "mongoose"





 const Connection = async(username , password)=>{
    const URL = `mongodb://${username}:${password}@ac-fzsa709-shard-00-00.caopgqf.mongodb.net:27017,ac-fzsa709-shard-00-01.caopgqf.mongodb.net:27017,ac-fzsa709-shard-00-02.caopgqf.mongodb.net:27017/?ssl=true&replicaSet=atlas-unfhle-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
    try{

        await mongoose.connect(URL , {useNewUrlParser:true})
        console.log('Database connected')
    }catch(error){
        //console.log('yaha dikkat h')
        console.log('Error while connecting with database', error.message)
    }
}
 
export default  Connection




/*
        with the help of mongoose we make connection with database and backend

        we use dotenv package to save our username and password and not hardcoding it to our link

*/