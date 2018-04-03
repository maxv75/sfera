import {
    SALES_COLLECTION,
    TOPSELLERS_COLLECTION,
    PARTS_COLLECTION,
    PARTS_COLLECTION_CLEAR,
} from '../mutation-types';

const mutations = {
    [SALES_COLLECTION](state, data) {
        if (data && typeof data === 'object' && data.length) {
            state.sales.data = data;
            state.sales.lastUpdate = new Date();
        }
    },
    [TOPSELLERS_COLLECTION](state, data) {
        if (data && typeof data === 'object' && data.length) {
            state.topsellers.data = data;
            state.topsellers.lastUpdate = new Date();
        }
    },
    [PARTS_COLLECTION](state, {id, data}) {
        if (data && typeof data === 'object') {
            state.parts.data[id] = data;
            state.parts.lastUpdate = new Date();
        }
    },
    [PARTS_COLLECTION_CLEAR](state) {
        state.parts.data = {};
    },
};

const state = {
    topsellers: {
        lastUpdate: null,
        data: []
    },
    sales: {
        lastUpdate: null,
        data: []
    },
    parts: {
        lastUpdate: null,
        data: {}
    }
};

export default {
    state,
    mutations,
};