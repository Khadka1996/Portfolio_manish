'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Form, Input, message, Tag, Space, Card, Typography, Image, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import TestimonialForm from './testimonialsForm';

const { Title } = Typography;
const { Search } = Input;

const TestimonialManagementPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // Base URL for backend (adjust if needed for production)
  const backendUrl = 'http://localhost:5000';

  // Fetch all testimonials
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/testimonials');
      setTestimonials(response.data.data);
    } catch (error) {
      message.error('Failed to fetch testimonials');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchText) ||
      testimonial.country.toLowerCase().includes(searchText) ||
      testimonial.quote.toLowerCase().includes(searchText)
  );

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalVisible(true);
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this testimonial?',
      content: 'This action cannot be undone',
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`/api/testimonials/${id}`);
          message.success('Testimonial deleted successfully');
          fetchTestimonials();
        } catch (error) {
          message.error('Failed to delete testimonial');
          console.error('Delete error:', error);
        }
      },
    });
  };

  // Show testimonial details
  const handleShowInfo = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsInfoModalVisible(true);
  };

  // Table columns
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
      title: 'Quote',
      dataIndex: 'quote',
      key: 'quote',
      render: (text) => <span>{text.slice(0, 50)}...</span>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <Image
          src={`${backendUrl}${url}`}
          alt="Testimonial"
          width={50}
          fallback="/fallback-image.png"
          onError={(e) => {
            e.target.src = '/fallback-image.png';
            console.error(`Failed to load image: ${backendUrl}${url}`);
          }}
        />
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Featured',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (isFeatured) => (
        <Tag color={isFeatured ? 'green' : 'default'}>{isFeatured ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-blue-500"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            className="text-red-500"
          />
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleShowInfo(record)}
            className="text-green-500"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="m-0">
            Testimonial Management
          </Title>
          <div className="flex gap-4">
            <Search
              placeholder="Search testimonials..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              style={{ width: 400 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => {
                setEditingTestimonial(null);
                setIsModalVisible(true);
              }}
            >
              Add Testimonial
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTestimonials}
          rowKey="_id"
          loading={loading}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} testimonials`,
          }}
        />

        <TestimonialForm
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          editingTestimonial={editingTestimonial}
          form={form}
          onSuccess={() => {
            setIsModalVisible(false);
            fetchTestimonials();
          }}
        />

        {/* Info Modal */}
        <Modal
          title="Testimonial ID Card"
          visible={isInfoModalVisible}
          onCancel={() => setIsInfoModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsInfoModalVisible(false)}>
              Close
            </Button>,
          ]}
          width={400}
          bodyStyle={{ padding: 0 }}
        >
          {selectedTestimonial && (
            <Card
              bordered={false}
              style={{
                border: '2px solid #d9d9d9',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#1890ff',
                  color: '#fff',
                  padding: '12px',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Testimonial ID
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <Image
                    src={`${backendUrl}${selectedTestimonial.image}`}
                    alt="Testimonial"
                    width={120}
                    height={120}
                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                    fallback="/fallback-image.png"
                    onError={(e) => {
                      e.target.src = '/fallback-image.png';
                      console.error(`Failed to load image: ${backendUrl}${selectedTestimonial.image}`);
                    }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Name:</strong> {selectedTestimonial.name}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Country:</strong> {selectedTestimonial.country}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Rating:</strong> {selectedTestimonial.rating}/5
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Featured:</strong> {selectedTestimonial.isFeatured ? 'Yes' : 'No'}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Created At:</strong>{' '}
                  {new Date(selectedTestimonial.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>Quote:</strong>
                  <div
                    style={{
                      maxHeight: '100px',
                      overflowY: 'auto',
                      background: '#fafafa',
                      padding: '8px',
                      borderRadius: '4px',
                      marginTop: '4px',
                    }}
                  >
                    {selectedTestimonial.quote}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Modal>
      </Card>

      <style jsx>{`
        .ant-card-body {
          font-family: 'Arial', sans-serif;
        }
        .ant-card-body strong {
          color: #333;
          display: inline-block;
          width: 100px;
        }
      `}</style>
    </div>
  );
};

export default TestimonialManagementPage;