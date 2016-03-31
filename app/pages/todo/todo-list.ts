import {Component} from "angular2/core";
import {TodoService} from "./todo-service";
import {TodoModel} from "./todo-model";

@Component({
  selector: 'todo-list',
  providers: [TodoService],
  template: `<div>
              <ul>
                <li *ngFor="#todo of todoService.todos">
                  {{todo.title}}
                </li>
              </ul>
            </div>`
})
export class TodoList {
  todoModel: TodoModel = new TodoModel();
  
  constructor(public todoService:TodoService){}
  
}