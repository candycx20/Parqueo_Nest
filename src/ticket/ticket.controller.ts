import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
    constructor(
        private ticketService: TicketService
      ){}

    @Get()
    async getAllTickets(){
        return this.ticketService.getAllTickets();
    }
    
    @Post("/create")
    async createTicket(
        @Body() data: any
    ){
        return this.ticketService.createTicket(data);
    }

}
