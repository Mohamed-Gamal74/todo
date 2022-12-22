import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}
  light = new BehaviorSubject<boolean>(false);
  todo = new BehaviorSubject<Todo[]>([]);
  inProgressList = new BehaviorSubject<Todo[]>([]);
  completedList = new BehaviorSubject<Todo[]>([]);
  inputValue = new BehaviorSubject<string>('');

  changeBackground() {
    this.light.next(!this.light.value);
  }

  addTodoItem(todo: Todo) {
    this.todo.next([...this.todo.value, todo]);
    window.localStorage.setItem('todo', JSON.stringify(this.todo.value));
  }

  removeTodoItem(todo: Todo) {
    this.todo.next(this.todo.value.filter((item) => item !== todo));
    window.localStorage.setItem('todo', JSON.stringify(this.todo.value));
  }

  addInProgressItem(todo: Todo) {
    this.inProgressList.next([...this.inProgressList.value]);
    window.localStorage.setItem(
      'inProgressList',
      JSON.stringify(this.inProgressList.value)
    );
    this.removeTodoItem(todo);
  }

  addCompletedItem(todo: Todo) {
    this.completedList.next([...this.completedList.value]);
    window.localStorage.setItem(
      'completedList',
      JSON.stringify(this.completedList.value)
    );

    this.removeTodoItem(todo);
    window.localStorage.setItem(
      'inProgressList',
      JSON.stringify(this.inProgressList.value)
    );
  }

  getInProgressList() {
    const inProgressList = window.localStorage.getItem('inProgressList');
    if (inProgressList) {
      this.inProgressList.next(JSON.parse(inProgressList));
    }
  }

  getCompletedList() {
    const completedList = window.localStorage.getItem('completedList');
    if (completedList) {
      this.completedList.next(JSON.parse(completedList));
    }
  }

  getTodo() {
    const todo = window.localStorage.getItem('todo');
    if (todo) {
      this.todo.next(JSON.parse(todo));
    }
  }

  editTodoItem(todo: Todo) {
    this.inputValue.next(todo.description);
    this.removeTodoItem(todo);
  }
}
