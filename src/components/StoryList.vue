<template>
    <div>
        <label class="label is-size-6">
            Story List
            <a @click="updatePage" class="tooltip" data-tooltip="Refresh stories">
                <i class="fas fa-sync-alt has-text-success"></i>
            </a>
        </label>
        <div class="is-divider"></div>
        <table class="table is-fullwidth">
            <thead>
            <tr>
                <th>Story Name</th>
                <th>Final Score</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(story, index) in stories" :key=index>
                <td>{{story.name.substring(story.name.indexOf("/") + 1)}}</td>
                <td>{{story.finalScore ? story.finalScore.$numberDouble : ""}}</td>
                <td>{{story.status}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import {api} from "../environments/environment"

    export default {
        name: "StoryList",
        data() {
            return {
                stories: [],
                activeStory: null,
                updateInterval: null
            }
        },
        created() {
            this.$root.$on('updateStories', () => {
                this.updatePage();
            });
            this.updatePage();
            this.updateInterval = setInterval(function () {
                this.updatePage();
            }.bind(this), 120000);
        },
        destroyed() {
            clearInterval(this.updateInterval);
        },
        watch: {
            stories() {
                this.$emit('input', this.activeStory);
            },
            activeStory() {
                this.$emit('input', this.activeStory);
            }
        },
        methods: {
            updatePage() {
                this.getStories();
                this.getActiveStory();
            },
            getStories() {
                const loadingComponent = this.$loading.open({
                    container: null
                });

                axios.get(api.story.all + '?sessionId=' + this.$route.params.sessionId).then(stories => {

                    this.stories = stories.data;
                    loadingComponent.close();

                }, () => {

                    loadingComponent.close();
                    // this.$toast.open({
                    //     message: 'Something went wrong while getting sessions.',
                    //     type: 'is-danger'
                    // });

                });
            },
            getActiveStory() {
                const loadingComponent = this.$loading.open({
                    container: null
                });

                const query = '?sessionId=' + this.$route.params.sessionId + '&status=active';

                axios.get(api.story.info + query).then(activeStory => {

                    this.activeStory = activeStory.data;
                    loadingComponent.close();

                }, () => {

                    loadingComponent.close();
                    // this.$toast.open({
                    //     message: 'No active story.',
                    //     type: 'is-danger'
                    // });

                });
            }
        }
    }
</script>

<style scoped>

</style>
