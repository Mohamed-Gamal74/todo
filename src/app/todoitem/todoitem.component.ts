import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Todo } from '../todo';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css'],
})
export class TodoitemComponent implements OnInit {
  isLight: boolean = false;
  todo: Todo[] = [];
  inProgressList: Todo[] = [];
  completedList: Todo[] = [];

  constructor(
    private _AppService: AppService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._AppService.light.subscribe((value) => {
      this.isLight = value;
    });
    this._AppService.todo.subscribe((value) => {
      this.todo = value;
    });
    this._AppService.inProgressList.subscribe((value) => {
      this.inProgressList = value;
    });
    this._AppService.completedList.subscribe((value) => {
      this.completedList = value;
    });

    this._AppService.getInProgressList();
    this._AppService.getTodo();
    this._AppService.getCompletedList();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.container.id === 'cdk-drop-list-0') {
        window.localStorage.setItem(
          'inProgressList',
          JSON.stringify(event.previousContainer.data)
        );
        window.localStorage.setItem('todo', JSON.stringify(this.todo));
      } else if (event.container.id === 'cdk-drop-list-1') {
        this._AppService.addInProgressItem(event.previousContainer.data);
      } else if (event.container.id === 'cdk-drop-list-2') {
        this._AppService.addCompletedItem(event.previousContainer.data);
      }
    }
  }

  removeTodoHandler(item: Todo) {
    this._AppService.removeTodoItem(item);
    this._snackBar.open('Task removed successfully', 'close', {
      duration: 2000,
      panelClass: ['snackbarDelete'],
    });
  }

  editTodo(item: Todo) {
    this._AppService.editTodoItem(item);
  }
}
