import { AfterViewInit, OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource: any;
  responseMessage: any;

  // ngAfterViewInit(): void { }
  
  constructor(){}

  ngOnInit(): void {
    
  }

  tableData() {

  }

  applyFilter() {

  }

  handleViewAction(values: any) {

  }

  handleDeleteAction(values:any) {
    
  }

  downloadReportAction(values:any) {

  }
}
