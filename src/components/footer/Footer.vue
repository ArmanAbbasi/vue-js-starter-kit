<template>
    <footer>{{title}} &copy; {{copyRightYear}} <a :href="copyrightLink" class="footer-link">{{copyRightAuthor}}</a><br/><small>{{imageCopyright}}</small></footer>
</template>

<script type="text/babel">
    export default {
        name: 'v-footer'
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    @import '../../stylesheets/helpers/variables';
    footer {
        font-size: $fontSizeVerySmall;
        text-align: center;
        padding: 1rem 0;
        color: $brandColorDark;

        .footer-link {
            color: $brandColorDark;
            text-decoration: underline;
        }
    }
</style>