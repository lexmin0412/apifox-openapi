# Apifox-OpenApi

Apifox 开放 API 的 JavaScript SDK.

![version](https://img.shields.io/npm/v/apifox-openapi) ![downloads-month](https://img.shields.io/npm/dm/apifox-openapi)

## Roadmap

- [x] 支持 Apifox 的所有开放 API
- [ ] Playground

## 前置准备

首先你需要有一个 Apifox 项目，拿到这个项目的 ID，并创建一个访问令牌。

获取方式：

- 项目 ID：项目->项目设置->通用设置->基本设置
- 访问令牌：右上角头像->账号设置->API 访问令牌

## 用法 

### 安装

```shell
pnpm add apifox-openapi
```

### 初始化实例

```js
const { ApifoxOpenApi } = require('apifox-openapi')

const instance = new ApifoxOpenApi({ 
  // Apifox 访问令牌
  accessToken: 'APS-XXXX',
  // Apifox 开放 API 版本
  apiVersion: '2024-03-28',
  // Apifox 项目 ID
  projectId: '9999999',
  // 语言
  locale: 'zh-CN',
})
```

### 导入 OpenAPI/Swagger 格式数据

```js
const fs = require('fs')
const path = require('path')

const result = fs.readFileSync(path.resolve(__dirname, './openapiv3.json')).toString()

// 导入 API
instance.importOpenApi(result).then((res)=>{
  console.log('导入成功', res)
}).catch((err)=>{
  console.error('导入失败', err)
})
```

### 导入 Postman Collection 格式数据

```js
instance.importPostmanCollection().then((res)=>{
  console.log('导入成功', res)
}).catch((err)=>{
  console.error('导入失败', err)
})
```

### 导出 OpenAPI/Swagger 格式数据

```js
instance.exportOpenApi().then((res)=>{
  console.log('导出成功', res)
}).catch((err)=>{
  console.error('导出失败', err)
})
```

## 最佳实践

对于前后端分离并有 BFF 层的场景，往往需要前端同学在 BFF 和客户端代码中书写重复的请求代码、类型定义等，这个过程工作量较大且容易出错，如果后端接口发生变更往往牵一发而动全身。通过本仓库提供的功能仓库，我们可以使用自动化过程来解决这个问题。

一个经过生产验证的最佳实践如下：

1. 通过工具将 BFF 接口代码导出为 OpenAPI/Swagger 格式数据
2. 通过 importOpenApi 将上一步的数据导入到 Apifox 项目中
3. 通过 exportOpenApi 将 Apifox 项目导出 OpenAPI/Swagger 格式数据
4. 通过工具将上一步中导出的数据转换为前端请求代码

## 相关链接

- [Apifox 开放 API](https://apifox-openapi.apifox.cn/doc-4296592)
