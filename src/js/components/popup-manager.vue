<style lang="scss">
    .popup-fade-enter-active,
    .popup-fade-leave-active {
        transition: right 0.3s ease;
    }

    .popup-fade-enter,
    .popup-fade-leave-to {
        right: -100%;
    }
</style>

<template>
    <div class="popup-layout"
         v-if="currentPopup !== null"
    >
        <div class="popup-layout__container">
            <transition appear
                        name="popup-fade"
                        mode="out-in"
            >
                <component v-bind:is="currentPopup"
                           v-bind:data="{}"
                           v-on:close="closeCurrentPopup()"
                ></component>
            </transition>
        </div>
    </div>
</template>

<script>
    import LoginPopup from './popups/login.vue';

    export default {
        created() {
            this.urlParser = document.createElement('a');
            this.popupsMap = {
                '/popup/login': LoginPopup
            }
        },
        data() {
            return {
                currentPopup: null
            };
        },
        watch: {
            currentPopup(value) {
                const BODY_HAS_POPUP_CLASS = 'body--has-popup';

                if (value === null) {
                    document.body.classList.remove(BODY_HAS_POPUP_CLASS);
                    return;
                }

                document.body.classList.add(BODY_HAS_POPUP_CLASS);
            }
        },
        methods: {
            openPopup(path) {
                console.log(path);

                this.currentPopup = this.popupsMap[path] || null;
            },
            closeCurrentPopup() {
                this.currentPopup = null;
                location.hash = '';
            },
            checkHash(url) {
                this.urlParser.href = url;
                let path = this.urlParser.hash.slice(1);

                if (path === '') {
                    this.closeCurrentPopup();
                    return true;
                }

                if (/^\/popup/.test(path) === false) {
                    return false;
                }

                this.openPopup(path);

                return true;
            }
        },
        mounted() {
            window.addEventListener(
                'hashchange',
                (event) => {
                    if (this.checkHash(event.newURL) === true) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            );
        },

    }
</script>
