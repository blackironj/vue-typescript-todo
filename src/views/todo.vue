<template>
  <div class="todo">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList
      v-on:toggleTodo="toggleTodo"
      v-bind:propsTodos="filteredTodos"
      @removeTodo="removeTodo"
    ></TodoList>
    <TodoFooter v-on:filterTodos="filterTodos"></TodoFooter>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TodoHeader from "@/components/TodoHeader.vue";
import TodoInput from "@/components/TodoInput.vue";
import TodoList from "@/components/TodoList.vue";
import TodoFooter from "@/components/TodoFooter.vue";
import TodoStorage, { TodoStatus, TodoStruct } from "@/todo";

@Component({
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter
  }
})
export default class Todo extends Vue {
  private todos: Array<TodoStruct> = [];
  private visibility = TodoStatus.DEFAULT;

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

  private filterTodos(status: TodoStatus): void {
    this.visibility = status;
  }

  private toggleTodo(index: number): void {
    if (this.todos[index].status === TodoStatus.COMPLETE) {
      this.todos[index].status = TodoStatus.INCOMPLETE;
    } else {
      this.todos[index].status = TodoStatus.COMPLETE;
    }
  }

  //computed
  get filteredTodos(): Array<TodoStruct> {
    switch (this.visibility) {
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

<style lang="scss" scoped>
@import "@/style/common.scss";

body {
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-family;
}

.todo {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1em;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(25, 25, 25, 0.25);
}
</style>
