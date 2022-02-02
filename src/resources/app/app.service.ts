import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'RS School: nodejs2021Q4-service';
  }
}
