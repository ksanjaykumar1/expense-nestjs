import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }
  createReport(type: ReportType, createReportDto: CreateReportDto) {
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
    return newReport;
  }
  updateReport(type: ReportType, id: string, createReportDto: CreateReportDto) {
    const { source, amount } = createReportDto;

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

    return data.report[reportIndex];
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
