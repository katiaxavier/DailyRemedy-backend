import express from 'express';

import UserController from './app/controllers/UserController';
import RemedyController from './app/controllers/RemedyController';
// import ProfileController from './controllers/ProfileController';
import SessionController from './app/controllers/SessionController';

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.put('/users', UserController.update);

// routes.get('/remedys', RemedyController.index); 
routes.post('/remedys', RemedyController.store); 
routes.delete('/remedys/:id', RemedyController.delete);

// routes.get('/profile', ProfileController.index);



export default routes;