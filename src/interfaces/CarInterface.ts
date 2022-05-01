import joi from 'joi';
import { Vehicle } from './VehicleInterface';

export interface Car extends Vehicle {
  doorsQty: number,
  seatsQty: number,
}

export const CarSchema = joi.object({
  model: joi.string().min(3).required(),
  year: joi.number().min(1900).max(2022).required(),
  color: joi.string().min(3).required(),
  status: joi.boolean(),
  buyValue: joi.number().integer().required(),
  doorsQty: joi.number().min(2).max(4).required(),
  seatsQty: joi.number().min(2).max(7).required(),
});