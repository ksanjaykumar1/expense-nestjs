import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('reports/income')
export class AppController {
  @Get()
  getAllReports() {
    return [];
  }
  @Get('/:id')
  getReportById(@Param('id') id: string) {
    return id;
  }

  @Post()
  createReport() {
    return 'Created';
  }

  @Put(':id')
  updateReport() {
    return 'Updated';
  }

  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
