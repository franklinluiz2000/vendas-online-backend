import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { authorizationToLoginPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext): number => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization token not found');
    }

    const loginPayload = authorizationToLoginPayload(authorization);

    if (!loginPayload?.id) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    return loginPayload.id;
  },
);
