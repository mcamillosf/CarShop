import { Request, Response } from 'express';
import GenericController, { 
  RequestWithBody, ResponseError } from './GenericController';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

class CarController extends GenericController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(400).json({ error: this.erros.notFound });
      }
      if ('error' in car) {
        return res.status(400).json(car);
      }
      return res.status(201).json(car);
    } catch (error) {
      return res.status(400).json({ error: 'invalid input' });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        console.log('caiu aqui');
        return res.status(400).json({ error: this.erros.idLength });
      }
      const car = await this.service.readOne(id);
      return car
        ? res.json(car)
        : res.status(404).json({ error: this.erros.notFound });
    } catch (error) {
      return res.status(400).json(
        { error: 'Id must have 24 hexadecimal characters' },
      );
    }
  };

  update = async (
    req: Request,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      const car = await this.service.update(id, body);
      if (!car) {
        return res.status(404).json({ error: this.erros.notFound });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      const car = await this.service.delete(id);
      if (!car) {
        return res.status(404).json({ error: this.erros.notFound });
      }
      return res.status(204).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };
}

export default CarController;
