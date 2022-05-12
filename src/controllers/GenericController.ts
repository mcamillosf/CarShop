import { Request, Response } from 'express';
import GenericService from '../services/GenericService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
  idLength = 'Id must have 24 hexadecimal characters',
}

abstract class GenericController<T> {
  // abstract route: string;

  protected erros = ControllerErrors;

  constructor(protected service: GenericService<T>) { }

  public async create(req: Request, res: Response): Promise<Response> {
    const createdCar = await this.service.create(req.body);
    return res.status(201).json(createdCar);
  }

  public read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (error) {
      return res.status(500).json({ error: this.erros.internal });
    }
  };

  public async readOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = await this.service.readOne(id);
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updatedCar = await this.service.update(req.params.id, req.body);
    return res.status(200).json(updatedCar);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deletedCar = await this.service.delete(req.params.id);
    return res.status(204).json(deletedCar);
  }
}

export default GenericController;
