<template>
    <div>
        <c-header></c-header>
        <main class="product-container">
            <c-search></c-search>
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
        <c-footer></c-footer>
    </div>
</template>

<script type="text/babel">
    import cSearch from 'components/search/Search.vue';
    import cHeader from 'components/header/Header.vue';
    import cFooter from 'components/footer/Footer.vue';

    const productPage = {
        name: 'product-view',
        components: {
            cSearch,
            cHeader,
            cFooter
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

<style lang="sass" rel="stylesheet/scss">
    .product-container {
        background-color: #FFF;
    }

    .product-container {
        color: #22264b;
    }

    .product-title,
    .product-description {
        font-weight: 500;
        margin: 10px;
    }

    .product-title {
        text-indent: 10px;
        margin: 10px 0;
    }

    .product-description {
        font-size: 12px;
    }
    .btn-full {
        width: 95%;
        margin: 2.5%;
    }

    .product-title {
        width: 80%;
        margin-right: 0;
        display: inline-block;
    }
    .save-product {
        position: relative;
        left: 20px;
        top: 3px;
        text-align: center;
        vertical-align: top;
        background-color: #e8edf3;
        width: 30px;
        height: 30px;
        border-radius: 25px;
        border: 2px solid rgba(34, 38, 75, 0.06);
        line-height: 35px;
        display: inline-block;

        &:after {
            content: '\2665';
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            font-size: 25px;
            color: rgba(34, 38, 75, 0.59);
            line-height: 30px;
            opacity: .6;
        }
    }
    .product-select {
        border: 1px solid #e8edf3;
        border-radius: 0;
        height: 35px;
        line-height: 35px;
        width: 45%;
        margin: 10px 2.5%;
        font-size: 14px;
        font-weight: 100;
        text-indent: 10px;
    }
    .select-container {
        position: relative;

        &:after {
            position: absolute;
            content: '\25bc';
            right: 10%;
            top: 0;
            color: rgba(34, 38, 75, 0.51);
        }
    }
    .product-price {
        font-size: 20px;
        text-align: center;
        height: 34px;
        line-height: 34px;
    }

    .image-container {
        position: relative;
        width: 320px;
        display: inline-block;
        height: 250px;

        .toggle {
            position: absolute;
            bottom: 5px;
            text-align: center;
            width: 100%;
            height: 20px;

            .toggle-circle {
                background-color: #000;
                width: 15px;
                height: 15px;
                border-radius: 15px;
                display: inline-block;
                border: 2px solid #e8edf3;
                margin-right: 10px;
                opacity: .5;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .product-detail-container {
        max-width: 320px;
        display: inline-block;
    }

    @media screen and (min-width: 640px) {
        .product {
            height: calc(150px - .5rem);
            width: calc(50% - 20px);
            border-width: 1px;

            &:nth-child(odd) {
                margin: 10px 10px 10px 0;
            }

            &:nth-child(even) {
                margin: 10px 0 10px 10px;
            }
        }
    }
</style>