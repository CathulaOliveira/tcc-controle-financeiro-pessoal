import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  public readonly defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['my-snackbar-class']
  };

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message: string, classCss?: string) {
    this.defaultConfig.panelClass = [classCss];
    this.snackBar.open(message, null, this.defaultConfig);
  }
}
