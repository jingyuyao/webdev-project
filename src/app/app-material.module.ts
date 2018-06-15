import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
  ],
})
export class AppMaterialModule { }
