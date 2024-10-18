# Apifox-OpenApi

Apifox 开放 API 的 JavaScript SDK.

## 用法

```js
const fs = require('fs')
const path = require('path')
const { ApifoxOpenApi } = require('apifox-openapi')

const result = fs.readFileSync(path.resolve(__dirname, './openapiv3.json')).toString()

// 初始化
const instance = new ApifoxOpenApi({ 
  // Apifox 访问令牌
  accessToken: 'APS-XXXX',
  // Apifox 开放 API 版本
  apiVersion: '2024-03-28',
  // Apifox 项目 ID
  projectId: '9999999'
})

// 调用 API
instance.importOpenApi(result).then((res)=>{
  console.log('导入成功', res)
}).catch((err)=>{
  console.error('导入失败', err)
})
```

## 参考文档

- [Apifox 开放 API](https://apifox-openapi.apifox.cn/doc-4296592)
