import { Controller, Get, Param, Req } from '@nestjs/common';
import { DemandeService } from './demande.service';

@Controller()
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  @Get('/demandes')
  findAll(@Req() req: Request) {
    return this.demandeService.findAll(req);
  }

  @Get('demandes/:id')
  findOne(@Param('id') id: string) {
    return this.demandeService.findOne(id);
  }

  //* Unused Endpoints
  /*
  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create(createDemandeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDemandeDto: UpdateDemandeDto) {
      return this.demandeService.update(id, updateDemandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeService.remove(id);
  }
  */
}
