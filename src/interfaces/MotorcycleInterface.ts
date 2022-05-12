import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export interface Motorcycle extends Vehicle {
  category: 'Street' | 'Custom' | 'Trail',
  engineCapacity: number,
}

export const MotorcycleSchema = z.object({
  _id: z.string().optional(),
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
  status: z.boolean().optional(),
  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).int(),
  category: z.string({
    required_error: 'category is required',
    invalid_type_error: 'category must be a string',
  }),
  engineCapacity: z.number({
    required_error: 'engineCapacity is required',
    invalid_type_error: 'engineCapacity must be a number',
  }).min(1).max(2500),
});