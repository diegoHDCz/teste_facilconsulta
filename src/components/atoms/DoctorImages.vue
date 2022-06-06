<template>
  <div class="Container">
    <img :src="imagePath" :alt="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: { Type: String, required: true },
    image: { Type: String, required: true },
  },
  computed: {
    imagePath() {
      return new URL(`/public/assets/images/${this.image}`, import.meta.url)
        .href;
    },
  },
});
</script>

<style lang="scss" scoped>
.Container {

  img {
    position: inherit;

    width: 100vw;
    max-width: 21rem;

    height: 100vh;
    max-height: 16rem;
    padding-bottom: 4rem;
    margin-bottom: 10rem;   
  }
  @media screen and (max-width: 750px){
    img{
      width:0;
      height: 0;
    }
  }
}
</style>
