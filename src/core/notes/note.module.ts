import { Module } from "@nestjs/common";
import { NoteRepositoryMock } from "./data-access/note-mock.repository";
import { ReadNoteService } from "./domain/service/read-note.service";
import { WriteNoteService } from "./domain/service/write-transaction.service";
import { NoteController } from "./entry-points/transaction.controller";

@Module({
  controllers: [NoteController],
  providers: [
    WriteNoteService,
    ReadNoteService,
    {
      provide: 'NoteRepository',
      useClass: NoteRepositoryMock
    },
  ],
  exports: [ReadNoteService]
})
export class NoteModule {}