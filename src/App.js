import "./App.css";
import { useState, useEffect, useCallback } from "react";
import VehicleCard from "./components/VehicleCard";

export default function App() {
  const [datasetId, setDatasetId] = useState(null);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [dealers, setDealers] = useState([]);

  const getVehicleIds = useCallback(async () => {
    const data = await fetch(
      `http://api.coxauto-interview.com/api/${datasetId}/vehicles`
    ).then((res) => res.json());

    setVehicleIds(data.vehicleIds);
  }, [datasetId]);

  async function getDataset() {
    const data = await fetch("http://api.coxauto-interview.com/api/datasetId").then((res) =>
      res.json()
    );
    setDatasetId(data?.datasetId);
  }

  function addVehicle(newVehicle) {
    setVehicles([...vehicles, newVehicle]);
  }

  function addDealer(newDealer) {
    setDealers([...dealers, newDealer]);
  }

  useEffect(() => {
    if (!vehicleIds.length || !vehicles.length || !dealers.length) return;

    if (vehicles.length === vehicleIds.length && dealers.length === vehicleIds.length) {
      console.log("🚀 ~ file: App.js ~ line 39 ~ addVehicle ~ vehicles", vehicles);
      console.log("🚀 ~ file: App.js ~ line 36 ~ useEffect ~ dealers", dealers);
    }
  }, [dealers, vehicles]);

  useEffect(() => {
    if (!datasetId) return;
    getVehicleIds();
  }, [datasetId, getVehicleIds]);

  let Cards = vehicleIds.map((vehicleId) => (
    <VehicleCard
      key={vehicleId}
      vehicleId={vehicleId}
      datasetId={datasetId}
      addDealer={addDealer}
      addVehicle={addVehicle}
    />
  ));

  return (
    <div className="app-container">
      <header className="header">
        <div className="button-container">
          <h4>Get Vehicle Information:</h4>
          <button className="go-button" onClick={getDataset}>
            GO!
          </button>
        </div>
        <div>
          {datasetId ? (
            <p>
              Dataset Id: <span role="note">{datasetId}</span>
            </p>
          ) : (
            <p>No Dataset Id</p>
          )}
        </div>
      </header>
      <main style={{ padding: "1rem" }}>
        <div className="card-container">{Cards}</div>
      </main>
    </div>
  );
}
