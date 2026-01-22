jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

import { UsersService } from '../Users/users.service';
import { UsersController } from '../Users/users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsersService = {
    seeder: jest.fn(),
    get_all_users: jest.fn(),
    no_params: jest.fn(),
    get_user_by_id: jest.fn(),
    update_user_id: jest.fn(),
    delete_user_id: jest.fn(),
  };

  const mockAuthGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockRolesGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('UsersController debe estar definido', () => {
    expect(usersController).toBeDefined();
  });

  it('UsersController debe llamar a al seeder', async () => {
    mockUsersService.seeder.mockResolvedValue([]);

    const result = await usersController.seeder_users();

    expect(mockUsersService.seeder).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
