import "./App.css";
import { useState } from "react";
import { getDatasetId, getVehicleIds, getAllVehicleData, groupByDealer, postAnswer } from "./lib";
import DealerCard from "./components/DealerCard";
import Header from "./components/Header";

export default function App() {
  const [datasetId, setDatasetId] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [time, setTime] = useState(null);

  async function getData() {
    let id;
    const vehicles = await getDatasetId().then((datasetId) => {
      id = datasetId;
      setDatasetId(datasetId);
      return getVehicleIds(datasetId).then((ids) => getAllVehicleData(datasetId, ids));
    });
    const dealers = groupByDealer(vehicles);
    const response = await postAnswer(id, dealers);

    setDisplayData(dealers);
    setTime(`${parseInt(response.totalMilliseconds) / 1000}`);
  }

  let Cards = displayData.map((dealer) => <DealerCard key={dealer.dealerId} dealer={dealer} />);

  return (
    <div className="app-container">
      <Header getData={getData} datasetId={datasetId} />
      <main style={{ padding: "1rem" }}>
        {datasetId && <InfoBar text={time} />}
        <div className="card-container">{Cards}</div>
      </main>
    </div>
  );
}

function InfoBar(props) {
  const { text } = props;
  const Content = text ? (
    <p>{`Time elapsed: ${text} seconds`}</p>
  ) : (
    <p className="thinking">
      Fetching <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
  return <div className="info-bar">{Content}</div>;
}
