import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  employees: any[] = [];

  constructor(
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
  }

  generateReport() {
    this.reportService.generate().subscribe((data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    });
  }

}
