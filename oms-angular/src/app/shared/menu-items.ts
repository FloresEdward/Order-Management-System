import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
        role: '',
    },
    {
        state: 'category',
        name: 'Category',
        type: 'link',
        icon: 'category',
        role: '',
    },
    {
        state: 'product',
        name: 'Product',
        type: 'link',
        icon: 'fastfood',
        role: '',
    },
    {
        state: 'order',
        name: 'Order',
        type: 'link',
        icon: 'local_mall',
        role: '',
    },
    {
        state: "order-status",
        name: 'Manage Orders',
        type: 'link',
        icon: 'rate_review',
        role: '',
    },
    {
        state: 'users',
        name: 'Manage Users',
        type: 'link',
        icon: 'group',
        role: '',
    },
]

@Injectable()
export class MenuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}