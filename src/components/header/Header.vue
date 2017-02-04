<template>
    <header>
        <nav>
            <router-link to="/" class="nav-link">{{title}}</router-link>
        </nav>
        <i class="icon-cart"></i>
    </header>
</template>

<script type="text/babel">
    export default {
        name: 'c-header'
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    @import '../../stylesheets/helpers/variables';
    @import '../../stylesheets/helpers/mixin';

    header {
        background-color: $brandColorDark;
        overflow: hidden;
        position: relative;

        .icon-cart {
            background: url('/dist/images/cart.svg') no-repeat;
            width: 25px;
            height: 25px;
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }

    nav {
        @include vendor-prefix(transition, left 300ms ease);
        @include vendor-prefix(transform, translateZ(0));
        white-space: nowrap;
        padding: 0 .5rem;
        display: inline-block;
        position: relative;

        .nav-link {
            padding: 0 1rem;
            line-height: $fontSizeIcon;
            display: inline-block;
            position: relative;

            &:after {
                @include vendor-prefix(transition, 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55));
                @include vendor-prefix(transform, translate3d(0, 0, 0));
                background-color: $brandColorWhite;
                position: absolute;
                z-index: 1;
                content: '';
                left: 0;
                height: 4px;
                bottom: 2px;
                padding-right: 0;
                border-radius: 3px;
                width: 0;
            }

            &:hover:after {
                padding-right: 100%;
            }

            &:first-child {
                padding-left: 0;
                width: 65px;
                text-align: center;
                font-size: $fontSizeVerySmall;
                padding-right: .5rem;

                &:after {
                    content: '';
                    position: absolute;
                    border: 2px solid $brandColorWhite;
                    left: -5px;
                    top: 6px;
                    height: 20px;
                    width: 70px;
                    border-radius: 20px;
                    background-color: transparent;
                    padding-right: 0 !important;
                }

                &:hover:after {
                    padding-right:0;
                }
            }
        }
    }
</style>