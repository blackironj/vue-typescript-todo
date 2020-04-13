<template>
  <section>
    <ul>
      <li v-for="(todoItem, index) in todoItems" :key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{ todoItem }}
        <span
          class="removeBtn"
          type="button"
          @click="removeTodo(todoItem, index)"
        >
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoList extends Vue {
  private todoItems: string[] = [];

  private getTodoItems(): void {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const val = localStorage.key(i);

        if (val !== null && val.includes("todo:")) {
          const splitted = val.split(":", 2);
          this.todoItems.push(splitted[1]);
        }
      }
    }
  }

  public removeTodo(todoItem: string, index: number):void {
    localStorage.removeItem("todo:" + todoItem);
    this.todoItems.splice(index, 1);
  }

  created() {
    this.getTodoItems();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
