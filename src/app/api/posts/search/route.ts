import { COLLECTIONS, getCollection } from "@//lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * 搜索文章
 */
export async function POST(request: NextRequest) {
  const { search } = await request.json();
  if (!search || search.trim() === "") {
    return NextResponse.json({
      code: 400,
      message: "搜索内容不能为空",
    });
  }
  const dbObj = await getCollection(COLLECTIONS.POSTS);
  const result = await dbObj.find({ title: { $regex: search } }).toArray();
  return NextResponse.json({
    code: 200,
    data: result,
  });
}
