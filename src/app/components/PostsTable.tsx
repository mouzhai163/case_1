'use client';

import { Input, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import React, { useState } from 'react'


export interface PostsDataType {
  _id: ObjectId;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}


interface PostsTableProps {
  data: PostsDataType[];
  handleDelete: (record: PostsDataType) => void;
  handleEdit: (record: PostsDataType) => void;
}

export default function PostsTable(props: PostsTableProps) {
  const { data, handleDelete, handleEdit } = props;
  const [pageSize, setPageSize] = useState(10);
  // modal
  const [open, setOpen] = useState(false);
  // 加载动画
  const [confirmLoading, setConfirmLoading] = useState(false);
  // 存储当前编辑对象
  const [editingRecord, setEditingRecord] = useState<PostsDataType | null>(null);


  const showModal = () => {
    setOpen(true);
  };

  const columns: TableProps<PostsDataType>['columns'] = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <span>{dayjs(text).format('YYYY年MM月DD日 HH:mm:ss')}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => <span>{dayjs(text).format('YYYY年MM月DD日 HH:mm:ss')}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setEditingRecord(record)
            showModal()
          }}>编辑</a>

          {/* 删除按钮 */}
          <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function handleOk(): void {
    setConfirmLoading(true);
    // 卡壳500毫秒 显示加载动画 哈哈哈哈哈哈哈  给钱能优化
    setTimeout(() => {
      setConfirmLoading(false);
      handleEdit(editingRecord!)
      setOpen(false);
    }, 500);
  }

  function handleCancel(): void {
    setOpen(false);
  }

  return (
    <div>
      <Modal
        title="编辑"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">标题</label>
            <Input
              className="!rounded-md !px-3 !py-2"
              value={editingRecord?.title || ''}
              onChange={(e) => setEditingRecord({ ...editingRecord!, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">内容</label>
            <Input.TextArea
              className="!rounded-md !px-3 !py-2"
              rows={4}
              value={editingRecord?.content || ''}
              onChange={(e) => setEditingRecord({ ...editingRecord!, content: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">作者</label>
            <Input
              className="!rounded-md !px-3 !py-2"
              value={editingRecord?.author || ''}
              onChange={(e) => setEditingRecord({ ...editingRecord!, author: e.target.value })}
            />
          </div>
        </div>
      </Modal>
      <Table<PostsDataType>
        columns={columns}
        dataSource={data}
        rowKey="_id"
        bordered={true}
        pagination={{
          position: ['bottomRight'],
          current: 1,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          onChange: (pageSize) => {
            setPageSize(pageSize);
          }
        }}
      />
    </div>
  )
}
