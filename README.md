# React + Ant Design + MongoDB 管理项目

## 技术栈

- **React**：`18.2.0`
- **Ant Design (antd)**：UI 框架（注意：AntD 官方当前仅支持 React 18，虽然 18.2.0 会报 warning，但不影响使用）
- **MongoDB**：作为数据库，存储文章数据
- **Next.js App Router**：用于构建 API 接口和前后端一体化

---

## 数据库结构（MongoDB）

数据库：`myapp`  
集合：`posts`

每条文章数据结构如下：

```ts
{
  _id: ObjectId,
  title: string,
  content: string,
  author: string,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ 数据库配置

创建 `.env.local` 文件，写入如下内容：

```env
MONGODB_URI=mongodb://localhost:27017/myapp
```

确保数据库已经存在，并在其中创建一个 `posts` 集合。

---

## ✨ 功能概览

- ✅ 文章列表展示
- ✅ 添加新文章
- ✅ 编辑文章
- ✅ 删除文章
- ✅ 分页、搜索、表格美化

---

## 🎨 样式说明

> CSS 和样式是本项目的相对难点，但借助 Ant Design 组件库，大部分界面已高度封装，只需关注局部细节美化。

- 使用 TailwindCSS 辅助美化 Modal 内容区域
- 保持简洁、整洁的 UI 风格，方便使用和扩展

---

## 📌 提示

如果你在使用过程中遇到以下问题：

- React 报错版本警告 → 可忽略 `18.2.0` 提示

---

## 📁 推荐文件结构（简化）

```
├── app/
│   └── api/
│       └── posts/
│           └── [id]/route.ts   # GET/PUT/DELETE
│           └── route.ts        # POST
├── components/
│   └── PostsTable.tsx          # 表格 + 编辑逻辑
├── lib/
│   └── mongodb.ts              # 数据库连接封装
├── .env.local
├── page.tsx
└── ...
```

## ❤️ 致谢

感谢以下资源助我快速实现该项目：

- 🎨 [Ant Design](https://ant.design/) — 出色的 UI 组件库
- 🤖 [ChatGPT] — 提供逻辑、调试与样式帮助
- 🎥 B 站 UP 主「**就业发动机**」的初级 NextJS 教学视频

以上内容均由 GPT 生成 哈哈哈哈哈哈哈哈
