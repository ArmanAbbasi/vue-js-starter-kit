<template>
    <div>
        <span class="input-container"><input :aria-label="searchForProductsAria" id="searchInput" type="search" :placeholder="searchInput"/></span><button type="submit" data-type="search" data-input="searchInput" id="searchBtn" @click="">{{search}}</button>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'v-search'
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    @import '../../stylesheets/helpers/variables';
    @import '../../stylesheets/helpers/mixin';

    .input-container {
        position: relative;

        input {
            padding: 0;
            border: 0;
            height: $fontSizeIcon;
            text-indent: .5rem;
            width: 75%;
            font-size: $fontSizeBase;
            vertical-align: top;
        }

        &:after {
            position: absolute;
            content: '✉';
            top: -2px;
            right: 5px;
            font-size: $fontSizeIcon;
            color: rgba(34, 38, 75, 0.35);
            pointer-events: none;
            background-color: $brandColorWhite;
            width: 34px;
            height: 30px;
            vertical-align: top;
            line-height: 31px;
        }

        &:first-child:after {
            @include vendor-prefix(transform, rotate(-45deg));
            background-color: transparent;
            content: '⚲';
            width: 25px;
        }
    }
</style>