<template>
  <div class="checkbox-contaier">
    <h4>{{ title }}</h4>
    <div class="list-wrap" v-for="item of items" :key="item.id">
      <input
        type="checkbox"
        :id="'checkbox' + item.id"
        v-model="checkedItems[item.id].checked"
      />
      <label :for="'checkbox' + item.id">{{ item.option }}</label>
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
      checkedItems: this.items,
    };
  },
  computed: {},
  watch: {
    checkedItems: {
      deep: true,
      immediate:true,
      handler: function (items) {
        this.$emit("selection-change", items);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.checkbox-contaier
  display: flex
  flex-direction: column
</style>