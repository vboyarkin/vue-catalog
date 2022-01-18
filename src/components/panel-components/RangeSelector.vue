<template>
  <div class="range-contaier">
    <h4>{{ title }}</h4>
    <DoubleRange
      @range-change="onRangeChange"
      :minValue="limits.minVal"
      :maxValue="limits.maxVal"
    />
  </div>
</template>

<script>
import DoubleRange from "./DoubleRange.vue";
export default {
  components: { DoubleRange },
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
  computed: {
    limits() {
      if (!this.items || this.items.length === 0)
        return { minVal: 0, maxVal: 100 };

      const prices = this.items.map((item) => item.price);
      const minVal = Math.min(...prices);
      const maxVal = Math.max(...prices);

      return {
        minVal,
        maxVal,
      };
    },
  },
  methods: {
    onRangeChange(...args) {
      this.$emit("range-change", ...args);
    },
  },
  mounted() {
    this.onRangeChange(this.limits.minVal, this.limits.maxVal);
  },
};
</script>

<style lang="sass" scoped>
</style>