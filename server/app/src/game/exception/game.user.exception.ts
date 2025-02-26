import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends NotFoundException {
  constructor(err: any) {
    super(err.message);
  }
}

export class UserAlreadyExistsError extends HttpException {
  constructor(err: any) {
    super(err.message, HttpStatus.BAD_REQUEST);
  }
}
