<template>
  <div id="app">
    <div class="container" v-if="!isFetching">
      <FilterPanel
        class="filter-panel"
        :items="fetchedItems"
        @category-change="onCategorySelectionChange"
        @discount-change="onDiscountSelectionChange"
        @price-range-change="onPriceRangeSelectionChange"
      />
      <ItemList class="item-list" :items="items" />
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
        selectedDiscount: undefined,
        selectedPriceRange: { min: undefined, max: undefined },
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
        this.fetchedItems = json;
      })
      // generate fake discount
      .then(() => {
        const discounts = [0, 10, 30, 50, 60];
        this.fetchedItems.forEach((item) => {
          const discount_i = this.randomInteger(0, discounts.length - 1);
          item.discount = discounts[discount_i];
        });
        this.isFetching = false;
      });
  },
  methods: {
    randomInteger(min, max) {
      // случайное число от min до (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    onCategorySelectionChange(checkedItems) {
      const nonEmptySelection = checkedItems.reduce((acc, cur) => {
        return acc || cur.checked;
      }, false);

      if (nonEmptySelection)
        checkedItems = checkedItems.filter((x) => x.checked);

      this.query.selectedCategories = checkedItems.map((x) => x.option);
    },
    onDiscountSelectionChange(selectedItem) {
      this.query.selectedDiscount = selectedItem;
    },
    onPriceRangeSelectionChange(lval, rval) {
      this.query.selectedPriceRange.min = lval;
      this.query.selectedPriceRange.max = rval;
    },
  },
  computed: {
    items() {
      let result = this.fetchedItems
        .filter((x) => this.query.selectedCategories.includes(x.category))
        .filter(
          (x) =>
            x.price <= this.query.selectedPriceRange.max &&
            x.price >= this.query.selectedPriceRange.min
        );

      console.log(this.query.selectedDiscount);
      if (
        this.query.selectedDiscount !== undefined &&
        Object.keys(this.query.selectedDiscount)
      )
        result = result.filter(
          (x) => x.discount == this.query.selectedDiscount
        );

      return result;
    },
  },
};
</script>

<style lang="sass">
body
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif
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
