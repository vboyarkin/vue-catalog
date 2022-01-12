<template>
  <div>
    <h4>{{ title }}</h4>
    <select name="" id=""></select>
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
    addTextField: {
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
</style>