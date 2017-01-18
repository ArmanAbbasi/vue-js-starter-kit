<template>
    <div>
        <header-tpl></header-tpl>
        <main>
            <search></search>
            <slider :items="bannerProducts"></slider>
            <div id="productsContainer" class="product-container">
                <product-block v-for="product in productDetails" :product="product"></product-block>
            </div>
            <newsletter></newsletter>
        </main>
        <footer-tpl></footer-tpl>
    </div>
</template>

<script>
    import productBlock from '../components/productListingItem/ProductListingItem.vue';
    import headerTpl from '../components/header/Header.vue';
    import footerTpl from '../components/footer/Footer.vue';
    import slider from '../components/slider/Slider.vue';
    import newsletter from '../components/newsletter/Newsletter.vue';
    import search from '../components/search/Search.vue';

    const homePage = {
        name: 'home-page',
        components: {
            productBlock,
            slider,
            newsletter,
            search,
            headerTpl,
            footerTpl
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