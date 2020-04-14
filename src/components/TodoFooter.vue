<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearAll">Clear All</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoFooter extends Vue {
  private clearAll(): void {
    this.$emit("clearAll");
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
