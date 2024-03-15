import { Col, Row, Skeleton } from "antd";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useCallback, useState } from "react";
import React from "react";

const center: google.maps.LatLngLiteral = { lat: 6.7969, lng: 79.9018 };

const MapSection: React.FC = () => {
  const { lg } = useBreakpoint();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const locations = [
    { lat: 6.79219078406429, lng: 79.89792530231765 },
    { lat: 6.790880397204962, lng: 79.89870850735 },
    { lat: 6.792116209298174, lng: 79.89963118725112 },
  ];
  const location = { lat: 6.790880397204962, lng: 79.89870850735 };

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
          <MarkerClusterer>
            {(clusterer) => (
              <>
                {locations.map((location, index) => (
                  <Marker
                    key={index}
                    position={location}
                    clusterer={clusterer}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>

          
        </GoogleMap>
      </Col>
    </Row>
  );
};

export default MapSection;
