import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-anonymous';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  public validate(payload: unknown, request: unknown): unknown {
    return request;
  }
}
