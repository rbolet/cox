import "./Vehicles.css";
import { useState, useEffect, useCallback } from "react";
import VehicleCard from "./VehicleCard";

export default function Vehicles(props) {
  const { datasetId } = props;
  const [vehicleIds, setVehicleIds] = useState([]);

  const getVehicleIds = useCallback(async () => {
    const data = await fetch(
      `http://api.coxauto-interview.com/api/${datasetId}/vehicles`
    ).then((res) => res.json());

    setVehicleIds(data.vehicleIds);
  }, [datasetId]);

  useEffect(() => {
    if (!datasetId) return;
    getVehicleIds();
  }, [datasetId, getVehicleIds]);

  return (
    <div className="card-container">
      {Boolean(vehicleIds.length) &&
        vehicleIds.map((vehicleId) => (
          <VehicleCard key={vehicleId} vehicleId={vehicleId} datasetId={datasetId} />
        ))}
    </div>
  );
}
