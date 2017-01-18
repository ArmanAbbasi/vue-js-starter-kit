<template>
    <header>
        <nav>
            <router-link to="/" class="nav-link">{{title}}</router-link>
        </nav>
        <i class="icon-cart"></i>
    </header>
</template>

<script>
    export default {
        name: 'c-header'
    };
</script>