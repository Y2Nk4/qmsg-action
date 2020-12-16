let request = require('request')

class QMsg {
    static getBaseUrl () {
        return 'https://qmsg.zendee.cn:443'
    }

    constructor (config) {
        this.config = config || {}
    }

    pushPrivateChatMessage (msg, qq = []) {
        // console.log(qq, qq.length, (!qq || qq.length <= 0))

        if ((!qq || qq.length <= 0) && (!this.config.defaultQQ || this.config.defaultQQ.length <= 0)) {
            return Promise.reject(new Error('Receive QQ is not set'))
        }

        // console.log(qq || this.config.defaultQQ)
        return this.sendMsg('send', msg, (qq && qq.length > 0) ? qq : this.config.defaultQQ)
    }

    pushGroupMessahe(msg, qqGroup = []) {
        if ((!qqGroup || qqGroup.length <= 0) && (!this.config.defaultQQGroup || this.config.defaultQQGroup.length <= 0)) {
            return Promise.reject(new Error('Receive QQ is not set'))
        }

        return this.sendMsg('group', msg, (qqGroup && qqGroup.length > 0) ? qqGroup : this.config.defaultQQGroup)
    }

    sendMsg (method, msg, qq) {
        return new Promise((resolve, reject) => {
            if (!qq || qq.length <= 0) {
                return reject(new Error('Receive QQ is not set'))
            }
            if (!method || !['send', 'group'].includes(method)) {
                return reject(new Error('method is not set correctly'))
            }
            // console.log(`${QMsg.getBaseUrl()}/${method}/${this.config.apikey}`, msg)
            request({
                url: `${QMsg.getBaseUrl()}/${method}/${this.config.apikey}`,
                method: 'POST',
                formData: {
                    msg,
                    qq: qq.join(',')
                }
            }, (err, res, body) => {
                if (err) {
                    return reject(err)
                } else {
                    if (res.statusCode === 200) {
                        let result = JSON.parse(body)
                        if (result.success) {
                            return resolve(result)
                        } else {
                            return reject({ headers: res.headers, statusCode: res.statusCode, result })
                        }
                    }
                }
            })
        })
    }
}

module.exports = QMsg
