import HomePage from '../views/HomePage.vue';
import ProductPage from '../views/Product.vue';

// import { Auth } from './middleware';

export default [{
        path: '/',
        component: HomePage
    }, {
        path: '/product/:prodId',
        component: ProductPage,
    }];


//import HomePage from '../views/HomePage.vue';
//import ProductPage from '../views/Product.vue';
//const path = require('path');

// import { Auth } from './middleware';

// const view = name => resolve => {
//     require(['../views/' + name + '.vue'], resolve);
// };
//
// export default [{
//     path: '/',
//     component: process.BROWSER  ? () => view('HomePage') : require('../views/HomePage.vue')
// }, {
//     path: '/product/:prodId',
//     component: process.BROWSER  ? () => view('Product') : require('../views/Product.vue'),
// }];