jest.mock('../Users/users.repository', () => {
  return {
    UsersRepository: jest.fn().mockImplementation(() => ({
      sing_up: jest.fn(),
      sign_in: jest.fn(),
    })),
  };
});

import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../Users/users.repository';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, UsersRepository],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('AuthService debe estar definido', () => {
    expect(authService).toBeDefined();
  });
});
// Hacer el test de esto y de aca saltar al signup y signin. Por ultimo podria volver al auth_controller
