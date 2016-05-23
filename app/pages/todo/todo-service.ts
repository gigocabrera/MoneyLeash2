import {Injectable} from "@angular/core";
import {TodoModel} from "./todo-model";

@Injectable()
export class TodoService{
  todos:[TodoModel] = [
    new TodoModel("Fuck"),
    new TodoModel("Shit"),
    new TodoModel("Sleep"),
  ];
}