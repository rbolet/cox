import "./Vehicles.css";
import { useState, useEffect, useCallback } from "react";
import VehicleCard from "./VehicleCard";

export default function Vehicles(props) {
  const { datasetId } = props;
  const [vehicles, setVehicles] = useState([]);

  const getVehicles = useCallback(async () => {
    const vehiclesArray = await fetch(
      `http://api.coxauto-interview.com/api/${datasetId}/vehicles`
    ).then((res) => res.json());
    console.log(vehiclesArray);

    setVehicles(vehiclesArray.vehicleIds.map((vehicleId) => ({ vehicleId })));
  }, [datasetId]);

  useEffect(() => {
    if (!datasetId) return;
    getVehicles();
  }, [datasetId, getVehicles]);

  return (
    <div className="card-container">
      {Boolean(vehicles.length) &&
        vehicles.map((vehicle) => <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} />)}
    </div>
  );
}
