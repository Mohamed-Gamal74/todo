import { Todo } from './../todo';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  isLight: boolean = false;
  todo: any = '';
  constructor(
    private _AppService: AppService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._AppService.inputValue.subscribe((value) => {
      this.todo = value;
    });
  }

  changeBackground() {
    this._AppService.changeBackground();
    this.isLight = this._AppService.light.value;
  }

  addTodo(event: any) {
    if (event.target.value === '') {
      this._snackBar.open('Please enter a valid task', 'close', {
        duration: 2000,
      });
    } else {
      this._AppService.addTodoItem({ description: event.target.value });
      this.todo = '';
      this._snackBar.open('Task added successfully', 'close', {
        duration: 2000,
        panelClass: ['snackbar'],
      });
    }
  }
}
