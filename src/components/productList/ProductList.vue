<template>
    <router-link :to="product.url" class="product" :style="{backgroundImage: 'url(' + product.image + ')'}">
        <h2>{{product.title}}</h2>
        <p>{{product.description}}</p>
    </router-link>
</template>

<script type="text/babel">
    export default {
        name: 'c-product-list',
        props: [
            'product'
        ]
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    @import '../../stylesheets/helpers/variables';
    @import '../../stylesheets/helpers/mixin';

    .product {
        @include vendor-prefix(transition, height 500ms ease);
        background: $brandColorWhite no-repeat top;
        background-size: cover;
        padding: .5rem 0 0 .5rem;
        vertical-align: top;
        margin-bottom: 10px;
        position: relative;
        overflow: hidden;
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: $brandColorWhite;
        height: calc(100px - .5rem);
        display: inline-block;
        width: calc(100% - .5rem);
        max-width:640px;
        font-size: $fontSizeSmall;
        color: $brandColorDark;
    }
</style>