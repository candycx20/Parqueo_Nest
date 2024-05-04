import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class TicketService {
  constructor(
    private prismaService: PrismaService, private httpService: HttpService
  ){}

  async getAllTickets() {
    try {
        const result = await this.prismaService.tickets.findMany();
        return result;
    } catch (error) {
        console.log(error);
        throw error;   
        }
    }

    async createTicket(data) {
        try {
            const result = await this.prismaService.tickets.create({
                data
            });
            const response = await lastValueFrom(this.httpService.post('http://localhost:8000/tickets/', result));
            return result;
        } catch (error) {
            console.log(error);
            throw error;   
        }
    }
}
