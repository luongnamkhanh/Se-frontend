import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSalesByCustomer, resetState } from "../features/sale/saleSlice";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
  },
];

const RevenueCus = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    dispatch(resetState());
  }, []);

  const salesByCustomer = useSelector((state) => state.sales.salesByCustomer);
  const data1 = salesByCustomer.revenues?.map((customer, index) => ({
    key: index + 1,
    name: customer.full_name,
    revenue: customer.revenue,
  })) || [];

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleFilterClick = () => {
    if (selectedMonth && selectedYear) {
      dispatch(getSalesByCustomer({ month: selectedMonth, year: selectedYear }));
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Revenue By Customers</h3>
      <div className="filters">
        <Select
          className="month-select"
          placeholder="Select Month"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: "100px" }}
        >
          <Option value="1">January</Option>
          <Option value="2">February</Option>
          <Option value="3">March</Option>
          <Option value="4">April</Option>
          <Option value="5">May</Option>
          <Option value="6">June</Option>
          <Option value="7">July</Option>
          <Option value="8">August</Option>
          <Option value="9">September</Option>
          <Option value="10">October</Option>
          <Option value="11">November</Option>
          <Option value="12">December</Option>
        </Select>
        <Select
          className="year-select"
          placeholder="Select Year"
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: "100px" }}
        >
          <Option value="2022">2022</Option>
          <Option value="2023">2023</Option>
          <Option value="2024">2024</Option>
          <Option value="2025">2025</Option>
        </Select>
        <Button type="primary" onClick={handleFilterClick}>
          Filter
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default RevenueCus;
