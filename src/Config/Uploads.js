
import multer from "multer";
import path from 'path';


//MÉTODO MULT-PART FORM DATA PARA RECEBER UMA IMAGENS
export default{
    
    storage: multer.diskStorage({
    
        destination: path.resolve(__dirname, '..','..','Uploads'),
        filename: (req, file, callback) => {
            
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            
            callback(null, `${name}-${Date.now()}${ext}`);
        },
    })
};