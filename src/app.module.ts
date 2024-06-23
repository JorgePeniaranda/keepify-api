import { Module } from '@nestjs/common';
import { NoteModule } from './core/notes/note.module';

@Module({
  imports: [NoteModule],
})
export class AppModule {}
