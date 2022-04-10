<template>
  <div>
    <div v-if="!isFetching && items && items.length !== 0" class="item-list">
      <ItemCard
        class="product-card"
        v-for="item of items"
        :key="item.id"
        :item="item"
      />
    </div>

    <div
      v-if="!isFetching && !(items && items.length !== 0)"
      class="item-list-placeholder"
    >
      <span>Нет подходящих товаров</span>
    </div>

    <div v-if="isFetching" class="item-list-loader-placeholder">
      <span>Загрузка</span>
    </div>
  </div>
</template>

<script>
import ItemCard from "./ItemCard.vue";
export default {
  components: { ItemCard },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isFetching: {
      type: Boolean,
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
  margin: 20px 44px
  width: 200px
  height: 330px

.item-list-placeholder, .item-list-loader-placeholder
  width: 100%
  display: flex
  justify-content: center
  align-items: center

  span
    font-size: 2.5rem
    color: $color-active

.item-list-loader-placeholder > span
  animation: pulse 1s linear infinite

@keyframes pulse
  from
    opacity: 1
  to
    opacity: 1

  50%
    opacity: .25
</style>