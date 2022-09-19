import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TodoModel} from '../model/todo.model';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>(null);
    $todos = this.todos.asObservable();

    constructor(private http: HttpClient) {}

    getAllTodos() {
      this.http.get(`${environment.todoUrl}/todos`).subscribe(
        (response: TodoModel[]) => {
          this.todos.next(response['data']);
        }
      );
      return this.$todos;
    }

    getTodo(id: number) {
      this.http.get(`${environment.todoUrl}/todos/` + id).subscribe(
        (response: TodoModel) => {
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    saveTodo(todo: TodoModel) {
      this.http.post(`${environment.todoUrl}/todos`, todo).subscribe(
        (response: TodoModel) => {
          this.getAllTodos();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    updateTodo(todo: TodoModel) {
      this.http.put(`${environment.todoUrl}/todos/${todo.id}`, todo).subscribe(
        (response: TodoModel) => {
          this.getAllTodos();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    removeTodo(todo: TodoModel) {
      this.http.delete(`${environment.todoUrl}/todos/${todo.id}`).subscribe(
        (response: any) => {
          this.getAllTodos();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    removeAllTodo() {
      this.http.delete(`${environment.todoUrl}/todos`).subscribe(
        (response: string) => {
          this.getAllTodos();
          return response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
}
