import { Request, Response } from 'express';
import GenericController, { 
  RequestWithBody, ResponseError } from './GenericController';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends GenericController<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(400).json({ error: this.erros.notFound });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (error) {
      return res.status(400).json({ error: 'invalid input' });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.json(motorcycle)
        : res.status(404).json({ error: this.erros.notFound });
    } catch (error) {
      return res.status(400).json(
        { error: 'Id must have 24 hexadecimal characters' },
      );
    }
  };

  update = async (
    req: Request,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      const motorcycle = await this.service.update(id, body);
      if (!motorcycle) {
        return res.status(404).json({ error: this.erros.notFound });
      }
      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.erros.idLength });
      }
      const motorcycle = await this.service.delete(id);
      if (!motorcycle) {
        return res.status(404).json({ error: this.erros.notFound });
      }
      return res.status(204).json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };
}

export default MotorcycleController;
