import { Module } from '@nestjs/common';
import { NoteModule } from './core/notes/note.module';
import { UserModule } from './core/user/note.module';

@Module({
  imports: [UserModule, NoteModule],
})
export class AppModule {}
