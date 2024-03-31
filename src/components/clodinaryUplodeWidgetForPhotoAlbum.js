import { createContext, useContext, useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axiosInstance from "../axiosInstance";
import { PlayerContext, usePlayer } from "../context/player.context";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget2({ uwConfig, setPublicId }) {
  const { userDetails } = useContext(PlayerContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget2 = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            try {
              console.log(userDetails?.id);
              console.log(result.info.public_id);
              axiosInstance.post(`api/auth/addplayerPhotos`, {
                user_id: userDetails?.id,
                image_url: result.info.public_id,
              });
            } catch (error) {
              console.log(error);
            }
            setPublicId(result.info.public_id);
          }
        }
      );
      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        type="primary"
        ghost
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          height: "60px",
        }}
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget2}
        icon={<UploadOutlined />}
      >
        Upload
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget2;
export { CloudinaryScriptContext };
