<template>
    <div>
        <header-tpl></header-tpl>
        <main class="product-container">
            <search></search>
            <div class="image-container">
                <img class="image" :src="productDetails.image"/>
                <div class="toggle">
                    <i class="toggle-circle"></i>
                    <i class="toggle-circle"></i>
                    <i class="toggle-circle"></i>
                </div>
            </div><div class="product-detail-container">
                <div class="title-container">
                    <h1 class="product-title">{{productDetails.title}}</h1><span class="save-product"></span>
                </div>
                <h2 class="product-description">{{productDetails.description}}</h2>
                <div class="product-price">{{productDetails.currency}} {{productDetails.price}}</div>
                <span class="select-container"><select class="product-select">
                    <option>Color</option>
                    <option v-for="item in productDetails.colors">{{item.color.name}}</option>
                </select></span><span class="select-container"><select class="product-select">
                    <option>Size</option>
                    <option v-for="item in productDetails.sizes">{{item}}</option>
                </select></span>
                <button class="btn-full">{{addToBag}}</button>
            </div>
        </main>
        <footer-tpl></footer-tpl>
    </div>
</template>

<script>
    import search from '../components/search/Search.vue';
    import headerTpl from '../components/header/Header.vue';
    import footerTpl from '../components/footer/Footer.vue';

    const productPage = {
        name: 'product-page',
        components: {
            search,
            headerTpl,
            footerTpl
        },
        methods: {
            getProductDetails() {
                this.$store.dispatch('getProductDetails', this.$route.params.prodId);
            }
        },
        computed: {
            productDetails() {
                return this.$store.state.productDetails;
            }
        },
        created() {
            this.getProductDetails();
        }
    };

    export default productPage;
</script>

<style lang="sass" scoped>
    @import '../stylesheets/product.scss';

    .product-container {
        background-color: #FFF;
    }
</style>