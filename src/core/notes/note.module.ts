import { Module } from "@nestjs/common";
import { NoteRepositoryPrisma } from "./data-access/note-prisma.repository";
import { ReadNoteService } from "./domain/service/read-note.service";
import { WriteNoteService } from "./domain/service/write-transaction.service";
import { NoteController } from "./entry-points/transaction.controller";
import { PrismaService } from "@/service/prisma.service";

@Module({
  controllers: [NoteController],
  providers: [
    WriteNoteService,
    ReadNoteService,
    {
      provide: 'NoteRepository',
      useClass: NoteRepositoryPrisma
    },
    PrismaService
  ],
  exports: [ReadNoteService]
})
export class NoteModule {}