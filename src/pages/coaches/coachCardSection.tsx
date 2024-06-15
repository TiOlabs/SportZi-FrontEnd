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
import CoachCardCoachPage from "../../components/CoachCardCoachPage";
import { useEffect, useState } from "react";
import { Coach } from "../../types";
import axios from "axios";
import Search from "antd/es/input/Search";
import {
  DownOutlined,
  SortAscendingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
import { useUser } from "../../context/userContext";

const CoachCardSection = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const { userDetails } = useUser();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getcoach`
      );
      const data = await res.data;
      let sortedArcades = [...data];

      if (search !== "") {
        sortedArcades = sortedArcades.filter(
          (coach: Coach) =>
            coach.user.firstname.toLowerCase().includes(search.toLowerCase()) ||
            coach.user.lastname.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Filter the data to include only items with status "active"
      const successCoaches = sortedArcades.filter(
        (coach: { status: string }) => coach.status === "active"
      );

      // Set the filtered data to state
      setCoaches(successCoaches);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/getcoach`);
      const data = await res.json();
      let sortedArcades = [...data];
      switch (e.key) {
        case "1":
          sortedArcades.sort((a: Coach, b: Coach) => {
            const rateA = Number(a.averageRate || 0);
            const rateB = Number(b.averageRate || 0);
            return rateB - rateA; // Sort in descending order of rate
          });
          break;
        case "2":
          sortedArcades.sort((a: Coach, b: Coach) => {
            const nameA = a.user.firstname.toLowerCase();
            const nameB = b.user.firstname.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        case "3":
          sortedArcades.sort((a: Coach, b: Coach) => {
            const rateA = Number(a.rate || 0);
            const rateB = Number(b.rate || 0);
            return rateA - rateB; // Sort in ascending order of rate
          });
          break;

        // Add cases for other filters if needed
        default:
          break;
      }
      setCoaches(sortedArcades);
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
      label: "Hourly rate",
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
              placeholder="Search Coaches"
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

          overflowY: "scroll",
        }}
      >
        {loading ? (
          <Spin />
        ) : coaches.length === 0 ? (
          <Empty description={"No Coaches Availiable"} />
        ) : (
          coaches.map((coach: Coach) => (
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2%",
              }}
              lg={8}
              xs={24}
              md={12}
            >
              <div
                style={{
                  marginTop: "0vh",
                  marginRight: "10vh",
                  marginBottom: "0vh",
                }}
              >
                <CoachCardCoachPage
                  coach_id={coach.coach_id}
                  coach_image={coach.user.user_image}
                  coach_name={`${coach.user.firstname} ${coach.user.lastname}`}
                  coach_sport={coach.sport.sport_name}
                  coach_avgRate={coach.averageRate}
                  coach_short_description={coach.short_desctiption}
                  coach_rate={coach.rate}
                  sport={coach.sport.sport_name}
                  role={userDetails?.role}
                />
              </div>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default CoachCardSection;
