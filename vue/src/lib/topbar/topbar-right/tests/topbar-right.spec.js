import { mount } from '@vue/test-utils';
import TopbarRight from '../index.vue';

describe('TopbarRight', () => {
  it('should match snapshot', () => {
    const wrapper = mount(TopbarRight);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

