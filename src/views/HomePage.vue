<template>
    <div>
        <c-header></c-header>
        <main>
            <c-search></c-search>
            <c-slider :items="bannerProducts"></c-slider>
            <div id="productsContainer" class="product-container">
                <c-product-list v-for="product in productDetails" :product="product"></c-product-list>
            </div>
            <c-newsletter></c-newsletter>
        </main>
        <c-footer></c-footer>
    </div>
</template>

<script type="text/babel">
    import cProductList from '../components/productList/ProductList.vue';
    import cHeader from '../components/header/Header.vue';
    import cFooter from '../components/footer/Footer.vue';
    import cSlider from '../components/slider/Slider.vue';
    import cNewsletter from '../components/newsletter/Newsletter.vue';
    import cSearch from '../components/search/Search.vue';

    const homePage = {
        name: 'home-page-view',
        components: {
            cProductList,
            cSlider,
            cNewsletter,
            cSearch,
            cHeader,
            cFooter
        },
        methods: {
            getHomePageProducts() {
                this.$store.dispatch('getHomePageProducts');
            },
            getBannerProducts() {
                this.$store.dispatch('getBannerProducts');
            }
        },
        computed: {
            productDetails() {
                return this.$store.state.products;
            },
            bannerProducts() {
                return this.$store.state.bannerProducts;
            }
        },
        created() {
            this.getBannerProducts();
            this.getHomePageProducts();
        }
    };

    export default homePage;
</script>

<style lang="sass" rel="stylesheet/scss">
    @import  './../stylesheets/main.scss';

    .slide-container {
        display: block;
        width: calc(100% - 2px);
        overflow:hidden;
        margin: 10px 0;
        border: 1px solid $brandColorWhite;

        .slide-holder {
            @include vendor-prefix(transform, translateZ(0));
            @include vendor-prefix(transition, transform 1s ease);
                white-space: nowrap;

            .slide {
                background: $brandColorWhite no-repeat top;
                background-size: cover;
                width: 100%;
                height: 200px;
                display: inline-block;
                white-space: normal;
                position: relative;
                left: 0;
                z-index: 5;
                vertical-align: top;

                &:before {
                    @include background-gradient(to right, $brandColorBlack, transparent);
                     content: '';
                     position: absolute;
                     top: 0;
                     left: 0;
                     height: 200px;
                     width: 50%;
                 }

                .slide-title {
                    margin: .5rem 0 0 .5rem;
                    font-size: 110%;
                }

                .slide-description {
                    margin: 0 0 0 .5rem;
                }
            }
        }
    }
</style>