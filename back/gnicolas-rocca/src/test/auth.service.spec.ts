import { Test } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';

it('Creamos una instancia de AuthService', async () => {
  const module = await Test.createTestingModule({
    providers: [AuthService],
  }).compile();

  const authService = module.get<AuthService>(AuthService);
  expect(authService).toBeDefined();
});

// Hacer el test de esto y de aca saltar al signup y signin
// fijarse porque en la carpeta de gnicolas-rocca no puedo acceder a los archivos
