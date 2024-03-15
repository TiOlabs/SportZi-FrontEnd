import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddPackage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleChange = (value: any) => {
    console.log(`Selected: ${value}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Button
        onClick={showModal}
        style={{
          backgroundColor: "#EFF4FA",
          color: "#0E458E",
          borderRadius: "3px",
          fontFamily: "kanit",
          borderColor: "#0E458E",
        }}
      >
        Add Package
      </Button>

      <Modal
        visible={isModalOpen}
        title="Add Package"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 1000 }}
        >
          <Form.Item
            label="Package name"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Conduct by"
            name="opentime"
            rules={[{ required: true }]}
          >
            {" "}
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Enter or select multiple names"
              onChange={handleChange}
              tokenSeparators={[" ", ","]}
            >
              {/* You can optionally provide initial options */}
              {/* <Option key="1">Option 1</Option>
          <Option key="2">Option 2</Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            label="Discription"
            name="Discription"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price per Month"
            name="price"
            rules={[{ type: "number", min: 0, max: 99, required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPackage;
