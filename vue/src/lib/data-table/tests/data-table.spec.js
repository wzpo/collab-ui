import { mount } from '@vue/test-utils';
import DataTable from '../index.vue';

describe('DataTable', () => {
  it('should match snapshot', () => {
    const wrapper = mount(DataTable);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

