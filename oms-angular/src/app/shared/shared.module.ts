import { NgModule } from '@angular/core';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MenuItems } from './menu-items';

//newly added imports
import { CardTitleComponent } from '../card-title/card-title.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardTitleComponent,
    SearchBarComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardTitleComponent,
    SearchBarComponent
   ],
  providers: [MenuItems]
})
export class SharedModule { }
