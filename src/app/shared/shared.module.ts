import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { GrowlModule } from 'primeng/growl';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarModule,
    PanelMenuModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
    GrowlModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    ...fromComponents.components
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarModule,
    PanelMenuModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
    GrowlModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ...fromComponents.components
  ]
})
export class SharedModule { }
