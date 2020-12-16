let core = require("@actions/core"),
    QMsg = require('./lib/QMsg'),
    { GithubActions } = require('./lib/GithubActions')

let actions = new GithubActions()

let qq = core.getInput('qq'),
    groups = core.getInput('groups'),
    isIgnoreFailure = (core.getInput('ignoreFailure') || 'true') === 'true'

if (!qq || !groups) {
    core.error('Either qq or groups need to be set in order to send message.')
    return actions.setFailed(JSON.stringify({ error: 'Either qq or groups need to be set in order to send message.' }))
}

let QMsgClient = new QMsg({
    apikey: core.getInput('key', { required: true })
})

let jobs = []
let messageContent = core.getInput('message', { required: true })

if (qq) {
    jobs.push(
        QMsgClient.pushPrivateChatMessage(messageContent, qq.split(','))
            .then((resp) => {
                actions.debug('Success to Send Chat Message', resp)
                return Promise.resolve(resp)
            })
            .then((error) => {
                actions.debug('Failed to Send Chat Message', error)
                return Promise.reject(error)
            })
    )
}
if (groups) {
    jobs.push(
        QMsgClient.pushGroupMessahe(messageContent, groups.split(','))
            .then((resp) => {
                actions.debug('Success to Send Group Message', resp)
                return Promise.resolve(resp)
            })
            .then((error) => {
                actions.debug('Failed to Send Group Message', error)
                return Promise.reject(error)
            })
    )
}

jobs.then((result) => {
    return actions.setOutput('response', JSON.stringify(result))
}).catch(error => {
    if (isIgnoreFailure) {
        actions.setOutput(JSON.stringify({ error: error.toString() }));
    } else {
        return actions.setFailed(JSON.stringify({ error: error.toString() }))
    }
})
