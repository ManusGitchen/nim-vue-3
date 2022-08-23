<template>
  <header>Nimm Spiel von Manuela</header>
   <main>
    <Field />
    <Settings />
  </main>
</template>

<script>
import Field from "./components/Field.vue"
import Settings from "./components/Settings.vue"


export default {
  name: "App",
  components: {
    Field,
    Settings
  },
  
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
