<template>
  <div class="error d-flex flex-column pl-1">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.error {
  color: var(--red-500);
  font-size: 12px;
}
</style>
