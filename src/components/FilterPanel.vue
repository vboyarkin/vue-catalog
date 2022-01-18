<template>
  <div class="filter-panel">
    <CheckboxListSelector
      propertyName="category"
      title="Категория"
      :items="categoryOptions"
      @selection-change="onCategorySelectionChange"
      :addTextField="true"
    />
    <RangeSelector
      propertyName="price"
      title="Цена"
      :items="items"
      @range-change="onRangeSelectionChange"
    />
    <RadioListSelector
      propertyName="discount"
      title="Размер скидки"
      :items="discountOptions"
      @selection-change="onDiscountSelectionChange"
    />
  </div>
</template>

<script>
import CheckboxListSelector from "./panel-components/CheckboxListSelector.vue";
import RadioListSelector from "./panel-components/RadioListSelector.vue";
import RangeSelector from "./panel-components/RangeSelector.vue";
export default {
  components: {
    CheckboxListSelector,
    RadioListSelector,
    RangeSelector,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onCategorySelectionChange(checkedItems) {
      this.$emit("query-change", { selectedCategories:  checkedItems });
    },
    onDiscountSelectionChange(selectedItem) {
      this.$emit("query-change", { selectedDiscount: selectedItem });
    },
    onRangeSelectionChange(min, max) {
      this.$emit("query-change", { selectedPriceRange: { min, max } });
    },

    filterUniqueOptions(arr, propertyName, shouldSort, reverseSort) {
      const options = arr.map((x) => x[propertyName]);
      let uniqueOptions = Array.from(new Set(options));

      if (shouldSort) uniqueOptions = uniqueOptions.sort();
      if (shouldSort && reverseSort) uniqueOptions = uniqueOptions.reverse();

      return uniqueOptions.map((option, i) => {
        return {
          id: i,
          option,
        };
      });
    },
  },
  computed: {
    categoryOptions() {
      return this.filterUniqueOptions(this.items, "category").map((x) => {
        x.checked = false;
        return x;
      });
    },
    discountOptions() {
      return this.filterUniqueOptions(this.items, "discount", true, true);
    },
  },
};
</script>

<style lang="sass">
.filter-panel h4
  text-align: left
  margin-left: 1rem

.list-wrap
  text-align: left
  margin-left: 1.1rem
</style>