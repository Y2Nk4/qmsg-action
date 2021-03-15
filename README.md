# QMsg-Action
An GitHub Action to send notification via QMsg

### 使用案例
```yaml
- name: Send A Notification Message
  uses: Y2Nk4/qmsg-action@master
    with:
      qq: ${{ secrets.QMSG_NOTIFY_QQ }}
      key: ${{ secrets.QMSG_KEY }}
      message: '${{ github.actor }} 针对 ${{ github.repository }} ${{ github.ref }} 的提交 ${{ github.sha }} (${{ github.event.head_commit.message }}) 的 ${{ github.workflow }} 任务部署完成'
```

若要使用项目仓库中的版本，使用 `Y2Nk4/qmsg-action@master`。
若需要使用稳定版则可以使用 `Y2Nk4/qmsg-action@{Release版本号}`

详细实例可以参考本项目的 [Test Action](.github/workflows/test.yml)

### 输入
> 提示： 标注 🔐 的参数属于敏感信息，需要放在项目的 `secret` 存储中，用法可以参考最后的实例

#### `qq` 🔐
Optional

接收推送的QQ号，多个QQ号时，使用`,`进行分隔

#### `groups` 🔐
Optional

接收推送的QQ群号，多个QQ群号时，使用`,`进行分隔

#### `key` 🔐
Optional

接收推送的QQ群号，多个QQ群号时，使用`,`进行分隔

#### `message`
Required

推送的消息，可以使用环境变量

例子
```yaml
message: '${{ github.actor }} 针对 ${{ github.repository }} ${{ github.ref }} 的提交 ${{ github.sha }} (${{ github.event.head_commit.message }}) 的 ${{ github.workflow }} 任务部署完成'
```

#### `ignoreFailure`
Optional|default: 'true'

是否忽略错误以执行下一步CI操作，指定为 `true` 的时候会忽略错误


