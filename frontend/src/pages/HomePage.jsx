import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Modal, Table, Button, Select, DatePicker } from "antd";
import { Form, Input } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import Analytics from "../components/Layout/Analytics";
const { RangePicker } = DatePicker;

axios.defaults.baseURL = "http://localhost:3000";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [frequency, setFrequency] = useState("7"); // Default to last 1 week
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setviewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="action-icons-container">
      <EditOutlined
        onClick={() => {
          setEditable(record);
          setShowModal(true);
        }}
      />
      <DeleteOutlined className="mx-2" onClick={() => handleDelete(record)} />
    </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.post("/api/t1/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransaction(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(
          "Error fetching transactions:",
          err.message || "Unknown error"
        );
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try{
      await axios.post("/api/t1/delete-transaction", {
        transactionId:record._id
      })
      alert("Transaction Deleted");
    }
    catch(err){

    }
  }

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (editable) {
        await axios.post("/api/t1/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId:editable._id
        });
      }
      else{
        await axios.post("/api/t1/add-transaction", {
          ...values,
          userid:user._id
        })
      }
      alert("New Transaction Added!")
      setShowModal(false);
      setEditable(null);
      setEditingTransaction(null);

    } catch (err) {
      console.error("Error saving transaction", err);
    }
  };

  return (
    <Layout>
      <div className="filter">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setSelectedDate(values);
              }}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setSelectedDate(values);
              }}
            />
          )}
        </div>
        <div className="icon-container">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("analytics")}
          />
        </div>
        <button
          className="p-2 bg-success rounded-4"
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
      </div>

      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditingTransaction(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={
            editable || {
              amount: "",
              type: "",
              category: "",
              date: "",
              reference: "",
              desc: "",
            }
          }
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="tax">House Tax</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="electric-bill">
                Electricity Bill
              </Select.Option>
              <Select.Option value="clothes">Clothes</Select.Option>
              <Select.Option value="medicine">Medicines</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <Input type="text" />
          </Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
