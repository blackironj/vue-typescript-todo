<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsTodos="todos" @removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:clearAll="clearAll"></TodoFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";
import TodoStorage, { TodoStatus, TodoStruct } from "./todo";

@Component({
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter
  }
})
export default class App extends Vue {
  private todos: Array<TodoStruct> = [];

  private todoStorage = new TodoStorage();

  private addTodo(text: string): void {
    const todo = {} as TodoStruct;
    todo.status = TodoStatus.INCOMPLETE;
    todo.text = text;

    this.todos.push(todo);
  }

  private removeTodo(index: number): void {
    this.todos.splice(index, 1);
  }

  private clearAll(): void {
    this.todos = [];
  }

  private get(s: TodoStatus): Array<TodoStruct> {
    switch (s) {
      case TodoStatus.COMPLETE:
        return this.todos.filter(t => t.status === TodoStatus.COMPLETE);
      case TodoStatus.INCOMPLETE:
        return this.todos.filter(t => t.status === TodoStatus.INCOMPLETE);
      default:
        return this.todos;
    }
  }
  //created
  created() {
    this.todos = this.todoStorage.fetch();
  }

  //watcher
  @Watch("todos")
  todolistChanged(todos: Array<TodoStruct>) {
    this.todoStorage.save(todos);
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
