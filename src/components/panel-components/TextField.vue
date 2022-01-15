<template>
  <div>
    <input type="text" :placeholder="placeholder" v-model="value" />
    <button>&#x2715;</button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value(newval) {
      this.$emit("value-change", newval);
    },
  },
};
</script>

<style lang="sass" scoped>
input
  border: solid 1px $color-inactive
  border-radius: 4px
  padding: 1rem 1.2rem
  margin-bottom: .8rem
  font-size: inherit
  width: 100%
  box-sizing: border-box
  flex-grow: 1

button
  background: none
  border: none
  position: absolute
</style>