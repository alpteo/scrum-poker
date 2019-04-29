<template>
    <div class="column">
        <div class="field">
            <div class="level">
                <div class="level-left">
                    <h1 class="title is-size-5">
                        <i class="fas fa-plus has-text-success" style="margin-right: 8px"></i>
                        New Session
                    </h1>
                </div>
            </div>
            <div class="is-divider"></div>
            <div class="field-body">
                <div class="field">
                    <label class="label">Session Name / Description <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input" type="text" v-model="name" maxlength="200" placeholder="Session name, description">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Number of Voters <span class="has-text-danger">*</span></label>
                    <div class="field has-addons">
                        <p class="control">
                            <a class="button is-static">
                                #
                            </a>
                        </p>
                        <p class="control is-expanded">
                            <input class="input" type="number" v-model="voters" placeholder="Number of voters">
                        </p>
                    </div>
                </div>
            </div>
            <div class="field-body">
                <div class="field">
                    <label class="label">Stories <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <textarea class="textarea" v-model="textarea" placeholder="Stories" style="min-height: 200px"></textarea>
                    </div>
                </div>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control has-text-right">
                        <button class="button is-link is-outlined" @click="createSession">
                            <i class="fas fa-check" style="margin-right: 8px"></i>
                            Create Session
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="is-divider"></div>
        <div class="section">
            <div class="level">
                <div class="level-left">
                    <h1 class="title is-size-5">
                        <i class="fas fa-bookmark has-text-link" style="margin-right: 8px"></i>
                        Created Sessions
                    </h1>
                </div>
                <a class="level-right" @click="getSessions">
                    Refresh
                    <i class="fas fa-sync-alt has-text-success" style="margin-left: 8px"></i>
                </a>
            </div>
            <div class="is-divider"></div>
            <p v-if="!createdSessions.length" class="has-text-centered has-text-grey">
                <span>There is no content.</span>
            </p>
            <div class="box" v-for="(session, index) in createdSessions" :key="index">
                <div class="level has-text-centered">
                    <div class="level-item">
                        <div>
                            <p class="heading">Session</p>
                            <p class="subtitle">{{session.name}}</p>
                        </div>
                    </div>
                    <!--<div class="level-item">-->
                        <!--<div>-->
                            <!--<p class="heading">Stories</p>-->
                            <!--&lt;!&ndash;<p class="subtitle">{{session.stories}}</p>&ndash;&gt;-->
                            <!--<p class="text" v-for="(story, index) in session.stories" :key=index>{{story}}</p>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="level-right">
                        <button class="button is-dark is-outlined"
                                @click="setPath('/view-as-master/' + session._id.$oid)"
                                style="margin-right: 5px"
                        >
                            View as Master
                        </button>
                        <button class="button is-link is-outlined"
                                @click="setPath('/view-as-developer/' + session._id.$oid)"
                        >
                            View as Developer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {api} from "../environments/environment"

    export default {
        name: "AddStory",
        data() {
            return {
                name: "",
                voters: 0,
                textarea: "",
                createdSessions: []
            }
        },
        mounted() {
            this.getSessions();
        },
        methods: {
            setPath(path) {
                this.$router.push(path);
            },
            createSession() {
                if (this.name && this.voters && this.textarea) {
                    const loadingComponent = this.$loading.open({
                        container: null
                    });

                    const body = {
                        'name': this.name,
                        'totalVoterNum': Number(this.voters),
                        'stories': this.textarea.trim().split(/\n/)
                    };
                    const headers = {
                        'content-type': 'application/json'
                    };

                    axios.post(api.session.create, body, {headers: headers}).then(res => {

                        if (res.status === 201) {
                            this.$toast.open({
                                message: 'Session is created successfully.',
                                type: 'is-success'
                            });
                        }
                        this.clearModels();
                        loadingComponent.close();
                        this.getSessions();

                    }, err => {

                        loadingComponent.close();
                        this.$toast.open({
                            message: 'Something went wrong, ' + err.response ? err.response.data : "",
                            type: 'is-danger'
                        });

                    });
                } else {
                    this.$toast.open({
                        message: '* Fill in all required fields.',
                        type: 'is-danger'
                    });
                }

            },
            getSessions() {
                const loadingComponent = this.$loading.open({
                    container: null
                });

                axios.get(api.session.all).then(sessions => {

                    this.createdSessions = sessions.data;
                    loadingComponent.close();

                }, () => {

                    loadingComponent.close();
                    this.$toast.open({
                        message: 'Something went wrong while getting sessions.',
                        type: 'is-danger'
                    });

                });
            },
            clearModels() {
                this.name = "";
                this.voters = 0;
                this.textarea = "";
            }
        }
    }
</script>

<style scoped>

    .field-body {
        margin-top: 20px;
        margin-bottom: 20px;
    }

</style>
