import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TodoModel} from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>(null);
  $todos = this.todos.asObservable();

  localTodo: TodoModel[] = [];  // local data avant límplementation du backend

  constructor(private http: HttpClient) {}

  getAllTodos() {
    this.todos.next(this.localTodo);
    return this.$todos;
  }

  getTodo(id: number) {
    return this.localTodo.filter((t: TodoModel) => {
      return t.id === id;
    });
  }

  saveTodo(todo: TodoModel) {
    todo.isEditing = false;
    todo.id = 20;
    this.localTodo.push(todo);
    this.getAllTodos();
  }

  removeTodo(todo: TodoModel) {
    this.localTodo = this.localTodo.filter((t: TodoModel) => {
      return t.id !== todo.id;
    });
    this.todos.next(this.localTodo);
  }

  updateTodo(todo: TodoModel) {
    this.localTodo.find((t: TodoModel) => {
      return t.id === todo.id;
    }).title = todo.title;
  }

  removeAllTodo() {
    this.localTodo = [];
    this.todos.next(this.localTodo);
  }
}
