import React, { useEffect, useState } from "react";

const PackageEnrollContext = React.createContext();

const PackageEnrollProvider = ({ children }) => {
  const [packageId, setPackageId] = useState(null);
  const [packageEnroll, setPackageEnroll] = useState({
    duration: "",
    // rate: fullAmount,
    user_id: "",
    package_id: "",
  });
  useEffect(() => {
    const packageId = localStorage.getItem("packageId");
    console.log("packageId", packageId);
    setPackageId(packageId);
  }, [packageId]);
  console.log("packageId", packageId);

  useEffect(() => {
    console.log("packageEnroll", packageEnroll);
  }, [packageEnroll]);

  // Other context provider logic...

  return (
    <PackageEnrollContext.Provider
      value={{ packageId, setPackageId, packageEnroll, setPackageEnroll }}
    >
      {children}
    </PackageEnrollContext.Provider>
  );
};

export { PackageEnrollContext, PackageEnrollProvider };
