# uTool 插件-书签小助手

---

### 使用之前

- 默认会读取系统目录书签数据，读取失败则不会展示书签数据
- 自定义书签数据方法
  - 键入 setting 键入设置页面，选择自己的标签文件
  ## ![image](https://github.com/HELLOWORED0510/uTools-bookmark-helper/blob/dev/doc/setting.png)

---

### 使用方法

- 普通模式

  > 输入关键字检索，回车跳转

  ## ![image](https://github.com/HELLOWORED0510/uTools-bookmark-helper/blob/dev/doc/normal.png)

- query 模式
  > 保存 url 中配置<code>{{query}}</code>占位符，动态替换查询字符串
  1. 输入关键字检索
     ![image](https://github.com/HELLOWORED0510/uTools-bookmark-helper/blob/dev/doc/query_mode.png)
  2. 回车进入 query 模式
     ![image](https://github.com/HELLOWORED0510/uTools-bookmark-helper/blob/dev/doc/query_mode_2.png)
  3. 输入 query 替换字符串，输入完成，回车跳转
     ![image](https://github.com/HELLOWORED0510/uTools-bookmark-helper/blob/dev/doc/query_mode_replace.png)

### 开发计划

- [x] 自定义书签文件路径
- [ ] 书签同步

---

### 已知问题

- ~~设置完再次进入仍然停留在设置页面，目前没找到解决方案~~
  > ~~可以通过配置-隐藏后台完全退出解决~~


