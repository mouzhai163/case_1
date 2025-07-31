'use client'
import React, { useEffect, useState } from 'react'
import PostsTable, { PostsDataType } from './components/PostsTable'
import axios from 'axios'
import { Button, Input, message, Modal } from 'antd'


export default function Page() {
  // 表格所有数据
  const [data, setData] = useState<PostsDataType[]>([])
  // 搜索框
  const [search, setSearch] = useState<string>('')
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage();
  // 添加文章对象
  const [editingRecord, setEditingRecord] = useState<PostsDataType | null>(null);



  // modal
  const [open, setOpen] = useState(false);
  // 加载动画
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/posts').then(res => {
      if (res.data.code === 200) {
        setData(res.data.data)
      }
    })
  }, [])

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };
  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  // 搜索文章
  function handleSearch(): void {
    axios.post('/api/posts/search', { search }).then(res => {
      if (res.data.code === 200) {
        setData(res.data.data)
      } else {
        error(res.data.message)
      }
    })
  }

  // 重置搜索
  function handleReset(): void {
    setSearch('')
    axios.get('/api/posts').then(res => {
      if (res.data.code === 200) {
        setData(res.data.data)
      }
    })
  }

  // 删除文章
  function handleDelete(record: PostsDataType): void {
    axios.delete('/api/posts/' + record._id).then(res => {
      setData(data.filter(item => item._id !== record._id))
      success(res.data.message)
    }).catch(err => {
      error(err.response.data.message)
    })
  }

  // 编辑文章
  function handleEdit(record: PostsDataType): void {
    axios.put('/api/posts/' + record._id, record).then(res => {
      if (res.data.code === 200) {
        setData(data.map(item => item._id === record._id ? item = record : item))
        success(res.data.message)
      } else {
        error(res.data.message)
      }
    })
  }




  //添加文章的模态框
  function handleOk(): void {
    setConfirmLoading(true);
    // 卡壳500毫秒 显示加载动画 哈哈哈哈哈哈哈  给钱能优化
    setTimeout(() => {
      setConfirmLoading(false);
      axios.post("/api/posts", editingRecord).then(res => {
        if (res.data.code === 200) {
          setData([...data, res.data.data])
          setEditingRecord(null)
          success(res.data.message)
        } else {
          error(res.data.message)
        }
      }).catch(e => {
        error(e.message)
      })
      setOpen(false);
    }, 500);
  }


  function showModal(): void {
    setOpen(true)
  }
  function handleCancel(): void {
    setOpen(false);
  }

  return (
    <div>
      <div className="w-[1000px] mx-auto border-gray-300 border rounded-xl">
        <div className="flex justify-between p-5 border-b border-gray-300">
          <div className='flex gap-2'>
            <input type="text"
              className='border outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md px-2 py-1'
              placeholder='请输入文章标题'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {contextHolder}
            <Button onClick={handleSearch}>搜索</Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
          {/* 通过使用模态窗口来添加文章 */}
          <Button type='primary' onClick={showModal}>添加</Button>
          <Modal
            title="添加"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">标题*</label>
                <Input
                  className="!rounded-md !px-3 !py-2"
                  value={editingRecord?.title || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord!, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">内容*</label>
                <Input.TextArea
                  className="!rounded-md !px-3 !py-2"
                  rows={4}
                  value={editingRecord?.content || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord!, content: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">作者*</label>
                <Input
                  className="!rounded-md !px-3 !py-2"
                  value={editingRecord?.author || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord!, author: e.target.value })}
                />
              </div>
            </div>
          </Modal>
        </div>
        <PostsTable data={data} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </div>
  )
}
