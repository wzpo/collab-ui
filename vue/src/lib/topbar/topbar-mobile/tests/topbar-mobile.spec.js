import { mount } from '@vue/test-utils';
import TopbarMobile from '../index.vue';

describe('TopbarMobile', () => {
  it('should match snapshot', () => {
    const wrapper = mount(TopbarMobile);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

