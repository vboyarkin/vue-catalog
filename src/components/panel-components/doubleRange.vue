<template>
  <div class="wrap">
    <div class="text-container">
      <input type="text" :placeholder="minValue" v-model="leftValue" />
      <span class="dash">—</span>
      <input type="text" :placeholder="maxValue" v-model="rightValue" />
    </div>

    <div class="flex-container">
      <div class="range-container" :style="cssVars">
        <input
          type="range"
          :min="minValue"
          :max="maxValue"
          v-model="leftValue"
        />
        <input
          type="range"
          :min="minValue"
          :max="maxValue"
          v-model="rightValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Returns string exluding all chars that aren't digits, commas, dots
 */
function filterDigits(x) {
  if (typeof x === "number") return x;
  return x.replace(/[^0-9.,]/g, "");
}

export default {
  props: {
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      leftValue: this.minValue,
      rightValue: this.maxValue,
    };
  },
  computed: {
    cssVars() {
      return {
        "--active-interval-offset":
          (100 * (this.leftValue - this.minValue)) /
            (this.maxValue - this.minValue) +
          "%",
        "--interval-width":
          (100 * (this.rightValue - this.leftValue)) /
            (this.maxValue - this.minValue) +
          "%",
      };
    },
  },
  watch: {
    leftValue() {
      this.leftValue = filterDigits(this.leftValue);
      if (this.leftValue > this.rightValue) {
        const t = this.leftValue;
        this.leftValue = this.rightValue;
        this.rightValue = t;
      }

      this.$emit("range-change", this.leftValue, this.rightValue);
    },
    rightValue() {
      this.rightValue = filterDigits(this.rightValue);
      if (this.rightValue > this.leftValue) {
        const t = this.rightValue;
        this.rightValue = this.leftValue;
        this.leftValue = t;
      }
      
      this.$emit("range-change", this.leftValue, this.rightValue);
    },
  },
};
</script>

<style lang="sass" scoped>
$thumb-diameter: 1em
$color-bg: white
$color-active: #e83e5a
$color-inactive: #e7e7e9
$input-color: #000
$input-text-width: 6em

body
  font-size: 16px

@mixin track()
  background: none

@mixin thumb()
  border: solid 1px $color-active
  border-radius: 50%
  width: $thumb-diameter
  height: $thumb-diameter
  background: $color-bg
  pointer-events: auto
  cursor: pointer

.range-container
  display: grid
  margin: 1em 0em
  background: linear-gradient(0deg, transparent 0 45%, $color-inactive 45% 55%, transparent 55%)
  z-index: 2

  // active interval line
  &::after
    content: ''
    background: linear-gradient(0deg, transparent 0 45%, $color-active 45% 55%, transparent 55%)
    grid-column: 1
    grid-row: 2
    z-index: 2
    width: var(--interval-width)
    margin-left: var(--active-interval-offset)

input[type="range"]
  color: $input-color
  font: inherit
  grid-column: 1
  grid-row: 2
  background: none
  margin: 0
  font: inherit
  color: $input-color
  pointer-events: none
  z-index: 3

  &::-webkit-slider-runnable-track,
  &::-webkit-slider-thumb,
  &
    -webkit-appearance: none

  &::-webkit-slider-runnable-track
    @include track
  &::-moz-range-track
    @include track

  &::-webkit-slider-thumb
    @include thumb
  &::-moz-range-thumb
    @include thumb

input[type="text"]
  border: solid 1px $color-inactive
  border-radius: 4px
  padding: 1rem 1.2rem
  font-size: inherit
  width: 1px

.text-container
  display: flex
  align-items: center
  input
    flex-grow: 1

span.dash
  margin: 5px
  color: $color-inactive
  flex
</style>