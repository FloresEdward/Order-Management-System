import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users = [
    { user: 'John Doe', role: 'Admin', module: 'm_Category, m_Product, m_Order, m_User, m_Role' },
    { user: 'Jane Smith', role: 'Order Reviewer', module: 'm_Order' },
    { user: 'User3', role: 'Order Manager', module: 'm_Order' },
    { user: 'User4', role: 'Rider', module: 'm_OrderStatus' },
    { user: 'User5', role: 'Category Manager', module: 'm_Category' },
    { user: 'User6', role: 'Product Manager', module: 'm_Product' },
    { user: 'User7', role: 'Account Manager', module: 'm_User' },
    { user: 'User8', role: 'Role Manager (could have)', module: 'm_Role' },
    { user: 'User9', role: 'Teller (create order only)', module: 'c_Order' },
  ];

}
