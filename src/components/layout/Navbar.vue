<template>
    <nav class="navbar is-widescreen is-link">
        <div class="navbar-brand">
            <div class="navbar-item">
                <a @click="setPath('/home')"><p style="font-family: 'Oxygen', sans-serif; font-size: 23px; cursor: pointer"> Scrum Poker</p></a>
            </div>
        </div>
    </nav>
</template>

<script>

    export default {
        name: 'Navbar',
        methods: {
            setPath(path) {
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../node_modules/bulma/sass/utilities/all";
    $navbar-dropdown-item-hover-color: $white !important;
    @import '../../../node_modules/buefy/dist/buefy.css';
    @import "~bulma";
</style>
