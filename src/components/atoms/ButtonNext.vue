<template>
  <div class="nextButton">
    <div class="row">
      <div class="col col-md-12">
        <button type="submit" class="btn btn-primary">Próximo</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.nextButton {

margin-top: auto;



  button {
    color: var(--white-200);
    line-height: 2rem;
    font-size: 1rem;
    border-radius: 1rem;
    padding: 0 5rem;
    text-align: center;
    font-size: 1rem;
    outline: none;
    transition: opacity 0.2s;
    display: block;
    width: 100%;
    background: var(--blue-500);
    &:hover {
      opacity: calc(0.9);
    }
  }
}
</style>
