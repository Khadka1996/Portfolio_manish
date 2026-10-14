'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Tag, Space, Card, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const API_URL = 'http://localhost:5000/api/testimonials';

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setTestimonials(data.data);
    } catch (error) {
      message.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.name.toLowerCase().includes(searchText) ||
    testimonial.country.toLowerCase().includes(searchText) ||
    testimonial.university.toLowerCase().includes(searchText)
  );

  const showModal = (testimonial = null) => {
    if (testimonial) {
      form.setFieldsValue(testimonial);
      setEditingId(testimonial._id);
      if (testimonial.image) {
        setFileList([{
          uid: '-1',
          name: 'current-image',
          status: 'done',
          url: testimonial.image,
        }]);
      }
    } else {
      form.resetFields();
      setEditingId(null);
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append all fields except image
      Object.keys(values).forEach(key => {
        if (key !== 'image') formData.append(key, values[key]);
      });

      // Append image if uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Testimonial updated successfully');
      } else {
        await axios.post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        message.success('Testimonial created successfully');
      }

      setIsModalVisible(false);
      fetchTestimonials();
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      message.error('Failed to delete testimonial');
    }
  };

  const uploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      if (!isImage) {
        message.error('You can only upload JPG/PNG/WEBP files!');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    maxCount: 1
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: 'University',
      dataIndex: 'university',
      key: 'university',
    },
    {
      title: 'Quote',
      dataIndex: 'quote',
      key: 'quote',
      render: (text) => <Text ellipsis={{ tooltip: text }}>{text.substring(0, 50)}...</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Card
        title={
          <div className="flex justify-between items-center">
            <Title level={4} className="mb-0">Testimonials Management</Title>
            <Input.Search
              placeholder="Search testimonials..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 300 }}
              onChange={handleSearch}
            />
          </div>
        }
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Add Testimonial
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredTestimonials}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Testimonial' : 'Add Testimonial'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'Please input country!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="university"
            label="University"
            rules={[{ required: true, message: 'Please input university!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="quote"
            label="Quote"
            rules={[
              { required: true, message: 'Please input quote!' },
              { min: 20, message: 'Minimum 20 characters' },
              { max: 500, message: 'Maximum 500 characters' }
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Image"
            extra="Max file size: 5MB (JPEG, PNG, WebP)"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestimonialManagement;