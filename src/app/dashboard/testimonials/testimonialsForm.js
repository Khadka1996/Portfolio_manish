'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Switch, Button, Upload, message, Modal, Image } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const TestimonialForm = ({ visible, onCancel, editingTestimonial, form, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Base URL for backend (adjust if needed for production)
  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    if (editingTestimonial) {
      form.setFieldsValue({
        name: editingTestimonial.name,
        country: editingTestimonial.country,
        quote: editingTestimonial.quote,
        rating: editingTestimonial.rating,
        isFeatured: editingTestimonial.isFeatured,
      });
      setPreviewUrl(editingTestimonial.image ? `${backendUrl}${editingTestimonial.image}` : null);
      setFile(null);
    } else {
      form.resetFields();
      setFile(null);
      setPreviewUrl(null);
    }
  }, [editingTestimonial, form, visible]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = new FormData();
      data.append('name', values.name);
      data.append('country', values.country);
      data.append('quote', values.quote);
      data.append('rating', values.rating);
      data.append('isFeatured', values.isFeatured);
      if (file) {
        data.append('image', file); // Use 'image' to match backend Multer
      } else if (editingTestimonial && !file) {
        data.append('image', editingTestimonial.image); // Retain existing image for updates
      } else {
        throw new Error('Image file is required');
      }

      // Log FormData for debugging
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      if (editingTestimonial) {
        await axios.put(`/api/testimonials/${editingTestimonial._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Testimonial updated successfully');
      } else {
        await axios.post('/api/testimonials', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Testimonial created successfully');
      }
      form.resetFields();
      setFile(null);
      setPreviewUrl(null);
      onSuccess();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save testimonial';
      message.error(errorMessage);
      console.error('Submit error:', error);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      if (!isImage) {
        message.error('Only JPEG, PNG, or WebP files are allowed!');
        return false;
      }
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      return false;
    },
    fileList: file ? [{ uid: '-1', name: file.name, status: 'done' }] : [],
    onRemove: () => {
      setFile(null);
      setPreviewUrl(null);
    },
  };

  return (
    <Modal
      title={editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={editingTestimonial ? 'Update' : 'Create'}
      cancelText="Cancel"
      width={600}
    >
      <Form form={form} layout="vertical" initialValues={{ rating: 5, isFeatured: false }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter name' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'Name should only contain letters and spaces' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: 'Please enter country' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Quote"
          name="quote"
          rules={[
            { required: true, message: 'Please enter quote' },
            { min: 20, message: 'Quote must be at least 20 characters' },
            { max: 500, message: 'Quote cannot exceed 500 characters' },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Upload Image"
          name="image"
          rules={[{ required: !editingTestimonial && !file, message: 'Please upload an image' }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
        {previewUrl && (
          <div style={{ marginBottom: 16, position: 'relative', width: 'fit-content' }}>
            <Image
              src={previewUrl}
              alt="Preview"
              width={100}
              fallback="/fallback-image.png"
              onError={(e) => {
                e.target.src = '/fallback-image.png';
                console.error(`Failed to load preview image: ${previewUrl}`);
              }}
            />
            <Button
              icon={<CloseOutlined />}
              size="small"
              style={{ position: 'absolute', top: -10, right: -10 }}
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
              }}
            />
          </div>
        )}
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please enter rating' }]}
        >
          <InputNumber min={1} max={5} />
        </Form.Item>
        <Form.Item name="isFeatured" label="Featured" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TestimonialForm;