import Vue from 'vue';
import { assert } from 'chai';
import slider from '../../src/components/slider/Slider.vue';

function getRenderedText (Component, propsData) {
    const Ctor = Vue.extend(Component);
    const vm = new Ctor({ propsData }).$mount();
    return vm.$el;
}

describe('Slider', () => {
    it('has the expected component name', () => {
        assert.equal(slider.name, 'slider');
    });

    it('has all hooks created', () => {
        assert.equal(typeof slider.methods, 'object');
        assert.equal(typeof slider.beforeUpdate, 'function');
        assert.equal(typeof slider.beforeDestroy, 'function');
    });

    it('watches the expected properties', () => {
        assert.equal(slider.props, 'items');
    });

    it('creates the right number of slide links for number of items', () => {
        assert.equal(getRenderedText(slider, {
            items: []
        }), 'items');
    });
});