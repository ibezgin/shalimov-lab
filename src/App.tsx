import React, { useState } from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Comparison } from "./component/comparison";
import { ConvertTime } from "./component/convert-time";
import { PrettyImage } from "./component/pretty-image";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const routes = [
    {
      title: "Сравнение строк",
      path: "/comparision",
      component: <Comparison />,
    },
    {
      title: "Конвертация времени",
      path: "/convert-time",
      component: <ConvertTime />,
    },
    {
      title: "Верстка картинка",
      path: "/pretty-image",
      component: <PrettyImage />,
    },
  ];

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {routes.map((elem, index) => (
              <Menu.Item key={index} icon={<UserOutlined />}>
                <Link to={elem.path}>{elem.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => {
                  setCollapsed((value) => !value);
                },
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              {routes.map((elem, index) => (
                <Route exact path={elem.path}>
                  {elem.component}
                </Route>
              ))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
