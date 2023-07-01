import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs, deleteAConfig, resetState } from "../features/config/configSlice";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color?.localeCompare(b.color),
  },
  {
    title: "Ram",
    dataIndex: "ram",
    sorter: (a, b) => a.ram?.localeCompare(b.ram),
  },
  {
    title: "Rom",
    dataIndex: "rom",
    sorter: (a, b) => a.rom?.localeCompare(b.rom),
  },
  {
    title: "Extra Charge",
    dataIndex: "extraCharge",
    sorter: (a, b) => a.extraCharge - b.extraCharge,
  },
  {
    title: "Product",
    dataIndex: "productName",
    sorter: (a, b) => a.productName - b.productName,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Configlist = () => {
  const [open, setOpen] = useState(false);
  const [configId, setconfigId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setconfigId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
    dispatch(getConfigs());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const configState = useSelector((state) => state.pconfig.configs);
  console.log(configState)
  const data = [];
  if (configState.configs && configState.configs.length)
    for (let i = 0; i < configState.configs.length; ++i) {
      data.push({
        key: configState.configs[i]['config_id'],
        color: configState.configs[i]['color'],
        ram: configState.configs[i]['ram'],
        rom: configState.configs[i]['rom'],
        extraCharge: configState.configs[i]['extra_charge'],
        productName: productState.products?.find(product => product.product_id === configState.configs[i]['product_id'])?.product_name,
        quantity: configState.configs[i]['quantity'],
        image: <img src={configState.configs[i]['image']} alt={`Image for ${configState.configs[i]['config_id']}`} width={100} />,
        action: (
          <>
            <Link
              to={`/admin/category/${configState.configs[i]['config_id']}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(configState.configs[i]['config_id'])}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      })
    }

  

  return (
    <div>
      <h3 className="mb-4 title">Config</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          dispatch(deleteAConfig(configId));
        }}
        title="Are you sure you want to delete this config?"
      />
    </div>
  );
}

export default Configlist;
