import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from '../data';
import { CreateReportDto } from '../dto/create-report.dto';
import { UpdateReportDto } from '../dto/update-report.dto';
import { ReportResponseDto } from '../dto/report-response.dto';
import { ReportService } from './report.service';

@Controller('reports/:type')
export class ReportController {
  constructor(private readonly appService: ReportService) {}
  @Get()
  getAllReports(@Param('type') type: ReportType): ReportResponseDto[] {
    return this.appService.getAllReports(type);
  }
  @Get('/:id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() createReportDto: CreateReportDto,
  ): ReportResponseDto {
    return this.appService.createReport(type, createReportDto);
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): ReportResponseDto {
    return this.appService.updateReport(type, id, updateReportDto);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.deleteReport(type, id);
  }
}
