import { type PayloadPrimitive } from './primitive/payload.primitive';
import { Expose } from 'class-transformer';

export class JwtPayload implements PayloadPrimitive {
  readonly #id: PayloadPrimitive['id'];

  constructor({ id }: { id: PayloadPrimitive['id'] }) {
    this.#id = id;
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Expose()
  public get id(): PayloadPrimitive['id'] {
    return this.#id;
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public toJSON(): PayloadPrimitive {
    return {
      id: this.id,
    };
  }
}
