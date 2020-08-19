import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../../service/sales-data.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css'],
})
export class SectionSalesComponent implements OnInit {
  constructor(private _salesDataService: SalesDataService) {}

  salesDataByState: any;
  salesDataByCustomer: any;

  ngOnInit(): void {
    this._salesDataService.getOrdersByState().subscribe((res) => {
      this.salesDataByState = res;
    });
    this._salesDataService.getOrdersByCustomer(5).subscribe((res) => {
      this.salesDataByCustomer = res;
    });
  }
}
