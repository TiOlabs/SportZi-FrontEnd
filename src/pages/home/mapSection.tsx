import { Col, Row, Skeleton } from "antd";
import { useJsApiLoader, GoogleMap, Marker,} from "@react-google-maps/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import{APIProvider, AdvancedMarker, InfoWindow, Map, Pin} from "@vis.gl/react-google-maps";
import { useState } from "react";
const center = { lat: 6.7969, lng: 79.9018 };
const katubedda ={lat: 	6.801457, lng: 79.899679};
const piliyandala ={lat: 6.801803, lng: 79.922684};
const MapSection = () => {
  const { lg } = useBreakpoint();
const [open, setOpen] = useState(false);
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
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY|| ""}>
        <div style={{ height: "50vh", width: "100%" }}>
        <Map
          center={center}
          zoom={15}
          mapId={process.env.REACT_APP_MAP_ID || ""}
        >
          {" "}
          {/* <Marker position={center} /> */}
          <AdvancedMarker position={center}></AdvancedMarker>
          <AdvancedMarker position={katubedda} onClick={()=>setOpen(true)}>
            <Pin background={"grey"} borderColor={"yellow"} glyphColor={"purple"}></Pin>
          </AdvancedMarker>
          <AdvancedMarker position={piliyandala}></AdvancedMarker>
         
         {open && <InfoWindow position={katubedda} onCloseClick={()=>setOpen(false)}><p>Im in Katubedda</p></InfoWindow>}
        </Map>
        </div>
        </APIProvider>
      </Col>
    </Row>
  );
};

export default MapSection;
