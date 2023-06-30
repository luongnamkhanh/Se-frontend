import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSalesByCustomer } from "../features/sale/saleSlice";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
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
    if (selectedMonth && selectedYear) {
      dispatch(getSalesByCustomer({ month: selectedMonth, year: selectedYear }));
    }
  }, [selectedMonth, selectedYear]);

  const salesByCustomer = useSelector((state) => state.sales);
  console.log(salesByCustomer);
  const data1 = salesByCustomer.revenues.map((customer, index) => ({
    key: index + 1,
    name: customer.full_name,
    revenue: customer.revenue,
  }));

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleFilterClick = () => {
    if (selectedMonth && selectedYear) {
      dispatch(
        getSalesByCustomer({ month: selectedMonth, year: selectedYear })
      );
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div className="filters">
        <Select
          className="month-select"
          placeholder="Select Month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <Option value="1">January</Option>
          <Option value="2">February</Option>
          {/* Add more options for each month */}
        </Select>
        <Select
          className="year-select"
          placeholder="Select Year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <Option value="2022">2022</Option>
          <Option value="2023">2023</Option>
          {/* Add more options for each year */}
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
