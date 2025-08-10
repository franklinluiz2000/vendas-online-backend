import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { authorizantionToLoginPayload } from '../utils/base-64-converter';

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext): number => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization token not found');
    }

    const loginPayload = authorizantionToLoginPayload(authorization);

    if (!loginPayload?.id) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    return loginPayload.id;
  },
);
