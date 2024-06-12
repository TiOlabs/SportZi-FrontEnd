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
import {
  DownOutlined,
  SortAscendingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";

const ArcadeCardSection = () => {
  const [loading, setLoading] = useState(true);
  const [arcades, setArcades] = useState<Arcade[]>([]);
  const [search, setSearch] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching user location:", error);
      }
    );
  }, []);
  console.log(userLocation);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
      );
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

  const haversineDistance = (
    coords1: { lat: number; lng: number },
    coords2: { lat: number; lng: number }
  ) => {
    console.log("hey");
    console.log(coords1, coords2);
    const toRad = (x: number) => (x * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLng = toRad(coords2.lng - coords1.lng);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
      );
      const data = await res.json();
      let sortedArcades = [...data];
      switch (e.key) {
        case "1":
          sortedArcades.sort((a: Arcade, b: Arcade) => {
            const rateA = Number(a.arcadefeedbacks[0]?.rate || 0);
            const rateB = Number(b.arcadefeedbacks[0]?.rate || 0);
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
        case "3":
          console.log("Near Me");
          console.log(userLocation);
          if (userLocation) {
            sortedArcades = sortedArcades.filter((arcade: Arcade) => {
              console.log(arcade.location);
              if (!arcade.location) return false;
              const arcadeLocation = JSON.parse(arcade.location as string);
              console.log("arcadeLocation");
              console.log(arcadeLocation);
              const distance = haversineDistance(userLocation, arcadeLocation);
              console.log(distance);
              return distance <= 10;
            });
          } else {
            console.log("Unable to determine user location");
            message.error("Unable to determine user location");
          }
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
      label: "By Alphabetical Order",
      key: "2",
      icon: <SortAscendingOutlined />,
    },
    {
      label: "Near Me",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
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
        {loading ? (
          <Spin size="default" />
        ) : arcades.length > 0 ? (
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
                <div
                  style={{
                    marginTop: "0vh",
                    marginRight: "10vh",
                    marginBottom: "20vh",
                  }}
                >
                  <ArcadeCard
                    fees={arcade.arcadefeedbacks[0]?.arcade_feedback_id}
                    arcade_name={arcade.arcade_name}
                    arcade_rate={arcade.averageRate}
                    arcade_image={arcade.arcade_image}
                    arcade_description={arcade.distription}
                    arcade_id={arcade.arcade_id}
                  />
                </div>
              </Spin>
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
            <Empty description={"No search results found."} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default ArcadeCardSection;
