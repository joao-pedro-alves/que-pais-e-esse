import { shallowMount, VueWrapper } from '@vue/test-utils'
import App from '@/App.vue';
import router from '@/router';

describe('App.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      global: {
        plugins: [router]
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  
  test('renders router-view component', () => {
    const routerView = wrapper.findComponent({ name: 'RouterView' });
    expect(routerView.exists()).toBe(true);
  });
})
