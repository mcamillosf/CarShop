// import CustomRouter from './routes/GenericRouter';
import CarRouter from './routes/carRoute';
import MotorCycleRouter from './routes/motorcycleRoute';
import App from './app';

import CarController from './controllers/CarController';
import MotorcycleController from './controllers/MotorcycleController';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CarRouter<Car>();
const motorcycleRouter = new MotorCycleRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;