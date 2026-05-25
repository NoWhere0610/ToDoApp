import { TaskList } from "./Task";
import { Layout, Input, Space } from "antd";
import React, { useState } from "react";
import type { GetProps } from "antd";
import { AddModal } from "./AddModal";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarMenu } from "./Sidebar";
import { Label } from "./Label";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const { Header, Content} = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "left",
  backgroundColor: "#fff",
  marginBottom: 5,
  maxHeight: 100,
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "#ededed",
  minHeight: "70vh",
  marginBottom: 5,
  marginBlockStart: 5,
  display: "flex",
  justifyContent: "center",
};

const layoutStyle: React.CSSProperties = {
  backgroundColor: "#ededed",
  minHeight: "90vh",
};

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskAddedRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const InboxPage = () => <div className="p-6">Hộp thư đến</div>;
  const TodayPage = () => <TaskList key={refreshTrigger}></TaskList>;
  const UpcomingPage = () => <div className="p-6">Sắp tới</div>;
  const LabelsPage = () => <Label />;

  return (
    <BrowserRouter>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div className="flex justify-between">
            <div className="flex">
              <h1 className="text-blue-600 font-bold text-2xl mt-3">
                FocusTask
              </h1>
              <Space vertical style={{ marginLeft: 30 }}>
                <Search
                  placeholder="Tìm nhiệm vụ"
                  style={{ width: 200 }}
                ></Search>
              </Space>
            </div>
            <AddModal onTaskAdded={handleTaskAddedRefresh} />
          </div>
        </Header>
        <Layout style={layoutStyle}>
          <SidebarMenu />
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" element={<Navigate to="/today" replace />} />

              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/today" element={<TodayPage />} />
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/labels" element={<LabelsPage />} />

              <Route
                path="*"
                element={<div className="p-6">404 - Không tìm thấy trang</div>}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;