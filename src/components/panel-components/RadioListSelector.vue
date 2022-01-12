<template>
  <div class="radio-contaier">
    <h4>{{ title }}</h4>
    <div class="list-wrap" v-for="item of items" :key="item.id">
      <input
        type="radio"
        :value="item.option"
        :id="'radio' + item.id"
        v-model="selectedItem"
      />
      <label :for="'radio' + item.id">{{ item.option }}</label>
    </div>
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
      selectedItem: {},
    };
  },
  computed: {},
  watch: {
    selectedItem(selectedItem) {
      this.$emit("selection-change", selectedItem);
    },
  },
  mounted() {
    // this.$emit("selection-change", this.selectedItem);
  },
};
</script>

<style lang="sass">
.radio-contaier
  display: flex
  flex-direction: column
</style>