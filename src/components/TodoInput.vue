<template>
  <div class="inputBox shadow">
    <form class="form" v-on:submit.prevent="addTodo">
      <input
        class="input form__input"
        v-model="newTodoItem"
        placeholder="Type what you have to do"
      />
      <button class="btn form__submit-btn" type="submit">Add</button>
    </form>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Warning</h3>
      <span slot="footer" @click="showModal = false">
        Write somthing to do
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/common/Modal.vue";

@Component({
  components: {
    Modal: Modal
  }
})
export default class TodoInput extends Vue {
  private newTodoItem = "";
  private showModal = false;

  private addTodo(): void {
    if (this.newTodoItem !== "") {
      const value = this.newTodoItem && this.newTodoItem.trim();
      this.$emit("addTodo", value);
      this.clearInput();
    } else {
      this.showModal = !this.showModal;
    }
  }

  private clearInput(): void {
    this.newTodoItem = "";
  }
}
</script>

<style lang="scss" scoped>
@import "../style/common.scss";

.form {
  width: 100%;
  padding: 1.5rem 1rem 0 1rem;
  display: flex;
  &__input {
    width: 100%;
    font-size: 14px;
    margin: 0 0.5em;
    border-radius: 2em;
    padding: 0.75em 1.5em;
    background: none;
    font-family: $font-family;
    border: #e3e3e3 1px solid;
    transition: border 250ms ease-out;
    &:focus {
      border: $color-main 1px solid;
      outline: none;
    }
  }
  &__input,
  &__submit-btn {
  }
}
</style>
