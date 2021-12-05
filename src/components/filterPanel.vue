<template>
  <div class="filter-panel">
    <CheckboxListSelector
      propertyName="brand"
      title="Бренд"
      :items="this.items"
      @selection-change="onBrandSelectionChange"
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
      :items="this.items"
      @selection-change="onDiscountSelectionChange"
    />
  </div>
</template>

<script>
import CheckboxListSelector from "@/components/panel-components/checkboxListSelector.vue";
import RadioListSelector from "@/components/panel-components/radioListSelector.vue";
import RangeSelector from "@/components/panel-components/rangeSelector.vue";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    CheckboxListSelector,
    RadioListSelector,
    RangeSelector,
  },
  // как лучше называть обработчики событий?
  methods: {
    onBrandSelectionChange(checkedItems) {
      console.log(checkedItems);
      // TODO
    },
    onDiscountSelectionChange(selectedItem) {
      console.log(selectedItem);
      // TODO
    },
    onRangeSelectionChange(lval, rval) {
      console.log(lval, rval);
      // TODO
    },
  },
};
</script>

<style lang="sass">
.filter-panel
  width: 60%

  h4
    text-align: left
    margin-left: 1rem
</style>