<!-- TodoStatus 
    0 : COMPLETE
    1 : INCOMPLETE
    2 : DEFAULT
-->
<template>
  <div class="filters">
    <button
      class="btn filters__btn filters__btn--all"
      v-on:click="filterTodos(2)"
    >
      All
    </button>
    <button
      class="btn filters__btn filters__btn--complete"
      v-on:click="filterTodos(0)"
    >
      Complete
    </button>
    <button
      class="btn filters__btn filters__btn--incomplete"
      v-on:click="filterTodos(1)"
    >
      Incomplete
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TodoStatus } from "../todo";

@Component
export default class TodoFooter extends Vue {
  private filterTodos(status: TodoStatus): void {
    this.$emit("filterTodos", status);
  }
}
</script>

<style lang="scss" scoped>
@import "../style/common.scss";

.filters {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem 1.5rem 1rem;
}
</style>
