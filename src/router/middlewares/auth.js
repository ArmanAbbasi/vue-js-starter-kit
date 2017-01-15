import store from './../../store/index';

export default (to, from, next) => {
    if(store.state.user) {
        next(true);
    } else {
        next(false);
        alert('No Session');
    }
}