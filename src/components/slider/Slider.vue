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

<script>
    export default {
        name: 'c-slider',
        props: [
            'items'
        ],
        beforeUpdate() {
            const self = this;
            this.sliderEl = this.$el;

            this.timer = setInterval(() => {
                self.nextSlide();
                self.sliderEl.setAttribute('aria-busy', 'true');
                setTimeout(() => {
                    self.sliderEl.setAttribute('aria-busy', 'false');
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