export const GET_HOMEPAGE_PRODUCTS = (state, resp) => {
    state.products = resp;
};

export const GET_BANNER_PRODUCTS = (state, resp) => {
    state.bannerProducts = resp;
};

export const GET_PRODUCT_DETAILS = (state, resp) => {
    state.productDetails = resp;
};

export const API_FAILURE = (state, resp) => {
    state.apiFailure = resp;
};