<template>
  <div class="checkbox-contaier">
    <h4>{{ title }}</h4>
    <TextField v-if="addTextField" @value-change="onTextFieldValueChange" />
    <div class="list-wrap" v-for="item of filteredItems" :key="item.id">
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
import TextField from "./TextField.vue";

export default {
  components: {
    TextField,
  },
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
  data() {
    return {
      textFilter: "",
      checkedItems: [...this.items],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((x) =>
        x.option.toLowerCase().includes(this.textFilter.toLowerCase().trim())
      );
    },
  },
  watch: {
    checkedItems: {
      deep: true,
      immediate: true,
      handler: function (checkedItems) {
        let foundChecked = false;

        let filteredOptions = checkedItems.map((x) => {
          if (x.checked) {
            foundChecked = true;
            return x.option;
          }
        });

        if (!foundChecked)
          filteredOptions = checkedItems.map((x) => x.option);

        this.$emit("selection-change", filteredOptions);
      },
    },
    items: {
      deep: true,
      immediate: true,
      handler: function (items) {
        this.checkedItems = [...items];
      },
    },
  },
  methods: {
    onTextFieldValueChange(value) {
      this.textFilter = value;
    },
  },
};
</script>

<style lang="sass" scoped>
.checkbox-contaier
  display: flex
  flex-direction: column
</style>