import Router from 'express';
import multer from 'multer';

import SessionController from './Controllers/SessionController';
import HouseController from './Controllers/HouseController';
import UploadConfig from './Config/Uploads';
import DashBoardController from './Controllers/DashBoardController';
const routes = new Router();

const upload = multer(UploadConfig);

//CRIAR UM USUÁRIO
routes.post('/session', SessionController.store);



////////////////////////////////////////////////////////////////////////////////////////////////
//ROTA PARA DASHBOARD
routes.get('/dashboard', DashBoardController.show)
//ROTA PARA LISTAR AS CASAS
routes.get('/houses', HouseController.index);
//ROTA PARA CRIAR UMA NOVA CASA
routes.post('/houses', upload.single('thumbnail') , HouseController.store);
//ROTA PARA ATUALIZAR UMA CASA
routes.put('/houses/:house_id', upload.single('thumbnail') , HouseController.update)
//ROTA PARA DELETAR UMA CASA
routes.delete('/houses', HouseController.destroy)


export default routes;