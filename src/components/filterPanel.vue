<template>
  <div>
    <CheckboxListSelector
      propertyName="brand"
      title="Бренд"
      :items="this.items"
      @selection-change="onBrandSelectionChange"
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
  },
};
</script>

<style lang="sass">
</style>