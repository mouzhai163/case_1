import { COLLECTIONS, getCollection } from "@//lib/mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
});

/**
 * 插入文章
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = PostSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        code: 400,
        message: "字段校验失败!",
        errors: result.error,
      });
    }

    const tempData = new Date();
    const data = { ...body, createdAt: tempData, updatedAt: tempData };

    const dbObj = await getCollection(COLLECTIONS.POSTS);
    await dbObj.insertOne(data);
    return NextResponse.json({
      code: 200,
      message: "插入成功!",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器内部错误",
      error,
    });
  }
}

/**
 * 查询文章
 */
export async function GET(request: Request) {
  try {
    const dbObj = await getCollection(COLLECTIONS.POSTS);
    const data = await dbObj.find({}).toArray();
    return NextResponse.json({
      code: 200,
      message: "查询成功!",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器内部错误",
      error,
    });
  }
}
