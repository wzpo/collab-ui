import { mount } from '@vue/test-utils';
import TopbarNav from '../index.vue';

describe('TopbarNav', () => {
  it('should match snapshot', () => {
    const wrapper = mount(TopbarNav);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

