import { mount } from '@vue/test-utils';
import Topbar from '../index.vue';

describe('Topbar', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Topbar);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

