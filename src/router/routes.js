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