// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import vueConfig from 'vue-config'
import VueAnalytics from 'vue-analytics'

import App from './App'
import router from './router'
import appStore from './store';
import DataLoader from './modules/DataLoader'

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueAnalytics, {
    id: 'UA-9461395-1',
    router
});

// Initialize store
const store = new Vuex.Store(appStore);
Vue.use(vuexI18n.plugin, store);

// Get translations
import english from './translations/english.json';
import russian from './translations/russian.json';
import hebrew from './translations/hebrew.json';

Vue.i18n.add('en', english);
Vue.i18n.add('ru', russian);
Vue.i18n.add('he', hebrew);

let _vm;

Vue.http.interceptors.push((request, next) => {
    let _handler = null;
    if(_vm && _vm.$store) {
        // Debounce loader show
        _handler = setTimeout(() => { _vm.$store.dispatch('setLoader', true) }, 500) ;
    }

    next((response) => {
        if(_vm && _vm.$store) {
            if(_handler) {
                clearTimeout(_handler);
                _handler = null;
            }
            _vm.$store.dispatch('setLoader', false);
        }
    });
});

// Load app configuration
Vue.http.get('/static/config/appconfig.json')
    .then(response => {
        let config = response.data;
        Vue.use(vueConfig, config);
        Vue.http.options.root = config.BaseAPIUrl;

        // Get language from server
        Vue.http.get('api/language')
            .then(response => {
                // Set language
                Vue.i18n.set(response.data);
            }, response => {
                // Set default language
                Vue.i18n.set('en');
            })
            .finally(() => {
                // Start app
                _vm = new Vue({
                    el: '#app',
                    router,
                    store,
                    template: '<App/>',
                    components: { App },
                    created () {
                        DataLoader.Init(this)
                    }
                });
            });
    }, error => {
        // Error loading config
        document.write('Unable to load configuration');
    });