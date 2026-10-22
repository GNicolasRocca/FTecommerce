import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production'
      ? []
      : ['.env.development'],
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        // Desde la funcion configService hasta el return se puede poner en una funcion asi queda mas limpio
        const ormConfig = configService.get<TypeOrmModuleOptions>('typeorm');

        if (!ormConfig) {
          throw new Error('Configuración de TypeORM no encontrada');
        }

        return ormConfig;
      },
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    CloudinaryModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '2h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
