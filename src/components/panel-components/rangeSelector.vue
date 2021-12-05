<template>
  <div class="range-contaier">
    <h4>{{ title }}</h4>
    <doubleRange
      @range-change="onRangeChange"
      :minValue="minPrice"
      :maxValue="maxPrice"
    />
  </div>
</template>

<script>
import doubleRange from "./doubleRange.vue";
export default {
  components: { doubleRange },
  props: {
    items: {
      type: Array,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    const prices = this.items.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      minPrice,
      maxPrice,
    };
  },
  methods: {
    onRangeChange(...args) {
      this.$emit("range-change", ...args)
    },
  },
};
</script>

<style lang="sass" scoped>
</style>