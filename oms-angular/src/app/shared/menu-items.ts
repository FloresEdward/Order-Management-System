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
        name: 'Manage Category',
        type: 'link',
        icon: 'category',
        role: '',
    },
    {
        state: 'product',
        name: 'Manage Menu',
        type: 'link',
        icon: 'fastfood',
        role: '',
    },
    {
        state: "create-order",
        name: 'Create Order',
        type: 'link',
        icon: 'rate_review',
        role: '',
    },
    {
        state: 'manage-order',
        name: 'Manage Order',
        type: 'link',
        icon: 'local_mall',
        role: '',
    },
    {
        state: 'users',
        name: 'Manage Accounts',
        type: 'link',
        icon: 'group',
        role: '',
    },
    {
        state: 'order-history',
        name: 'Order History',
        type: 'link',
        icon: 'history',
        role: '',
    },
]

@Injectable()
export class MenuItems {
    getMenuItem(): Menu[] {
        return MENUITEMS;
    }
}