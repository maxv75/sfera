import loader from './modules/loader';
import parts from './modules/parts';

import * as actions from './actions';
import * as getters from './getters';

export default {
  actions,
  getters,
  modules: {
    loader,
    parts
  },
  strict: process.env.NODE_ENV !== 'production'
};