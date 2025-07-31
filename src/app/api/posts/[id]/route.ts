import { COLLECTIONS, getCollection } from "@//lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const dbObj = await getCollection(COLLECTIONS.POSTS);
    await dbObj.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({
      code: 200,
      message: "删除成功",
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "服务器内部错误",
      error,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const { title, content, author, _id } = await request.json();
    console.log(title, content, author, _id);
    console.log(typeof _id);
    const dbObj = await getCollection(COLLECTIONS.POSTS);
    /**
     * 更新_id = Obj._id的字段 这个相当于是条件
     * $set: Obj 将传递过来的对象,全部进行更新
     */
    await dbObj.updateOne(
      { _id: new ObjectId(String(_id)) },
      { $set: { title, content, author, updatedAt: new Date() } }
    );

    return NextResponse.json({
      code: 200,
      message: "修改成功",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      code: 500,
      message: "服务器内部错误",
      error,
    });
  }
}
