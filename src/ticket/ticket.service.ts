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

            const ticketData = {
                ...data,
                estado: 0
            };

            const result = await this.prismaService.tickets.create({
                data: ticketData
            });

            const response = await lastValueFrom(this.httpService.post('http://localhost:8000/tickets/', result));
            const nuevoEstado = response.data.estado;

            await this.prismaService.tickets.update({
                where: { id: result.id },
                data: { estado: nuevoEstado }
            });

            return result;
        } catch (error) {
            console.log(error);
            throw error;   
        }
    }
}
