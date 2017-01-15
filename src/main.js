import Vue from 'vue';
import store from './store/index';
import router from './route/index';
import { sync } from 'vuex-router-sync';
import app from './app.vue';
import labels from './data/labels.json';

// const renderer = require('vue-server-renderer').createRenderer();

sync(store, router);

Vue.mixin({
    data() {
        return labels;
    }
});

const vm = new Vue({
    router,
    store,
    render: h => h(app),
    el: '#app'
});

// renderer.renderToString(vm, function (error, html) {
//     if (error) throw error;
//     console.log(html);
// });