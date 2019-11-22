<template>
  <div class="md-data-table__checkbox--wrapper">
    <md-checkbox
      :checked="checked"
      :disabled="disabled"
      label=""
      :htmlId="id + '-checkbox'"
      @click="handleClick">
    </md-checkbox>
  </div>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-data-table-checkbox',

  data() {
    return {
      checked: false,
    }
  },

  inject: {
    dataTable: {
      default: {}
    },
  },

  props: {
    data: Object,
    disabled: Boolean,
    id: {
      type: String,
      default: uniqueId('md-data-table-checkbox-')
    },
    disabled: Boolean,
  },

  watch: {
    data(val) {
      this.checked = this.dataTable.isSelected(this.data);
    },
  },

  mounted() {
    this.checked = this.dataTable.isSelected(this.data);
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.dataTable.toggleRowWithCheckbox({
            originalEvent: event,
        }, this.data);
      }
    },

  },
};
</script>
