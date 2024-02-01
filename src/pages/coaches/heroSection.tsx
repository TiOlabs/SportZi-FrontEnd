import { Col, Row, Select, Input } from "antd";
import CoachHeropic01 from "../../assents/CoachHeropic01.png";
import Search from "antd/es/input/Search";
import type { SearchProps } from "antd/es/input/Search";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
</style>;

const { Option } = Select;

const HeroSection = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div style={{ margin: "2%" }}>
      <Row justify="center" align="middle">
        <Col xs={24}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#0E458E",
              fontFamily: "Kanit, sans-serif",
              fontSize: 36,
              fontWeight: 200,
              lineHeight: 1.1,
            }}
          >
            Discover Your Perfect Coach for Sporting Excellence
          </h1>
        </Col>
      </Row>

      <Row>
        <Col
          md={16}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            lineHeight: 1.2,
          }}
        >
          <Col
            sm={16}
            xs={24}
            
          >
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontFamily: "Kanit, sans-serif",
              fontSize: 18,
            }}>
            Explore our expert coaches across various sports, each dedicated to
            enhancing your skills. Customize your search to meet your goals,
            ensuring a rewarding coaching experience that drives you towards
            success.
            </div>
          </Col>
          <Col></Col>
        </Col>

        <Col sm={0} xs={6}></Col>
        <Col md={8} xs={12} lg={6}>
          <div style={{width:"100%"}}>
          <img
            src={CoachHeropic01}
            alt="coachpic"
            style={{ height: "auto", width: "100%", marginTop: "5%" }}
          /></div>
        </Col>
        <Col sm={0} xs={6}></Col>
      </Row>

      <Row>
        <Col sm={0} xs={2} lg={3} md={3}></Col>
        <Col
          md={10}
          xs={20}
          lg={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ width: "100%", marginTop: "2%",height:"100%" }}>
           
            <Search
              placeholder="Search Coaches"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </Col>
        <Col sm={0} xs={4}></Col>
      </Row>
    </div>
  );
};

export default HeroSection;

// import React from 'react';
// import { AudioOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// import type { SearchProps } from 'antd/es/input/Search';

// const { Search } = Input;

// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1677ff',
//     }}
//   />
// );

// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

// const App: React.FC = () => (
//   <Space direction="vertical">
//     <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
//     <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
//     <Search
//       addonBefore="https://"
//       placeholder="input search text"
//       allowClear
//       onSearch={onSearch}
//       style={{ width: 304 }}
//     />
//     <Search placeholder="input search text" onSearch={onSearch} enterButton />
//     <Search
//       placeholder="input search text"
//       allowClear
//       enterButton="Search"
//       size="large"
//       onSearch={onSearch}
//     />
//     <Search
//       placeholder="input search text"
//       enterButton="Search"
//       size="large"
//       suffix={suffix}
//       onSearch={onSearch}
//     />
//   </Space>
// );

// export default App;
