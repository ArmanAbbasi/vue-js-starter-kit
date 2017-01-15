<template>
    <router-link :to="product.url" class="product" :style="{backgroundImage: 'url(' + product.image + ')'}">
        <h2>{{product.title}}</h2>
        <p>{{product.description}}</p>
    </router-link>
</template>

<script>
    export default {
        name: 'product-block',
        props: [
            'product'
        ]
    };
</script>