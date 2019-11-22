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
  name: 'md-data-table-header-checkbox',

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
    /** @prop data for the table | [] */
    data: Array,
    selection: [Array, Object],
    disabled: Boolean,
    id: {
      type: String,
      default: uniqueId('md-data-table-header-checkbox-')
    },
    disabled: Boolean,
  },

  watch: {
    data(val) {
      this.checked = this.updateCheckedState();
    },
    selection(val) {
      this.checked = this.updateCheckedState();
    },
  },

  mounted() {
    this.checked = this.updateCheckedState();
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        if (this.dataTable.data && this.dataTable.data.length > 0) {
          this.dataTable.toggleRowsWithCheckbox(event, !this.checked);
        }
      }
    },

    updateCheckedState() {
      return (
        this.dataTable.data && this.dataTable.data.length > 0
        && this.dataTable.selection && this.dataTable.selection.length > 0
        && this.dataTable.selection.length === this.dataTable.data.length
      );
    },

  },
};
</script>
