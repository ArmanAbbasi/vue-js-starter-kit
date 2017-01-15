import api from './utils/api.js'

export const getHomePageProducts = ({ commit }) => {
    return api.get('./../src/data/homepageProducts.json')
        .then((response) => commit('GET_HOMEPAGE_PRODUCTS', response))
        .catch((error) => commit('API_FAILURE', error));
};

export const getBannerProducts = ({ commit }) => {
    return api.get('./../src/data/bannerProducts.json')
        .then((response) => commit('GET_BANNER_PRODUCTS', response))
        .catch((error) => commit('API_FAILURE', error));
};

export const getProductDetails = ({ commit }, productId) => {
    return api.get('./../src/data/products/productDetails' + productId + '.json', { productId: productId })
        .then((response) => commit('GET_PRODUCT_DETAILS', response))
        .catch((error) => commit('API_FAILURE', error));
};