<template>
  <div id="app">
    <filterPanel :items="this.items"/>
  </div>
</template>

<script>
import FilterPanel from "@/components/filterPanel.vue";

export default {
  name: "App",
  data() {
    return {
      items: [
        {id: 0, brand: "Phillips", name: "RandomName0", price: 5900, discount: 0},
        {id: 1, brand: "Polaris", name: "RandomName1", price: 3300, discount: 10},
        {id: 2, brand: "Phillips", name: "RandomName2", price: 4000, discount: 15},
        {id: 3, brand: "LG", name: "RandomName3", price: 2100, discount: 20},
      ]
    }
  },
  components: {
    FilterPanel,
  },
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
