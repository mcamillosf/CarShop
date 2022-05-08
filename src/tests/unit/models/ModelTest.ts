import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../../../interfaces/CarInterface';
import GenericModel from '../../../models/GenericModel';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class GenericModelTest extends GenericModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}
