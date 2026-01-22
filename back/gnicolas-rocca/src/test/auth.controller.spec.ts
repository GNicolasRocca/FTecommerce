jest.mock('../auth/auth.service.ts', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => ({
      signin_app: jest.fn(),
      signup_app: jest.fn(),
    })),
  };
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('AuthController debe estar definido', () => {
    expect(authController).toBeDefined();
  });

  it('AuthController debe llamar a singup_app', async () => {
    const user = {
      name: 'Julian Perez',
      email: 'test@mail.com',
      password: 'Hola1234$',
      phone: 124235604,
      country: 'Argentina',
      city: 'Cordoba',
      is_admin: false,
    };

    authService.signup_app.mockResolvedValue({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Julian Perez',
      email: 'test@mail.com',
      phone: 124235604,
      country: 'Argentina',
      city: 'Cordoba',
      is_admin: false,
      orders: [],
    });

    const result = await authController.singup_to_app(user);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(authService.signup_app).toHaveBeenCalledWith(user);
    expect(result).toEqual({
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Julian Perez',
      email: 'test@mail.com',
      phone: 124235604,
      country: 'Argentina',
      city: 'Cordoba',
      is_admin: false,
      orders: [],
    });
  });

  it('AuthController debe llamar a signin_app', async () => {
    const body = { email: 'test@mail.com', password: 'Hola1234$' };

    authService.signin_app.mockResolvedValue({
      message: 'Usuario logueado correctamente',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      token: 'fake_token',
    });

    const result = await authController.signin_to_app(body);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(authService.signin_app).toHaveBeenCalledWith(body);
    expect(result).toEqual({
      message: 'Usuario logueado correctamente',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      token: 'fake_token',
    });
  });
});
