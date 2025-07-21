import React from 'react';
import { Tabs } from 'antd';
import CardItem from "./CardItem"
const onChange = key => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Menu',
    children: <CardItem />,
  },
  {
    key: '2',
    label: 'Tables',
    children: 'xx',
  },
  {
    key: '3',
    label: 'Customers',
    children: 'Content of Tab Pane 3',
  },
];
const App = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default App;