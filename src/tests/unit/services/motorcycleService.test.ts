// import { expect } from 'chai';
// import { Model } from 'mongoose';
// import Sinon from 'sinon';
// import MotorcycleService from '../../../services/MotorcycleService';
// import MotorcycleModel from '../../../models/MotorcycleModel';

// describe('Service tests', () => {

//   class motorcycleMock extends MotorcycleModel{
//     create = Sinon.stub().resolves('This is a brand new Fusca')
//   }
//   const motorcycleMockModel = new motorcycleMock({} as any)

//   const motorcycleService = new MotorcycleService(motorcycleMockModel)

//   const objCreateMock = {
//     model: 'Audi A3',
//     year: 2016,
//     color: 'Preto',
//     status: true,
//     buyValue: 80000,
//     category: 'Street' as 'Street' | 'Custom' | 'Trail',
//     engineCapacity: 125,
//   }

//   const findMock = [{}]

//   const objUpdateMock = {
//     model: 'Carango',
//     year: 2000,
//     color: 'Branco',
//     status: true,
//     buyValue: 10000,
//     category: 'Custom' as 'Street' | 'Custom' | 'Trail',
//     engineCapacity: 1500,
//   }

//   it('Testa o método create da função instanciada', async () => {
//     Sinon.stub(Model, "create").resolves(objCreateMock)

//     const resultTest = await motorcycleService.create(objCreateMock);

//     expect(resultTest).to.be.equal(objCreateMock);
//   });

//   it('Testa o método read da função instanciada', async () => {
//     Sinon.stub(Model, "find").resolves(findMock)

//     const resultTest = await motorcycleService.read();
//     expect(resultTest).to.be.an('array');
//     expect(resultTest[0]).to.be.an('object');
//   });

//   it('Testa o método readOne da função instanciada', async () => {
//     Sinon.stub(Model, "findOne").resolves({ _id: 1, ...objCreateMock })

//     const resultTest = await motorcycleService.readOne('1');
//     expect(resultTest).to.deep.equal({ _id: 1, ...objCreateMock });
//   });

//   it('Testa o método update da função instanciada', async () => {
//     Sinon.stub(Model, "findOneAndUpdate").resolves({ _id: 5, ...objUpdateMock })

//     const resultTest = await motorcycleService.update('5', objUpdateMock);
//     expect(resultTest).to.deep.equal({ _id: 5, ...objUpdateMock });

//   });

//   it('Testa o método delete da função instanciada', async () => {
//     Sinon.stub(Model, "findOneAndDelete").resolves()

//     await motorcycleService.delete('1');
//     const resultTest2 = await motorcycleService.readOne('1');
//     expect(resultTest2).to.not.includes({ id: 1 });
//   });

//   after(function () {
//     Sinon.restore();
//   });

// });