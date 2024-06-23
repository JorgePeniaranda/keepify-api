import { Expose } from 'class-transformer';
import { type NotePrimitive } from './note.primitive';

export class Note implements NotePrimitive {
  readonly #id: NotePrimitive['id'];
  readonly #idUser: NotePrimitive['idUser'];
  #idImage: NotePrimitive['idImage'];
  #title: NotePrimitive['title'];
  #content: NotePrimitive['content'];
  readonly #createdAt: NotePrimitive['createdAt'];
  #updatedAt: NotePrimitive['updatedAt'];

  constructor(note: NotePrimitive) {
    this.#id = note.id;
    this.#idUser = note.idUser;
    this.#idImage = note.idImage;
    this.#title = note.title;
    this.#content = note.content;
    this.#createdAt = note.createdAt;
    this.#updatedAt = note.updatedAt;
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  // readonly images: Image;

  // readonly user: User;

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Expose()
  public get id(): NotePrimitive['id'] {
    return this.#id;
  }

  @Expose()
  public get idUser(): NotePrimitive['idUser'] {
    return this.#idUser;
  }

  @Expose()
  public get idImage(): NotePrimitive['idImage'] {
    return this.#idImage;
  }

  public set idImage (value: NotePrimitive['idImage']) {
    this.#idImage = value
    this.#updateUpdatedAt()
  }

  @Expose()
  public get title(): NotePrimitive['title'] {
    return this.#title;
  }

  public set title (value: NotePrimitive['title']) {
    this.#title = value
    this.#updateUpdatedAt()
  }

  @Expose()
  public get content(): NotePrimitive['content'] {
    return this.#content;
  }

  public set content (value: NotePrimitive['content']) {
    this.#content = value
    this.#updateUpdatedAt()
  }

  @Expose()
  public get createdAt(): NotePrimitive['createdAt'] {
    return this.#createdAt;
  }

  @Expose()
  public get updatedAt(): NotePrimitive['updatedAt'] {
    return this.#updatedAt;
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public static create({
    idUser,
    idImage,
    title,
    content,
  }: {
    idUser: NotePrimitive['idUser'];
    idImage: NotePrimitive['idImage'];
    title: NotePrimitive['title'];
    content: NotePrimitive['content'];
  }): Note {
    return new Note({
      id: '',
      idUser,
      idImage,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public toJSON(): NotePrimitive {
    return {
      id: this.id,
      idUser: this.idUser,
      idImage: this.idImage,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
