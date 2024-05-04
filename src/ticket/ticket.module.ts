import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  providers: [TicketService],
  controllers: [TicketController],
  imports: [PrismaModule, HttpModule]
})
export class TicketModule {}
