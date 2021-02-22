import "./App.css";
import { useState } from "react";
import { getDatasetId, getVehicleIds, getAllVehicleData, groupByDealer } from "./lib";
import DealerCard from "./components/DealerCard";

export default function App() {
  const [datasetId, setDatasetId] = useState(null);
  const [fetchTime, setFetchTime] = useState("");
  const [displayData, setDisplayData] = useState([]);

  async function getData() {
    const start = Date.now();
    const vehicles = await getDatasetId().then((datasetId) => {
      setDatasetId(datasetId);
      return getVehicleIds(datasetId).then((ids) => getAllVehicleData(datasetId, ids));
    });

    setFetchTime(`${(Date.now() - start) / 1000}`);
    setDisplayData(groupByDealer(vehicles));
  }

  let Cards = displayData.map((dealer) => <DealerCard key={dealer.dealerId} dealer={dealer} />);

  return (
    <div className="app-container">
      <header className="header">
        <div className="button-container">
          <h4>Get Vehicle Information:</h4>
          <button className="go-button" onClick={getData}>
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
        {fetchTime && <InfoBar text={`API fetch time: ${fetchTime}ms`} />}
        <div className="card-container">{Cards}</div>
      </main>
    </div>
  );
}

function InfoBar(props) {
  const { text } = props;
  return (
    <div className="info-bar">
      <p>{text}</p>
    </div>
  );
}
