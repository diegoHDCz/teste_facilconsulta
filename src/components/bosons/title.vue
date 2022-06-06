<template>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
  <div class="subtitle">
    <h3>{{ subtitle }}</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: { type: String, required: true },
  },
  mounted() {
    this.title;
    this.subtitle;
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-family: "Comfortaa", cursive;
  font-size: 1.2rem;
  color: var(--blue-500);
}

</style>
