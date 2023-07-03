import { AfterViewInit, OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource: any[] = [];
  responseMessage: any;

  // ngAfterViewInit(): void { }
  
  constructor(){}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.dataSource = [
      { name: 'John Doe', email: 'john.doe@example.com', contactNumber: '1234567890', paymentMethod: 'Credit Card', total: '$100' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', contactNumber: '9876543210', paymentMethod: 'PayPal', total: '$150' },
      // Add more data objects as needed
    ];
  }

  applyFilter() {

  }

  handleViewAction(values: any) {

  }

  handleDeleteAction(values:any) {

  }

  downloadReportAction(values:any) {

  }

  deleteBill() {

  }
}
