import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSalesByConfig, resetState} from "../features/sale/saleSlice";

const { Option } = Select;
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name ? a.name.localeCompare(b.name || '') : '',
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Ram",
    dataIndex: "ram",
  },
  {
    title: "Rom",
    dataIndex: "rom",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
  },
];

const RevenueConfig = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // useEffect(() => {
  //   if (selectedMonth && selectedYear) {
  //     dispatch(getSalesByConfig({ month: selectedMonth, year: selectedYear }));
  //   }
  // }, [selectedMonth, selectedYear]);
  useEffect(() => {
    dispatch(resetState());
  }, []);

  const salesByConfig = useSelector((state) => state.sales.salesByConfig);
  console.log(salesByConfig);
  const data1 =[]
  if (salesByConfig.revenues && salesByConfig.revenues.length) {
    for (let i = 0; i < salesByConfig.revenues.length; i++) {
      data1.push({
        key: i + 1,
        name: salesByConfig.revenues[i].product_name,
        color: salesByConfig.revenues[i].color,
        ram: salesByConfig.revenues[i].ram,
        rom: salesByConfig.revenues[i].rom,
        revenue: salesByConfig.revenues[i].revenue,
      });
    }
  }
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };
  const handleFilterClick = () => {
    console.log(selectedMonth, selectedYear);
    if (selectedMonth && selectedYear) {
      dispatch(
        getSalesByConfig({ month: selectedMonth, year: selectedYear })
      );
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Revenue By Config</h3>
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
          {/* Add more options for each month */}
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

export default RevenueConfig;