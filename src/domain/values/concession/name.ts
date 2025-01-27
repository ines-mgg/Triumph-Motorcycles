import {
  ConcessionNameAlphanumericError,
  ConcessionNameLengthError,
} from '@triumph-motorcycles/domain/errors';

export class Name {
  private constructor(public readonly value: string) {}

  public static from(value: string): Name | Error {
    const regex = /^[a-zA-Z0-9.]+$/;

    if (value.length < 3 || value.length > 50) {
      return new ConcessionNameAlphanumericError();
    }

    if (!regex.test(value)) {
      return new ConcessionNameLengthError();
    }

    return new Name(value);
  }
}
