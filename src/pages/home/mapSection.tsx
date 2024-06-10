import { Col, Row, Skeleton, AutoComplete, Input } from "antd";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { Arcade } from "../../types";

const center: google.maps.LatLngLiteral = { lat: 6.7969, lng: 79.9018 };

const MapSection: React.FC = () => {
  const [locationData, setLocationData] = useState<
    { lat: number; lng: number; name: string }[]
  >([]);
  const [filteredArcades, setFilteredArcades] = useState<
    { lat: number; lng: number; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}api/getarcadeDetails`
        );
        const data = await res.json(); // Convert response to JSON
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format");
        }
        const parsedLocations = data.map((arcade: any) => {
          // Add type annotation for arcade
          const location = JSON.parse(arcade.location);
          return {
            lat: location.lat as number,
            lng: location.lng as number,
            name: arcade.arcade_name as string,
          };
        });

        setLocationData(parsedLocations);
        setFilteredArcades(parsedLocations); // Initialize filteredArcades
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

  const handleSearch = (value: string) => {
    const filtered = locationData.filter((arcade) =>
      arcade.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArcades(filtered);

    if (filtered.length > 0 && mapRef.current) {
      const firstArcade = filtered[0];
      mapRef.current.panTo({ lat: firstArcade.lat, lng: firstArcade.lng });
      mapRef.current.setZoom(18);
    }
  };

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (isLoading || !isLoaded) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error fetching arcade details: {error.message}</div>;
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
        <AutoComplete
          style={{ padding: "0 10%", width: "100%" }}
          options={locationData.map((arcade) => ({
            value: arcade.name,
          }))}
          onSelect={handleSearch}
          onSearch={handleSearch}
        >
          <Input.Search placeholder="Search arcade by name" enterButton />
        </AutoComplete>
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
          onLoad={(map) => {
            mapRef.current = map;
            return;
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
                    position={{ lat: location.lat, lng: location.lng }}
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
