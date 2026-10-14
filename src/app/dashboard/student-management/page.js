'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag, Space, Card, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PrinterOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

const StudentManagementPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();
  const router = useRouter();

  // Fetch all students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/student');
      setStudents(response.data.data);
    } catch (error) {
      message.error('Failed to fetch students');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.firstName.toLowerCase().includes(searchText) ||
      student.lastName.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.mobile.includes(searchText)
    );
  });

  // Edit student
  const handleEdit = (student) => {
    setEditingStudent(student);
    form.setFieldsValue({
      ...student,
      // Format topics if needed
      topics: student.topics.split(', '),
    });
    setIsModalVisible(true);
  };

  // Update student
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedStudent = {
        ...values,
        topics: Array.isArray(values.topics) ? values.topics.join(', ') : values.topics,
        mobile: values.mobile.startsWith('+977') ? values.mobile : `+977${values.mobile}`,
      };

      await axios.put(`/api/student/${editingStudent._id}`, updatedStudent);
      message.success('Student updated successfully');
      setIsModalVisible(false);
      fetchStudents();
    } catch (error) {
      message.error('Failed to update student');
      console.error('Update error:', error);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this student?',
      content: 'This action cannot be undone',
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`/api/student/${id}`);
          message.success('Student deleted successfully');
          fetchStudents();
        } catch (error) {
          message.error('Failed to delete student');
          console.error('Delete error:', error);
        }
      },
    });
  };

  // Print student report
  const handlePrint = (id) => {
    window.open(`/api/student/${id}/report`, '_blank');
  };

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Office',
      dataIndex: 'office',
      key: 'office',
      filters: [
        { text: 'Kathmandu', value: 'Kathmandu' },
        { text: 'Pokhara', value: 'Pokhara' },
      ],
      onFilter: (value, record) => record.office === value,
    },
    {
      title: 'Destinations',
      dataIndex: 'destinations',
      key: 'destinations',
      render: (destinations) => (
        <Tag color={destinations === 'Help me decide' ? 'gold' : 'blue'}>
          {destinations}
        </Tag>
      ),
    },
    {
      title: 'Consultation Topics',
      dataIndex: 'topics',
      key: 'topics',
      render: (topics) => (
        <div style={{ maxWidth: 200 }}>
          {topics.split(', ').map((topic, i) => (
            <Tag key={i}>{topic}</Tag>
          ))}
        </div>
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
            icon={<PrinterOutlined />} 
            onClick={() => handlePrint(record._id)}
            className="text-green-500"
          />
        </Space>
      ),
    },
  ];

  // Consultation topics for the edit form
  const consultationTopics = [
    { label: 'Course', value: 'Course' },
    { label: 'Visa', value: 'Visa' },
    { label: 'Language/English Test', value: 'Language Test' },
    { label: 'Financial Document', value: 'Financial Document' },
    { label: 'Border Updates', value: 'Border Updates' },
  ];

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} className="m-0">Student Management</Title>
          <Input.Search
            placeholder="Search students..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            style={{ width: 400 }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="_id"
          loading={loading}
          scroll={{ x: true }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} students`,
          }}
        />
      </Card>

      {/* Edit Student Modal */}
      <Modal
        title="Edit Student"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              { required: true, message: 'Please enter mobile' },
              {
                pattern: /^\+977\d{10}$/,
                message: 'Format: +977XXXXXXXXXX',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nearest Office"
            name="office"
            rules={[{ required: true, message: 'Please select office' }]}
          >
            <Select>
              <Option value="Kathmandu">Kathmandu</Option>
              <Option value="Pokhara">Pokhara</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Consultation Topics"
            name="topics"
            rules={[{ required: true, message: 'Please select topics' }]}
          >
            <Select mode="multiple">
              {consultationTopics.map((topic) => (
                <Option key={topic.value} value={topic.value}>
                  {topic.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Preferred Destination"
            name="destinations"
            rules={[{ required: true, message: 'Please select destination' }]}
          >
            <Select>
              <Option value="USA">USA</Option>
              <Option value="UK">UK</Option>
              <Option value="Australia">Australia</Option>
              <Option value="Canada">Canada</Option>
              <Option value="Germany">Germany</Option>
              <Option value="New Zealand">New Zealand</Option>
              <Option value="Other">Other</Option>
              <Option value="Help me decide">Help me decide</Option>
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label="SLC Percentage/CGPA"
              name="slc"
              rules={[{ required: true, message: 'Please enter SLC results' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="+2 Percentage/CGPA"
              name="plusTwo"
              rules={[{ required: true, message: 'Please enter +2 results' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Bachelor's Percentage/CGPA" name="bachelor">
              <Input />
            </Form.Item>
          </div>

          <Form.Item label="Health Issues" name="healthIssues">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item label="Additional Information" name="additionalInfo">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagementPage;