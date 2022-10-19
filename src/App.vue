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

