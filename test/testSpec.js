import { assert } from 'chai';
import Vue from 'vue';
import slider from '../src/components/slider/slider.vue';

const vm = new Vue({
    el: '<slider></slider>',
    render: (h) => h(slider)
});

describe('Slider', () => {
    beforeEach(() => {
        console.log('1', vm);
    });

    it('should set modal to inactive', () => {
        console.log('2', vm);
        assert.equal(vm.$el, false);
    });
});