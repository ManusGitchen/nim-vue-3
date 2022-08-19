<template>
  <header>Nimm Spiel von Manuela</header>
   <main>
    <Field :sticks="stickArray" />
    <Settings />
  </main>
</template>

<script>
import Field from "./components/Field.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  components: {
    Field,
    Settings
  },
  computed: {
   
    stickArray(){
      const maxCount = this.$store.getters.getNumbersOfSticks
      let count = 1;
      let sticks = [];
      while(this.maxCount >= 0){
        sticks.push(count);
        maxCount = maxCount - count;
        count = count + 2;
        console.log(sticks)
      }
      return sticks
    }
  }
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
