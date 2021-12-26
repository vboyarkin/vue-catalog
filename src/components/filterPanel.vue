<template>
  <div class="filter-panel">
    <CheckboxListSelector
      propertyName="category"
      title="Категория"
      :items="categoryOptions"
      @selection-change="onCategorySelectionChange"
      addTextField="true"
    />
    <RangeSelector
      propertyName="price"
      title="Цена"
      :items="this.items"
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
  // как лучше называть обработчики событий?
  methods: {
    onCategorySelectionChange(checkedItems) {
      this.$emit("category-change", checkedItems);
    },
    onDiscountSelectionChange(selectedItem) {
      if (selectedItem == "Не важно")
        selectedItem = undefined;
      this.$emit("discount-change", selectedItem);
    },
    onRangeSelectionChange(lval, rval) {
      this.$emit("price-range-change", lval, rval);
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
    // "Не важно" должно появляться не тут (может быть другой язык)
    // Как лучше сделать?..
    discountOptions() {
      const options = this.filterUniqueOptions(
        this.items,
        "discount",
        true,
        true
      );
      options.push({ option: "Не важно" });
      options[options.length - 1].id = options.length - 1;
      return options;
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