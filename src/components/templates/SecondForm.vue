<template>
  <div
    class="containerModal d-flex justify-content-center d-flex align-items-center"
  >
    <Container class="content">
      <Title title="Sobre o atendimento" subtitle="Detalhes do atendimento" />
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "../bosons/Container.vue";
import Title from "../bosons/title.vue";

export default defineComponent({ components: { Container, Title } });
</script>

<style lang="scss" scoped>
.containerModal {
  height: 39rem;
}
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
</style>
