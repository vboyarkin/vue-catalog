<template>
  <div class="checkbox-contaier">
    <h4>{{ title }}</h4>
    <label v-for="item of items" :key="item.id">
      {{ item[propertyName] }}
      <input type="checkbox" v-model="checkedItems[item.id]" />
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
    checkedItems: {
      deep: true,
      handler: function (checkedItems) {
        this.$emit("selection-change", checkedItems);
      },
    },
  },
};
</script>

<style lang="sass">
.checkbox-contaier
  display: flex
  flex-direction: column
</style>