import {
  Button,
  Col,
  Dropdown,
  Empty,
  MenuProps,
  Row,
  Space,
  Spin,
  message,
} from "antd";
import ArcadeCard from "../../components/ArcadeCardInArcadepage";
import { useEffect, useState } from "react";
import { Arcade } from "../../types";
import type { SearchProps } from "antd/es/input/Search";
import { DownOutlined, SortAscendingOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";

const ArcadeCardSection = () => {
  const [loading, setLoading] = useState(true);
  const [arcades, setArcades] = useState<Arcade[]>([]);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/getarcadeDetails");
      const data = await res.json();
      let sortedArcades = [...data];
      if (search !== "") {
        sortedArcades = sortedArcades.filter((arcade: Arcade) =>
          arcade.arcade_name.toLowerCase().includes(search.toLowerCase())
        );
      }
      setArcades(sortedArcades);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/getarcadeDetails");
      const data = await res.json();
      let sortedArcades = [...data];
      switch (e.key) {
        case "1":
          sortedArcades.sort((a: Arcade, b: Arcade) => {
            console.log("a", a.arcadefeedbacks);
            console.log("b", b.arcadefeedbacks);
            const rateA = Number(a.arcadefeedbacks[0].rate);
            const rateB = Number(b.arcadefeedbacks[0].rate);
            console.log("rateA", rateA);
            console.log("rateB", rateB);
            return rateB - rateA; // Sort in descending order of rate
          });
          break;
        case "2":
          sortedArcades.sort((a: Arcade, b: Arcade) => {
            const nameA = a.arcade_name.toLowerCase();
            const nameB = b.arcade_name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        // Add cases for other filters if needed
        default:
          break;
      }
      setArcades(sortedArcades);
    } catch (error) {
      console.error("Error fetching and sorting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    setSearch(value.trim());
  };

  const items: MenuProps["items"] = [
    {
      label: "Rate",
      key: "1",
      icon: <StarOutlined />, 
    },
    {
      label: "By Alperbertical order",
      key: "2",
      icon:<SortAscendingOutlined />,
    },
    {
      label: "Coach-3",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "Coach-4",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col style={{}} sm={0} xs={2} lg={3} md={3}></Col>
        <Col style={{}} md={10} xs={20} lg={10}>
          <div
            style={{
              width: "100%",
              marginTop: "-5%",
              height: "2.5 px",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            <Search
              placeholder="Search Arcade"
              allowClear
              onSearch={onSearch}
              size="large"
              enterButton
            />

            <Dropdown menu={menuProps}>
              <Button style={{ height: 40 }}>
                <Space>
                  Filter By
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Col>
        <Col style={{}} sm={0} xs={4}></Col>
      </Row>

      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "#EFF4FA",
          marginBottom: "5%",
          width: "100%",
          marginTop: "2%",
        }}
      >
        {loading ? ( // Display spin while loading
          <Spin size="default" />
        ) : (
          arcades.length > 0 ? (
            arcades.map((arcade: Arcade) => (
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3%",
                }}
                lg={8}
                xs={24}
                md={12}
                key={arcade.arcade_id.toString()}
              >
                <Spin spinning={loading}>
                  <ArcadeCard
                    fees={arcade.arcadefeedbacks[0].arcade_feedback_id}
                    arcade_name={arcade.arcade_name}
                    arcade_rate={arcade.arcadefeedbacks}
                    arcade_image={arcade.arcade_image}
                    arcade_description={arcade.distription}
                  />
                </Spin>
              </Col>
            ))
          ) : (
            <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
              <Empty description={"No search results found."} />
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default ArcadeCardSection;
