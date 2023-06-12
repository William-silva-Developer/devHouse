import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';

const login = process.env.LOGIN_USER;
const password = process.env.LOGIN_PASSWORD;

class App{
    
    constructor() {
        this.server = express();
        mongoose.connect(`mongodb+srv://${login}:${password}@devhouse.dqbhhp6.mongodb.net/`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        this.middlewares();
        this.routes();
    };
    
    middlewares() {
        
        this.server.use('/files', express.static(path.resolve(__dirname, '..','Uploads')) )
        this.server.use(express.json());
    
    }
    
    routes() {
    
        this.server.use(routes);
    
    }
}

export default new App().server;