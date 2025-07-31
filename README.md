所使用的版本是 React 18.2.0,因为 antD 最高支持到 18,实际上 18.2.0 还是有报错,但是不影响使用
数据库使用的是 MongoDB
结构如下:
\_id: ObjectId;
title: string;
content: string;
author: string;
createdAt: Date;
updatedAt: Date;
数据库配置文件为:.env.local,需要新建一个 myapp 的数据库,然后创建一个 posts 的集合就可以开始正常的添加删除和修改了.
代码逻辑很简单,对于我来说难点是样式和 CSS,所幸大部分都是 antD 组件
感谢 antD,感谢 GPT,感谢 B 站 UP 主:就业发动机的初级视频让我入门.
