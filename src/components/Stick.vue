<template>
  <div class="stick" ref='stick'>
    <div class="stick-head"></div>
    <div class="stick-body"></div>
  </div>
</template>

<style lang="scss" scoped>
.stick {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: .2rem;

  &-head {
    border-radius: 50%;
    background: var(--dark-red);
    border-color: var(--dark-red);
    height: .5rem;
    width: .5rem;
  }

  &-body {
    height: 3rem;
    width: .5rem;
    background: var(--wood);
    border-color: var(--wood-dark);
  }
}
</style>