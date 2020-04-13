<template>
  <div class="inputBox shadow">
    <input
      type="text"
      v-model="newTodoItem"
      placeholder="Type what you have to do"
      v-on:keyup.enter="addTodo"
    />
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoInput extends Vue {
  private newTodoItem = "";

  private addTodo(): void {
    if (this.newTodoItem !== "") {
      const value = this.newTodoItem && this.newTodoItem.trim();
      this.$emit("addTodo", value);
      this.clearInput();
    }
  }

  private clearInput(): void {
    this.newTodoItem = "";
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #7d83aa, #7352df);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
