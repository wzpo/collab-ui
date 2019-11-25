<script>
import cloneElement from '../utils/cloneElement';

export default {
  name: 'md-topbar',

  render(h) {
    const {
      anchor,
      color,
      fixed,
      icon,
      title,
      ...otherProps
    } = this.$props;

    const topBarClass = `md-top-bar`;
    const brandClass = `md-brand`;

    const brandNodeChildren = ([
      <div class={`${brandClass}__logo`} key={`${brandClass}__logo`}>
        {
          this.$slots.image
            ? <slot name='image' />
            : <i class={`icon ${icon}`} />
        }
      </div>,
      <div class={`${brandClass}__title`} key={`${brandClass}__title`}>
        {title}
      </div>
    ]);

    const getBrandAnchor = () => (
      this.$slots.brandAnchor
        ? cloneElement(
            this.$slots.brandAnchor[0],
            h,
            {
              class:
                `${brandClass}` +
                `${(this.$slots.brandAnchor[0].data.staticClass && ` ${this.$slots.brandAnchor[0].data.staticClass}`) || ''}`,
            },
            brandNodeChildren
          )
        : <a class={brandClass} href={anchor}>
            {brandNodeChildren}
          </a>
    );

    const brandNode = (
      <div class={`${topBarClass}__brand`}>
        {getBrandAnchor()}
      </div>
    );

    const injectChildren = this.$slots.default.map(child => {
      if (child &&
        child.componentOptions &&
        child.componentOptions.tag === 'md-topbar-nav' &&
        !child.context.$slots.brand) {
        return cloneElement(child, h, {
          brandNode
        });
      } else {
        return child;
      }
    });

    return (
      <div
        class={
          `${topBarClass}` +
          `${fixed && ` ${topBarClass}--fixed` || ''}` +
          `${color && ` ${topBarClass}--${color}` || ''}`
        }
        role='navigation'
        {...{props: otherProps}}
      >
        <div class={`${topBarClass}__container`}>
          {brandNode}
          {injectChildren}
        </div>
      </div>
    );
  },

  props: {
    /** @prop App Url/Link | null */
    anchor: String,
    /** @prop Topbar header color | '' */
    color: {
      type: String,
      default: ''
    },
    /** @prop Determines if Topbar is fixed to top | false */
    fixed: Boolean,
    /** @prop Icon class name | 'icon-cisco-logo' */
    icon: {
      type: String,
      default: 'icon-cisco-logo'
    },
    /** @prop Topbar title text | '' */
    title: {
      type: String,
      default: ''
    },
  }
};
</script>
