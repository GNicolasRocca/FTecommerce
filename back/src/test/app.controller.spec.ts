import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Raiz', () => {
    it('Deberia devolver: Hola bienvenido 11000010 10100001 01000101 01101110 01100011 01101111 01101110 01110100 01110010 01100001 01110011 01110100 01100101 00100000 01110101 01101110 00100000 01100101 01100001 01110011 01110100 01100101 01110010 00100000 01100101 01100111 01100111 00100001', () => {
      expect(appController.home_init()).toBe(
        'Hola bienvenido 11000010 10100001 01000101 01101110 01100011 01101111 01101110 01110100 01110010 01100001 01110011 01110100 01100101 00100000 01110101 01101110 00100000 01100101 01100001 01110011 01110100 01100101 01110010 00100000 01100101 01100111 01100111 00100001',
      );
    });
  });
});
