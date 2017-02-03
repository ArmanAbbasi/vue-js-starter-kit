<template>
    <div id="app">
        <transition name="fade">
            <router-view class="container"></router-view>
        </transition>
    </div>
</template>

<style lang="sass" rel="stylesheet/scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 200ms;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>