import { Col, Row, Skeleton, AutoComplete, Input } from "antd";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  MarkerClusterer,
  DirectionsRenderer,
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
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [startLocation, setStartLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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
        const parsedLocations = data.reduce((acc, arcade) => {
          try {
            const location = JSON.parse(arcade.location);
            if (
              typeof location.lat === "number" &&
              typeof location.lng === "number" &&
              typeof arcade.arcade_name === "string"
            ) {
              acc.push({
                lat: location.lat,
                lng: location.lng,
                name: arcade.arcade_name,
              });
            } else {
              console.warn("Invalid arcade location data", arcade);
            }
          } catch (e) {
            console.error("Error parsing location for arcade", arcade, e);
          }
          return acc;
        }, [] as { lat: number; lng: number; name: string }[]);

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

      // Get the current location (you might want to implement a more robust solution for getting the user's location)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const startLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setStartLocation(startLoc);
          setUserLocation(startLoc);
          setDirections(null); // Clear existing directions before fetching new ones
          fetchDirections(startLoc, {
            lat: firstArcade.lat,
            lng: firstArcade.lng,
          });
        });
      }
    }
  };

  const fetchDirections = (
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ) => {
    if (!isLoaded || !google.maps) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
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
          dropdownRender={(menu) => (
            <div style={{ maxHeight: "150px", overflowY: "auto" }}>{menu}</div>
          )}
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
                    label={{
                      text: "ccc",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </React.Fragment>
            )}
          </MarkerClusterer>
          {userLocation && (
            <Marker
              position={userLocation}
              label={{
                text: "My Location",
                color: "black",
                fontWeight: "bold",
              }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </Col>
    </Row>
  );
};

export default MapSection;
