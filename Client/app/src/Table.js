import React, { useState, useEffect } from "react";
import { Button, Popconfirm, message, Modal, Form, Input,Row,Col,Table } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ApiService from "./api/apis";
import CustomModal from "./Custom/CustomModal";
import { url } from "./Custom/api.url";

function TableData() {
    const navigate = useNavigate();
    const apiservice = new ApiService()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
  const [tableItems, setTableItems] = useState([]);

const handleUpdateClick = (record) => {
  setSelectedRecord(record);
  setIsModalVisible(true);
};
const handleCancel = () => {
  setSelectedRecord(null);
  setIsModalVisible(false);
};
const handleUpdate = async (values) => {
  try {
    await axios.put(`${url}/update-data/${selectedRecord._id}`, values,
    {headers: {
      'authorization': 'your_access_token',
    },}
    );
    setIsModalVisible(false);
    fetchData();
    message.success("Data updated successfully!");
  } catch (error) {
    console.error("Error updating data:", error);
    message.error("Failed to update data.");
  }
};

  const columns = [
    {
      title: "FirstName",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "LastName",
      dataIndex: "LastName",
      key: "LastName",
    },
    {
      title: "EmailAdress",
      dataIndex: "EmailAdress",
      key: "EmailAdress",
    },
    {
      title: "PhoneNumber",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "Adress",
      dataIndex: "Adress",
      key: "Adress",
    },
    {
      title: "PinCode",
      dataIndex: "PinCode",
      key: "PinCode",
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country",
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City",
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleUpdateClick(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this entry?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
     
      const response = await axios.get(`${url}/get-data`);
      setTableItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/delete-data/${id}`,
      {
        headers:{
          'authorization': 'your_access_token',
        }
      }
      );
      fetchData();
      message.success("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
      message.error("Failed to delete data.");
    }
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
      <Col span={24}><Button onClick={()=>{
        navigate("/")
      }}>LogOut</Button></Col>
        <Col>
          <h1>Table Data </h1>
        </Col>
        <Col>
          <button onClick={()=> navigate("/form")}> GO to Form </button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={tableItems} />
      {selectedRecord && (
        <CustomModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
          record={selectedRecord}
        />
      )}
    </div>
  );
}

export default TableData;
