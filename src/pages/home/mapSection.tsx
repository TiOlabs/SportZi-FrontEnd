import { Col, Row, Skeleton } from "antd";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const center = { lat: 6.7969, lng: 79.9018 };

const MapSection = () => {
  const { lg } = useBreakpoint();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <Row style={{ backgroundColor: "#EFF4FA", marginTop: "2%" }}>
      <Col xs={24} md={10}>
        <h1
          style={{
            color: "#0E458E",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Arcades near you
        </h1>
        <p
          style={{
            fontSize: lg ? "24px" : "14px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "justify",
            padding: "2% 10% 2% 10%",
          }}
        >
          Discover the expertise of our diverse coaching lineup, each a
          specialist in their respective sports. From cricket to volleyball and
          beyond, our dedicated coaches bring a wealth of experience and passion
          to elevate your skills. With a focus on individual growth and team
          dynamics, our coaches are committed to nurturing talent, refining
          techniques, and fostering a love for the game. Step onto the field or
          court and embark on a journey of learning and mastery with our
          exceptional coaching staff.
        </p>
      </Col>
      <Col md={1}></Col>
      <Col xs={24} md={13} style={{ padding: "2%" }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            width: "100%",
            height: "50vh",
          }}
        >
          {" "}
          <Marker position={center} />
        </GoogleMap>
      </Col>
    </Row>
  );
};

export default MapSection;
