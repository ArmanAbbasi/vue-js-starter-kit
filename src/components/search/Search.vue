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
</style>