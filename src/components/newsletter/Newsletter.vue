<template>
    <div class="newsletter">
        <p class="text">{{newsLetterMessage}}</p>
        <span class="input-container"><input type="email" id="newsletter" :aria-label="newsletterInputMessageAria" :placeholder="newsletterInputMessage"/></span><button type="submit" id="newsletterBtn" data-type="newsletter" data-input="newsletter" :aria-label="submitYourEmailAria">{{signUp}}</button>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'c-newsletter'
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    @import '../../stylesheets/helpers/variables';

    .newsletter {
        width: 100%;
        font-size: $fontSizeSmall;
        text-align: center;

        .text {
            padding: 1.5rem 0;
            background-color: $brandColorDark;
            width: 100%;
            font-size: 100%;
        }
    }
</style>