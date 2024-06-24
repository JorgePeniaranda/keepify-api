import { Expose } from 'class-transformer';
import { type UserPrimitive } from './user.primitive';
import { Note } from '@/core/notes/domain/note.entity';
import { hashSync, compareSync } from 'bcryptjs';

export class User implements UserPrimitive {
  readonly #id: UserPrimitive['id'];
  #email: UserPrimitive['email'];
  #secret: UserPrimitive['secret'];
  readonly #createdAt: UserPrimitive['createdAt'];
  #updatedAt: UserPrimitive['updatedAt'];

  constructor(note: UserPrimitive) {
    this.#id = note.id;
    this.#email = note.email;
    this.#secret = note.secret;
    this.#createdAt = note.createdAt;
    this.#updatedAt = note.updatedAt;
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS

  readonly note?: Note[];

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Expose()
  public get id(): UserPrimitive['id'] {
    return this.#id;
  }

  @Expose()
  public get email(): UserPrimitive['email'] {
    return this.#email;
  }

  public set email(value: UserPrimitive['email']) {
    this.#email = value;
    this.#updateUpdatedAt();
  }

  @Expose()
  public get secret(): UserPrimitive['secret'] {
    return this.#secret;
  }

  public set secret(value: UserPrimitive['secret']) {
    this.#secret = hashSync(value);
    this.#updateUpdatedAt();
  }

  @Expose()
  public get createdAt(): UserPrimitive['createdAt'] {
    return this.#createdAt;
  }

  @Expose()
  public get updatedAt(): UserPrimitive['updatedAt'] {
    return this.#updatedAt;
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt(): void {
    this.#updatedAt = new Date();
  }

  public comparePassword(value: string): boolean {
    return compareSync(value, this.#secret);
  }

  public static create({
    email,
    secret,
  }: {
    email: UserPrimitive['email'];
    secret: UserPrimitive['secret'];
  }): User {
    return new User({
      id: '',
      email,
      secret,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public toJSON(): UserPrimitive {
    return {
      id: this.#id,
      email: this.#email,
      secret: this.#secret,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}
