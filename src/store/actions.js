import * as mutations from './mutation-types';

export const setLoader = ({ commit }, data) => commit(mutations.LOADING_STATE, data);
export const setSales = ({ commit }, data) => commit(mutations.SALES_COLLECTION, data);
export const setTopSellers = ({ commit }, data) => commit(mutations.TOPSELLERS_COLLECTION, data);
export const setCategoryParts = ({ commit }, { id, data }) => commit(mutations.PARTS_COLLECTION, { id, data });
export const clearPartsCache = ({ commit }) => commit(mutations.PARTS_COLLECTION_CLEAR);