import * as mutations from './mutation-types';

export const setLoader = ({ commit }, data) => commit(mutations.LOADING_STATE, data);