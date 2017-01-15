<template>
    <main>
        <search></search>
        <slider :items="bannerProducts"></slider>
        <div id="productsContainer" class="product-container">
            <product-block v-for="product in productDetails" :product="product"></product-block>
        </div>
        <newsletter></newsletter>
    </main>
</template>

<script>
    import productBlock from './../components/product-block/product-block.vue';
    import slider from '../components/slider/slider.vue';
    import newsletter from './../components/newsletter/newsletter.vue';
    import search from './../components/search/search.vue';

    const homePage = {
        name: 'home-page',
        components: {
            productBlock,
            slider,
            newsletter,
            search
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