<template>
    <div class="section column">
        <div class="level">
            <div class="level-left">
                <h1 class="title is-size-5">
                    <i class="fas fa-bookmark has-text-link" style="margin-right: 8px"></i>
                    {{currentSession ? currentSession.name : ""}}
                </h1>
            </div>
        </div>
        <div class="is-divider"></div>
        <div class="columns">
            <div class="column box is-7">
                <story-list v-model="activeStory"></story-list>
            </div>
            <div class="column box is-5">
                <label class="label is-size-6">Active Story</label>
                <div class="is-divider"></div>
                <div v-if="!activeStory">
                    There is no active story.
                </div>
                <div v-if="activeStory">
                    <label class="subtitle is-size-6">{{activeStory.name.substring(activeStory.name.indexOf("/") + 1)}}</label>
                    <div class="is-divider"></div>
                    <vote-section v-model="vote"></vote-section>
                    <div class="section control has-text-right">
                        <button class="button is-primary is-outlined" @click="submitVote" :disabled="!vote">Submit vote</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {api} from "../environments/environment"
    import VoteSection from "../components/VoteSection";
    import StoryList from "../components/StoryList";

    export default {
        name: "ViewAsDeveloper",
        components: {StoryList, VoteSection},
        data() {
            return {
                currentSession: null,
                stories: [],
                activeStory: null,
                vote: ""
            }
        },
        created() {
            this.getSession();
        },
        methods: {
            getSession() {
                const loadingComponent = this.$loading.open({
                    container: null
                });

                axios.get(api.session.info + '?sessionId=' + this.$route.params.sessionId).then(session => {

                    this.currentSession = session.data;

                    loadingComponent.close();

                    // this.$root.$emit('updateStories');

                }, () => {

                    loadingComponent.close();
                    this.$toast.open({
                        message: 'Session not valid.',
                        type: 'is-danger'
                    });

                });
            },
            submitVote() {
                const loadingComponent = this.$loading.open({
                    container: null
                });

                const query = '?storyName=' + this.activeStory.name + '&vote=' + Number(this.vote);

                axios.get(api.story.vote_as_developer + query).then(res => {

                    loadingComponent.close();

                    this.$root.$emit('updateStories');

                    this.$toast.open({
                        message: res.data,
                        type: 'is-success'
                    });

                }, err => {

                    loadingComponent.close();
                    this.$toast.open({
                        message: err.response.data,
                        type: 'is-danger'
                    });

                });
            }
        }
    }
</script>

<style scoped>

    .box {
        margin-right: 2px;
        margin-left: 2px;
    }

</style>
