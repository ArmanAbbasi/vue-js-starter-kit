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

<script>
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

<style lang="sass" scoped>
    @import  './../stylesheets/homepage.scss';
</style>