<template>
  <div id="app">
    <div class="container">
      <FilterPanel
        class="filter-panel"
        :items="fetchedItems"
        @query-change="onQueryChange"
      />
      <ItemList class="item-list" :items="items" :isFetching="isFetching" />
    </div>
  </div>
</template>

<script>
import FilterPanel from "@/components/FilterPanel.vue";
import ItemList from "@/components/ItemList.vue";

export default {
  name: "App",
  data() {
    return {
      fetchedItems: [],
      isFetching: true,
      query: {
        selectedCategories: [],
        selectedDiscount: 0,
        selectedPriceRange: { min: null, max: null },
      },
    };
  },
  components: {
    FilterPanel,
    ItemList,
  },
  mounted() {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => {
        const discounts = [0, 10, 30, 50, 60];
        json.forEach((item) => {
          const discount_i = this.randomInteger(0, discounts.length - 1);
          item.discount = discounts[discount_i];
        });
        this.fetchedItems = json;
        this.isFetching = false;
      });
  },
  methods: {
    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },

    onQueryChange(query) {
      this.isFetching = true;

      setTimeout(() => {
        for (const key in query) this.query[key] = query[key];

        this.isFetching = false;
      }, 700);
    },
  },
  computed: {
    items() {
      return this.fetchedItems
        .filter((x) => this.query.selectedCategories.includes(x.category))
        .filter(
          (x) =>
            x.price <= this.query.selectedPriceRange.max &&
            x.price >= this.query.selectedPriceRange.min
        )
        .filter(
          (x) =>
            this.query.selectedDiscount == 0 ||
            x.discount == this.query.selectedDiscount
        );
    },
  },
};
</script>

<style lang="sass">
body
  font-family: $main-font
</style>

<style lang="sass" scoped>
.container
  display: grid
  grid-template-columns: 300px

.filter-panel
  grid-column: 1
  margin-left: 1rem

.item-list
  grid-column: 2
</style>
