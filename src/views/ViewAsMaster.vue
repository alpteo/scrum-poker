<template>
    <div class="section column" ref="master">
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
            <div class="column box is-5">
                <story-list v-model="activeStory"></story-list>
            </div>
            <div class="column box is-4">
                <label class="label is-size-6">Active Story</label>
                <div class="is-divider"></div>
                <div v-if="!activeStory">
                    There is no active story.
                </div>
                <div v-if="activeStory">
                    <label class="subtitle is-size-6">{{activeStory.name.substring(activeStory.name.indexOf("/") + 1)}}</label>
                    <div class="is-divider"></div>
                    <div v-if="activeStory.masterVote">
                        Master voted: {{activeStory.masterVote}}
                    </div>
                    <div v-else >
                        <vote-section v-model="vote"></vote-section>
                        <div class="section control has-text-right">
                            <button class="button is-primary is-outlined" @click="submitVote" :disabled="!vote">Submit vote</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column box is-3">
                <label class="label is-size-6">Scrum Master Panel</label>
                <div class="is-divider"></div>
                <div v-if="!activeStory">
                    There is no active story.
                </div>
                <div v-if="activeStory">
                    <label class="subtitle is-size-6">{{activeStory.name.substring(activeStory.name.indexOf("/") + 1)}}</label>
                    <div class="is-divider"></div>
                    <div class="list">
                        <label class="label"># Total voters: {{activeStory.totalVoterNum}}</label>
                        <div class="list-item" v-for="n in activeStory.totalVoterNum-1" :key=n>
                            Voter {{n}} : {{activeStory.votes[n-1] ? activeStory.votes[n-1] : "Not voted"}}
                        </div>
                        <div class="list-item">
                            Scrum master : {{activeStory.masterVote ? activeStory.masterVote : "Not voted"}}
                        </div>
                    </div>
                    <div v-if="Number(activeStory.totalVoterNum) === Number(activeStory.currentVoterNum)" class="field">
                        <label class="label">Final score:</label>
                        <input class="input" v-model="finalScore" type="number"/>
                    </div>
                    <button @click="endVoting" class="button is-danger is-fullwidth"
                            :disabled="Number(activeStory.totalVoterNum) !== Number(activeStory.currentVoterNum) || !finalScore">
                        End voting
                    </button>
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
        name: "ViewAsMaster",
        components: {StoryList, VoteSection},
        data() {
            return {
                currentSession: null,
                activeStory: null,
                vote: "",
                finalScore: ""
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

                axios.get(api.story.vote_as_master + query).then(res => {

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
            },
            endVoting() {
                if (this.finalScore) {
                    const loadingComponent = this.$loading.open({
                        container: null
                    });

                    const query = '?storyName=' + this.activeStory.name + '&finalScore=' + Number(this.finalScore);

                    axios.get(api.story.end_voting + query).then(res => {

                        if (res) {
                            loadingComponent.close();
                            this.$root.$emit('updateStories');
                            this.$toast.open({
                                message: res.data,
                                type: 'is-success'
                            });
                        } else {
                            loadingComponent.close();
                            this.$toast.open({
                                message: 'Wait for other voters.',
                                type: 'is-danger'
                            });
                        }

                    }, err => {

                        loadingComponent.close();
                        this.$toast.open({
                            message: err && err.response ? err.response.data : 'Something wrong in server.',
                            type: 'is-danger'
                        });

                    });
                } else {
                    this.$toast.open({
                        message: '* Final score is required.',
                        type: 'is-danger'
                    });
                }
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
