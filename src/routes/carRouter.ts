import { Router } from 'express';
import GenericController from '../controllers/GenericController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: GenericController<T>,
    // route: string = controller.route,
  ) {
    this.router.get('/cars', controller.read);
    this.router.get('/cars/:id', controller.readOne);
    this.router.post('/cars', controller.create);
    this.router.put('/cars/:id', controller.update);
    this.router.delete('/cars/:id', controller.delete);
  }
}

export default CustomRouter;
