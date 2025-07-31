declare global {
  // 让 TypeScript 知道 global.mongoClientPromise 是 Promise<MongoClient>
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

import { Collection, MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("请设置 MONGODB_URI 环境变量");

// 连接选项
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global.mongoClientPromise) {
    client = new MongoClient(uri, options);
    global.mongoClientPromise = client.connect();
  }
  clientPromise = global.mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// 获取集合
export async function getCollection(
  collectionName: string
): Promise<Collection<Document>> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  return db.collection(collectionName);
}

export const COLLECTIONS = {
  POSTS: "posts",
  // 还没用上的用户表和评论表
  // USERS: "users",
  // COMMENTS: "comments",
} as const;
