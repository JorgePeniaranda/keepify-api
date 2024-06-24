import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module';
import { NoteModule } from './core/notes/note.module';
import { UserModule } from './core/user/note.module';

@Module({
  imports: [AuthModule, UserModule, NoteModule],
})
export class AppModule {}
