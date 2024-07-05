import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuidv4 } from 'uuid';

export const storage =  {
    storage: diskStorage({
        destination: './uploads/profileImages',
        filename: (req, file, cb) => {
            const uniqueName = uuidv4() + extname(file.originalname);
            cb(null, uniqueName);
        }
    })
}