<template>
  <div class="item-list">
    <ItemCard class="product-card" v-for="item of items" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import ItemCard from './ItemCard.vue';
export default {
  components: { ItemCard },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.item-list
  float: left
  display: flex
  flex-wrap: wrap

.product-card
  margin: 40px
  width: 200px
</style>