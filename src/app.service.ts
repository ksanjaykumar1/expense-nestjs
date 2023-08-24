import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportResponseDto } from './dto/report-response.dto';

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }
  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDto(report);
  }
  createReport(
    type: ReportType,
    createReportDto: CreateReportDto,
  ): ReportResponseDto {
    const { source, amount } = createReportDto;
    const newReport = {
      id: uuid(),
      source,
      amount,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(
    type: ReportType,
    id: string,
    updateReportDto: UpdateReportDto,
  ): ReportResponseDto {
    const { source, amount } = updateReportDto;

    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) {
      throw new NotFoundException(
        `report with id ${id} doesn't exist in ${type}`,
      );
    }
    const reportIndex = data.report.findIndex((report) => report.id === id);
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      source,
      amount,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }
  deleteReport(type: ReportType, id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      throw new NotFoundException(
        `report with id ${id} doesn't exist in ${type}`,
      );
    }
    data.report.splice(reportIndex, 1);
    return;
  }
}
