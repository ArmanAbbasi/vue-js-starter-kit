<template>
    <div>
        <header-tpl></header-tpl>
        <transition name="fade">
            <router-view class="container"></router-view>
        </transition>
        <footer-tpl></footer-tpl>
    </div>
</template>

<script>
    import headerTpl from './components/header/header.vue';
    import footerTpl from './components/footer/footer.vue';

    export default {
        name: 'app',
        components: {
            headerTpl,
            footerTpl
        }
    };
</script>

<style lang="sass" scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 200ms;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>