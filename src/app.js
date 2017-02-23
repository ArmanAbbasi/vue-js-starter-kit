import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import labels from './data/labels.json';
import 'stylesheets/global.scss';

sync(store, router);

Vue.mixin({
    data() {
        return labels;
    }
});

const app = new Vue({
    router,
    store,
    ...App
});

export { app, router, store }