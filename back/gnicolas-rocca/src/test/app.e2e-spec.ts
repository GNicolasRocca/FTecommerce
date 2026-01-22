import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const mockAuthGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  const mockRolesGuard: CanActivate = {
    canActivate: jest.fn(() => true),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Post /auth/signup retorna un objeto con los datos del usuario creado', async () => {
    const body = {
      email: 'test-auth@mail.com',
      password: 'Test1234$',
      name: 'Test Auth',
      phone: 123456789,
      country: 'Argentina',
      city: 'Buenos Aires',
    };

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(body);

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('id');
  });

  it('Post /auth/signin retorna un objeto con el token, id y un mensaje', async () => {
    const user_log = {
      email: 'test-auth@mail.com',
      password: 'Test1234$',
    };

    const res = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user_log);

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user_id');
    expect(res.body).toHaveProperty('message');
  });

  it('Get /users/ retorna un array de usuarios con un status code OK', async () => {
    const req = await request(app.getHttpServer()).get('/users');
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /users/:id retorna un usuario con un status code OK', async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/dd8ec587-7466-462e-9058-8a5ad94ed4d9',
    );

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Post /users/seeder retorna una precarga de usuarios con un status code 201', async () => {
    const req = await request(app.getHttpServer()).post('/users/seeder');

    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
  });
});

// Para correr este archivo:  npm run test:e2e
