import auth from './middlewares/auth';
import store from '../store/index';

export const Auth = auth;

export const Global = (router) => {
    router.afterEach((from, to) => {
        //store.commit('viewLoad', true)
    });


    router.beforeEach((from, to, next) => {
        //store.commit('viewLoad', false)
        next();
    })
}