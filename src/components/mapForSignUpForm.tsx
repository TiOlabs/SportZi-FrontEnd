import { Col, Row, Skeleton } from "antd";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useCallback, useEffect, useState } from "react";

const center: google.maps.LatLngLiteral = { lat: 6.7969, lng: 79.9018 };

const MapForSignUpForm: React.FC = () => {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const { lg } = useBreakpoint();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const handleClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        console.log("Clicked Location:", clickedLocation);
        setSelected(clickedLocation);
      }
    },
    [setSelected]
  );

  useEffect(() => {
    if (selected) {
      localStorage.setItem("selectedLocation", JSON.stringify(selected));
    }
  }, [selected]);

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <Row style={{ backgroundColor: "#EFF4FA", marginTop: "2%" }}>
      <Col xs={24} md={24} style={{ padding: "2%" }}>
        <GoogleMap
          center={center}
          zoom={15}
          onClick={handleClick}
          mapContainerStyle={{
            width: "100%",
            height: "50vh",
          }}
        >
          {selected && (
            <Marker position={{ lat: selected.lat, lng: selected.lng }} />
          )}
        </GoogleMap>
      </Col>
    </Row>
  );
};

export default MapForSignUpForm;
