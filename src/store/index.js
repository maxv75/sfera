import loader from './modules/loader';

import * as actions from './actions';
import * as getters from './getters';

export default {
  actions,
  getters,
  modules: {
    loader,
  },
  strict: true,
};