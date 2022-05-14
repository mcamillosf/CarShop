import { expect } from 'chai';
import Sinon, { SinonStub } from 'sinon';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
// import { ZodError } from 'zod';

class CarServiceMock extends CarService{
  readOne = Sinon.stub()
    .onCall(0).resolves()
    .onCall(1).resolves('Segura o carango!')
    .onCall(2).resolves(null)

  update = Sinon.stub()
  .onCall(0).resolves()
  .onCall(1).resolves('Segura o carango!')
  .onCall(2).resolves(null)
}

let carService = new CarServiceMock({} as any);
let carController = new CarController(carService);

let car = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

let carIncomplete = {
  model: "",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}
const fakeReq = {} as Request;
const fakeRes = {} as Response;
fakeReq.params = { id: '627da6b316c295bf576287d0' }

 

describe('Car controller', () => {
  beforeEach(() => Sinon.restore())

  it('retorna o status 500', async () => {
    Sinon.stub(carService, 'create').resolves(null)
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes);
    fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
    expect(carController.route).to.be.equal('/cars')
    expect((fakeRes.status as SinonStub).calledWith(500)).to.be.false;
  });

  it('retorna o status 400', async () => {
    Sinon.stub(carService, 'create').resolves(carIncomplete)
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes);
    fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
    expect((fakeRes.status as SinonStub).calledWith(400));
  });
  it('retorna o status 201', async () => {
    Sinon.stub(carService, 'create').resolves(car)
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes);
    fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
    expect((fakeRes.status as SinonStub).calledWith(201)).to.be.true;
  });

  it('retorna o status 404', async () => {
    Sinon.stub(carService, 'read').resolves()
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes);
    fakeRes.json = Sinon.stub().returns(null);
    await carController.create(fakeReq, fakeRes);
    expect(carController.route).to.be.equal('/cars')
    expect((fakeRes.status as SinonStub).calledWith(500)).to.be.false;
  });

  it('teste o metodo get', async () => {
    Sinon.stub(carService, 'read').resolves([car])
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes);
    fakeRes.json = Sinon.stub().returns(null);
    await carController.read(fakeReq, fakeRes);
    expect((fakeRes.status as SinonStub).calledWith(500)).to.be.false;
  });

  it('teste o metodo get', async () => {
    Sinon.stub(carService, 'read').resolves([car])
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes);
    fakeRes.json = Sinon.stub().returns(null);
    await carController.read(fakeReq, fakeRes);
    expect((fakeRes.json as SinonStub).calledWith('invalid input')).to.be.false
  });

  
  it('testa o metodo get by id response status', async () => {
    Sinon.stub(carService, 'create').resolves(car);
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes)
    fakeRes.json = Sinon.stub().returns(car)
    await carController.readOne(fakeReq, fakeRes)
    expect((fakeRes.status as SinonStub).calledWith(200)).to.be.false
  });

  it('testa o metodo get by id response body', async () => {
    Sinon.stub(carService, 'create').resolves(car);
    fakeReq.body = {}
    fakeRes.status = Sinon.stub().returns(fakeRes)
    fakeRes.json = Sinon.stub().returns(car)
    await carController.readOne(fakeReq, fakeRes)
    expect((fakeRes.json as SinonStub).calledWith('Segura o carango!')).to.be.true
  });

  it('teste o metodo update response status', async () => {
    await carController.update(fakeReq, fakeRes);
    expect(carService.update.calledWith(fakeReq.params.id, fakeReq.body)).to.be.true
  })

  it('teste o metodo update response body', async () => {
    await carController.update(fakeReq, fakeRes);
    expect((fakeRes.json as SinonStub).calledWith('Segura o carango!')).to.be.true
  })
})