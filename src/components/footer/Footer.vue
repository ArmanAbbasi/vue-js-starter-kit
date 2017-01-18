<template>
    <footer>{{title}} &copy; {{copyRightYear}} <a :href="copyrightLink" class="footer-link">{{copyRightAuthor}}</a><br/><small>{{imageCopyright}}</small></footer>
</template>

<script>
    export default {
        name: 'v-footer'
    };
</script>