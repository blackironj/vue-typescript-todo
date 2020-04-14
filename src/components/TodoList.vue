<template>
  <section>
    <transition-group tag="ol" name="list" class="todo-list">
      <li
        class="todo-list__item"
        v-bind:class="{ complete: !todo.status }"
        v-bind:key="index"
        v-for="(todo, index) in propsTodos"
      >
        <button class="todo-list__item-content" v-on:click="toggleTodo(index)">
          {{ todo.text }}
        </button>
        <button
          class="btn todo-list__item-remove"
          v-on:click="removeTodo(index)"
        >
          <i
            class="fa"
            v-bind:class="[!todo.status ? 'fa-check' : 'fa-times']"
          ></i>
        </button>
      </li>
    </transition-group>
  </section>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { TodoStruct } from "../todo";

@Component
export default class TodoList extends Vue {
  @Prop() private propsTodos!: Array<TodoStruct>;

  private removeTodo(index: number): void {
    this.$emit("removeTodo", index);
  }

  private toggleTodo(index: number): void {
    this.$emit("toggleTodo", index);
  }
}
</script>

<style lang="scss" scoped>
@import "../style/common.scss";

.todo-list {
  $block: #{&};
  width: 100%;
  padding: 0 1rem;
  flex: 1;
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 3px;
    transition: 200ms;
    color: $color-main;
    &:last-child {
      margin-bottom: 0;
    }
    &.complete {
      color: lightgreen;
      #{$block}__item-content {
        &:after {
          background: lightgreen;
        }
      }
    }
  }
  &__item-content {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 1px;
      background: $color-main;
      transition: 250ms ease-out;
      transform-origin: center;
      transform: scalex(0);
    }
    &:hover,
    &:focus {
      &:after {
        transform: scalex(1);
      }
    }
  }
  &__item-remove {
    margin-left: 0.5em;
    background: none;
    border: 1px solid;
    color: inherit;
    padding: 0;
    line-height: 1;
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 80%;
  }
}

.list-move,
.list-leave-active,
.list-enter-active {
  transition: 500ms cubic-bezier(0.87, -0.41, 0.19, 1.44);
}
.list-enter,
.list-leave-active {
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
