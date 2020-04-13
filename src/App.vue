<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

@Component({
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter
  }
})
export default class App extends Vue {
  private todoItems: Array<string> = [];

  private addTodo(todoItem: string): void {
    const key = "todo:" + todoItem;
    localStorage.setItem(key, todoItem);
    this.todoItems.push(todoItem);
  }

  private clearAll(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key !== null && key.includes("todo:")) {
        localStorage.removeItem(key);
      }
    }
    this.todoItems = [];
  }

  private removeTodo(todoItem: string, index: number): void {
    localStorage.removeItem("todo:" + todoItem);
    this.todoItems.splice(index, 1);
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
