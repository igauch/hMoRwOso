# 说明
这是个人根据[react官方文档](https://facebook.github.io/react/docs/rendering-elements.html)学习练习的，借git做版本控制的实例
# 记录
* 和VUE一样，这是一个需要编译发布才能正常运行的东西，和angular1不同，而编译发布主要依赖npm，而npm主要靠package.json来引导执行
### package.json
* 这是NPM的配置文件，不是webpack的，webpack对应的配置文件是webpack.config.js
* 参考的package教程[1](http://javascript.ruanyifeng.com/nodejs/packagejson.html)、[2](http://www.mujiang.info/translation/npmjs/files/package.json.html)，这里的package文件没有指明main配置，所以默认index.js启动
    * npm run，然后按tab键，就会显示所有可以使用的命令
### import
* import是个很简单的东西（是吗？）但是当看到`import React from 'react'`时我懵了，这他妈的react文件在哪？全局查找export也没有看到react啊？查，搜，然并卵，[MDN上的说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import),然后我就开始在node_modules里去找
### %PUBLIC_URL%
### JSX

