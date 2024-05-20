import { Col, Row, Skeleton } from "antd";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import React from "react";
import { Arcade } from "../../types";

const center: google.maps.LatLngLiteral = { lat: 6.7969, lng: 79.9018 };

const MapSection: React.FC = () => {
  const [locationData, setLocationData] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Arcade[] = await res.json();

        console.log(data);

        const parsedLocations = data.map((arcade) => {
          const location = JSON.parse(arcade.location);
          return { lat: location.lat, lng: location.lng };
        });

        setLocationData(parsedLocations);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const { lg } = useBreakpoint();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (isLoading || !isLoaded) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error fetching arcade details: {error.message}</div>;
  }

  console.log(locationData);

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
            fontSize: lg ? "18px" : "14px",
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
          <MarkerClusterer
            options={{
              imagePath:
                "https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m",
            }}
          >
            {(clusterer) => (
              <React.Fragment>
                {locationData.map((location, index) => (
                  <Marker
                    key={index}
                    position={location}
                    clusterer={clusterer}
                  />
                ))}
              </React.Fragment>
            )}
          </MarkerClusterer>
        </GoogleMap>
      </Col>
    </Row>
  );
};

export default MapSection;
