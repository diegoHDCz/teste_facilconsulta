<template>
  <div class="container shadow-lg p-3 mb-5 bg-white mt-5">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--white-100);
  width: 50rem;
  max-width: 750px;

  height: 34rem;
  max-height: 34rem;
  border-radius: 3.5rem;

  .content{
    margin-left: 3.5rem;

  }
}
</style>
