<template>
    <div aria-busy="false" role="slider" aria-valuemin="1" aria-valuemax="2" aria-valuenow="1" class="slide-container">
        <div class="slide-holder" ref="slidesHolder" style="transform: translateX(0);">
            <router-link v-for="item in items" :to="item.url" class="slide" :style="{backgroundImage: 'url(' + item.image + ')'}">
                <h2 class="slide-title">{{item.title}}</h2>
                <p class="slide-description">{{item.description}}</p>
            </router-link>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'c-slider',
        props: [
            'items'
        ],
        beforeUpdate() {
            this.sliderEl = this.$el;

            this.timer = setInterval(() => {
                this.nextSlide();
                this.sliderEl.setAttribute('aria-busy', 'true');
                setTimeout(() => {
                    this.sliderEl.setAttribute('aria-busy', 'false');
                }, 1000);
            }, 3000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods: {
            nextSlide() {
                const holderEl = this.$refs.slidesHolder;
                const children = holderEl.children && holderEl.children;
                const width = children && children[0].clientWidth;
                const currentPositionX = parseInt(/\d+/.exec(holderEl.style.transform)[0], 10);
                const currentIdx = !currentPositionX ? 0 : (children.length * width) / currentPositionX;
                const xNewPos = (((currentIdx + 1) >= children.length ? 0 : currentIdx + 1) * width);

                holderEl.setAttribute('style', (`transform: translateX(-${xNewPos}px);`));
            }
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    @import '../../stylesheets/helpers/base.scss';

    .slide-container {
        display: block;
        width: calc(100% - 2px);
        overflow:hidden;
        margin: 10px 0;
        border: 1px solid $brandColorWhite;

        .slide-holder {
            @include vendor-prefix(transform, translateZ(0));
            @include vendor-prefix(transition, transform 1s ease);
            white-space: nowrap;

            .slide {
                background: $brandColorWhite no-repeat top;
                background-size: cover;
                width: 100%;
                height: 200px;
                display: inline-block;
                white-space: normal;
                position: relative;
                left: 0;
                z-index: 5;
                vertical-align: top;

                &:before {
                    @include background-gradient(to right, $brandColorBlack, transparent);
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 200px;
                    width: 50%;
                }

                .slide-title {
                    margin: .5rem 0 0 .5rem;
                    font-size: 110%;
                }

                .slide-description {
                    margin: 0 0 0 .5rem;
                }
            }
        }
    }
</style>