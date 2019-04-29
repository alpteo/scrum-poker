<template>
    <div>
        <b-field v-for="i in 3" :key=i class="has-addons-centered">
            <b-radio-button v-for="j in 4"
                            :key=j
                            v-model="vote"
                            class="radio-vote"
                            :native-value=votes[(i-1)*4+(j-1)]
            >
                {{votes[(i-1)*4+(j-1)]}}
            </b-radio-button>
        </b-field>
    </div>
</template>

<script>
    export default {
        name: "VoteSection",
        data() {
            return {
                votes: [1,2,3,5,8,13,21,34,55,89,134,223],
                vote: null
            }
        },
        watch: {
            vote() {
                this.$emit('input', this.vote);
            }
        }
    }
</script>

<style scoped>

    .radio-vote {
        margin-right: 10px;
        margin-left: 10px;
        min-width: 50px;
    }

</style>
