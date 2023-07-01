import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSalesByItem, resetState} from "../features/sale/saleSlice";
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
    title: "Total Sold",
    dataIndex: "totalsold",
  },
 
];

const ItemSold = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // useEffect(() => {
  //   if (selectedMonth && selectedYear) {
  //     dispatch(getSalesByItem({ month: selectedMonth, year: selectedYear }));
  //   }
  // }, [selectedMonth, selectedYear]);
  useEffect(() => {
    dispatch(resetState());
  }, []);

  const salesByItem = useSelector((state) => state.sales.salesByItem);
  console.log(salesByItem);
  const data1 =[]
  if (salesByItem.items && salesByItem.items.length) {
    for (let i = 0; i < salesByItem.items.length; i++) {
      data1.push({
        key: i + 1,
        name: salesByItem.items[i].product_name,
        color: salesByItem.items[i].color,
        ram: salesByItem.items[i].ram,
        rom: salesByItem.items[i].rom,
        totalsold: salesByItem.items[i].total_items_sold,
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
        getSalesByItem({ month: selectedMonth, year: selectedYear })
      );
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Total Items Sold</h3>
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

export default ItemSold;