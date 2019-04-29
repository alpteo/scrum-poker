
const baseUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/scrum-poker-nclzn/service';

export const api = {
    session: {
        'create': `${baseUrl}` + '/session/incoming_webhook/create',
        'info': `${baseUrl}` + '/session/incoming_webhook/info',
        'all': `${baseUrl}` + '/session/incoming_webhook/all'
    },
    story: {
        'all': `${baseUrl}` + '/story/incoming_webhook/all',
        'info': `${baseUrl}` + '/story/incoming_webhook/info',
        'vote_as_master': `${baseUrl}` + '/story/incoming_webhook/vote-as-master',
        'end_voting': `${baseUrl}` + '/story/incoming_webhook/end-voting',
        'vote_as_developer': `${baseUrl}` + '/story/incoming_webhook/vote-as-developer'
    }
};
