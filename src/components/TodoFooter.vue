<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo">Clear All</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoFooter extends Vue {
  private clearTodo(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key !== null && key.includes("todo:")) {
        localStorage.removeItem(key);
      }
    }
  }
}
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 50px;
  margin: 0 auto;
}

.clearAllBtn {
  color: #e20303;
  display: black;
}
</style>
