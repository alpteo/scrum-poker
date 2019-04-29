<template>
    <div class="app-main">
        <div class="hero is-link field">
            <div class="hero-head container">
                <navbar></navbar>
            </div>
        </div>
        <div class="container field">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";

    export default {
        name: 'AppMain',
        components: {Navbar}
    }
</script>

<style lang="scss">

</style>
