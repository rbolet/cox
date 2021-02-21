import "./VehicleCard.css";
import { useCallback, useEffect, useState } from "react";
import DealerDetails from "./DealerDetails";

export default function VehicleCard(props) {
  const { vehicleId, datasetId } = props;
  const [vehicleDetails, setVehicleDetails] = useState(null);

  const getVehicleDetails = useCallback(async () => {
    const data = await fetch(
      `http://api.coxauto-interview.com/api/${datasetId}/vehicles/${vehicleId}`
    ).then((res) => res.json());
    setVehicleDetails(data);
  }, [vehicleId, datasetId]);

  useEffect(() => {
    if (!vehicleId || !datasetId) return;
    getVehicleDetails();
  }, [vehicleId, datasetId, getVehicleDetails]);

  let content = vehicleDetails
    ? `${vehicleDetails?.year} ${vehicleDetails?.make} ${vehicleDetails?.model}`
    : "Loading ...";
  return (
    <div className="vehicle-card col">
      <p>{content}</p>
      <DealerDetails datasetId={datasetId} dealerId={vehicleDetails?.dealerId} />
    </div>
  );
}
