<template>
<div class="md-data-table__scrollable--view">
  <div ref="scrollHeader" class="md-data-table__scrollable--header">
    <div ref="scrollHeaderBox">
      <table
        class="md-data-table__scrollable--header-table"
        :class="dataTable.tableClass"
        :style="dataTable.tableStyle"
      >
        <thead class="md-data-table__thead">
          <slot name="header"></slot>
        </thead>
      </table>
    </div>
  </div>

  <div ref="scrollBody" class="md-data-table__scrollable--body">
    <table
      ref="scrollTable"
      :class="[{
        'md-data-table__scrollable--body-table': true,
        'md-data-table__scrollable--virtual-table': dataTable.virtualScroll
      }, dataTable.tableClass]"
      :style="dataTable.tableStyle"
    >
      <tbody class="md-data-table__tbody">
        <slot name="body"></slot>
      </tbody>
    </table>

    <table
      ref="loadingTable"
      v-if="dataTable.virtualScroll"
      :class="{
        'md-data-table__scrollable--body-table md-data-table__scrollable--loading-table': true,
        'md-data-table__scrollable--virtual-table': dataTable.virtualScroll
      }"
    >
      <tbody class="md-data-table__tbody">
        <md-spinner
          class="md-data-table__spinner"
          :style="{ height: scrollHeight }">
        </md-spinner>
      </tbody>
    </table>

    <div
      ref="virtualScroller"
      v-if="dataTable.virtualScroll"
      class="md-data-table__scrollable--virtual-scroller">
    </div>
  </div>
</div>
</template>

<script>
import Handler from '../handler';

export default {
  name: 'md-data-table-scroll-view',

  data() {
    return {
      columns: this.dataTable.columns,
      data: this.dataTable.data,
      dataCount: this.dataTable.dataCount,
      siblingBody: null,
      preventBodyScrollPropagation: false,
    }
  },

  inject: {
    dataTable: {
      default: {}
    },
  },

  props: {
    /** @prop height of scroll area */
    scrollHeight: {
      type: String,
      required: true
    },
  },

  watch: {
    data(val) {
      this.$nextTick(function() {
        this.alignScrollBar();
        if (this.$refs.loadingTable && this.$refs.loadingTable) {
          this.$refs.loadingTable.style.display = 'none';
        }
      });
    },
    dataCount(val) {
      this.$nextTick(function() {
        if (this.dataTable.virtualScroll) {
          this.setVirtualScrollerHeight();
        }
      });
    },
    scrollHeight(val) {
      this.setScrollHeight();
    },
  },

  updated() {
    if (this.$el.offsetParent) {
      this.alignScrollBar();
      this.setScrollHeight();
    }
  },

  mounted() {
    const view = this.$el.previousElementSibling;

    if (view) {
      this.siblingBody = Handler.findSingle(view, '.md-data-table__scrollable--body');
    }

    this.bindEvents();
    this.setScrollHeight();
    this.alignScrollBar();

    if (this.dataTable.virtualScroll) {
      this.setVirtualScrollerHeight();
      this.$refs.loadingTable.style.display = 'table';
    }
  },

  beforeDestroy() {
    this.unbindEvents();
  },

  methods: {
    bindEvents() {
      this.headerScrollListener = this.onHeaderScroll.bind(this);
      this.$refs.scrollHeader.addEventListener('scroll', this.headerScrollListener);

      this.bodyScrollListener = this.onBodyScroll.bind(this);
      this.$refs.scrollBody.addEventListener('scroll', this.bodyScrollListener);
    },

    unbindEvents() {
      this.$refs.scrollHeader.removeEventListener('scroll', this.headerScrollListener);
      this.$refs.scrollBody.removeEventListener('scroll', this.bodyScrollListener);
    },

    onHeaderScroll(event) {
      const scrollLeft = this.$refs.scrollHeader.scrollLeft;
      this.$refs.scrollBody.scrollLeft = scrollLeft;
      this.preventBodyScrollPropagation = true;
    },

    onBodyScroll(event) {
      if (this.preventBodyScrollPropagation) {
        this.preventBodyScrollPropagation = false;
        return;
      }

      this.$refs.scrollHeaderBox.style.marginLeft = -1 * this.$refs.scrollBody.scrollLeft + 'px';

      if (this.siblingBody) {
        this.siblingBody.scrollTop = this.$refs.scrollBody.scrollTop;
      }

      if (this.dataTable.virtualScroll) {
        const viewport = Handler.getOuterHeight(this.$refs.scrollBody);
        const tableHeight = Handler.getOuterHeight(this.$refs.scrollTable);
        const pageHeight = this.dataTable.virtualRowHeight * this.dataTable.visibleRows;
        const virtualTableHeight = Handler.getOuterHeight(this.$refs.virtualScroller);
        const pageCount = (virtualTableHeight / pageHeight) || 1;
        const scrollBodyTop = this.$refs.scrollTable.style.top || '0';

        if (this.$refs.scrollBody.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight ||
           this.$refs.scrollBody.scrollTop < parseFloat(scrollBodyTop)) {

            if (this.$refs.loadingTable) {
              this.$refs.loadingTable.style.display = 'table';
              this.$refs.loadingTable.style.top = this.$refs.scrollBody.scrollTop + 'px';
            }

            const page = Math.floor(
              (this.$refs.scrollBody.scrollTop * pageCount) / (this.$refs.scrollBody.scrollHeight)
              ) + 1;

            this.dataTable.handleVirtualScroll({
              page: page,
              callback: () => {
                if (this.$refs.loadingTable) {
                  this.$refs.loadingTable.style.display = 'none';
                }

                this.$refs.scrollTable.style.top = ((page - 1) * pageHeight) + 'px';

                if (this.siblingBody) {
                  this.siblingBody.children[0].style.top = this.$refs.scrollTable.style.top;
                }
              }
            });
        }
      }
    },

    setScrollHeight() {
      if (this.scrollHeight && this.$refs.scrollBody) {
        if (this.scrollHeight.indexOf('%') !== -1) {
          let relativeHeight;
          this.$refs.scrollBody.style.visibility = 'hidden';
          this.$refs.scrollBody.style.height = '100px';
          const containerHeight = Handler.getOuterHeight(this.dataTable.$el.children[0]);

          relativeHeight = Handler.getOuterHeight(this.dataTable.$el.parentElement) * parseInt(this.scrollHeight, 10) / 100;

          const staticHeight = containerHeight - 100; // total height of everything

          const scrollBodyHeight = relativeHeight - staticHeight;

          this.$refs.scrollBody.style.height = 'auto';
          this.$refs.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
          this.$refs.scrollBody.style.visibility = 'visible';
        } else {
          this.$refs.scrollBody.style.maxHeight = this.scrollHeight;
        }
      }
    },

    setVirtualScrollerHeight() {
      if (this.$refs.virtualScroller) {
        this.$refs.virtualScroller.style.height = this.dataTable.dataCount * this.dataTable.virtualRowHeight + 'px';
      }
    },

    hasVerticalOverflow() {
      return Handler.getOuterHeight(this.$refs.scrollTable) > Handler.getOuterHeight(this.$refs.scrollBody);
    },

    alignScrollBar() {
      const scrollBarWidth = this.hasVerticalOverflow() ? Handler.calculateScrollbarWidth() : 0;
      this.$refs.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';
    },
  },
};
</script>
