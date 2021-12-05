<template>
  <div class="radio-contaier">
    <h4>{{ title }}</h4>
    <label v-for="item of items" :key="item.id">
      {{ item[propertyName] }}
      <input
        type="radio"
        :value="item[propertyName]"
        :key="item.id"
        :id="item.id"
        v-model="checkedItems"
      />
    </label>
  </div>
</template>

<script>
export default {
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
    return {
      checkedItems: {},
    };
  },
  watch: {
    checkedItems(checkedItems) {
      this.$emit("selection-change", checkedItems);
    },
  },
};
</script>

<style lang="sass">
.radio-contaier
  display: flex
  flex-direction: column
</style>