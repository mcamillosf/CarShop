import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export interface Car extends Vehicle {
  doorsQty: number,
  seatsQty: number,
}

export const CarSchema = z.object({
  _id: z.string(),
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, { message: 'model must be 3 or more characters long' }),
  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).min(1900, { 
    message: 'year must be equal or higher than 1900' }).max(2022, {
    message: 'year must be equal or lower than 2022',
  }),
  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be a string',
  }).min(3, { message: 'color must be 3 or more characters long' }),
  status: z.boolean(),
  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).int(),
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).min(2, { 
    message: 'doorsQty must equal or higher than 2' }).max(4, {
    message: 'doorsQty must be equal or lower than 4',
  }),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).min(2, { 
    message: 'seatsQty must be equal or higher than 2' }).max(7, {
    message: 'seatsQty must be equal or lower than 7',
  }),
});