import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url : `mongodb://${username}:${password}@ac-fzsa709-shard-00-00.caopgqf.mongodb.net:27017,ac-fzsa709-shard-00-01.caopgqf.mongodb.net:27017,ac-fzsa709-shard-00-02.caopgqf.mongodb.net:27017/?ssl=true&replicaSet=atlas-unfhle-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`,
    options :  { useNewUrlParser: true },
    file: (request, file) => {
         
          
            console.log('yaha h main')
         
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimetype) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});




export default multer({storage});
