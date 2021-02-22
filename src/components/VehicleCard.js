import "./VehicleCard.css";
import { useCallback, useEffect, useState } from "react";
// import DealerDetails from "./DealerDetails";

export default function VehicleCard(props) {
  const { vehicleId, datasetId, addDealer, addVehicle } = props;
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [dealerDetails, setDealerDetails] = useState(null);

  const getVehicleDetails = useCallback(async () => {
    return await fetch(`http://api.coxauto-interview.com/api/${datasetId}/vehicles/${vehicleId}`)
      .then((res) => res.json())
      .then(async (vehicleData) => {
        addVehicle(vehicleData);

        const dealerData = await fetch(
          `http://api.coxauto-interview.com/api/${datasetId}/dealers/${vehicleData.dealerId}`
        ).then((res) => res.json());

        addDealer(dealerData);
        setVehicleDetails(vehicleData);
        setDealerDetails(dealerData);
      });
  }, [vehicleId]);

  // const getDealer = useCallback(async () => {
  //   const { dealerId } = vehicleDetails;

  //   const data = await fetch(
  //     `http://api.coxauto-interview.com/api/${datasetId}/dealers/${dealerId}`
  //   ).then((res) => res.json());
  //   addDealer(data);
  //   setDealerDetails(data);
  // }, [vehicleDetails, datasetId, addDealer]);

  useEffect(() => {
    if (!vehicleId || !datasetId) return;
    getVehicleDetails();
  }, []);

  let vehicleContent = vehicleDetails
    ? `${vehicleDetails?.year} ${vehicleDetails?.make} ${vehicleDetails?.model}`
    : "Loading ...";

  let dealerContent = dealerDetails
    ? `Buy it Now from: ${dealerDetails?.name}`
    : "Loading dealer ...";

  return (
    <div className="vehicle-card col">
      <p>{vehicleContent}</p>
      <p>{dealerContent}</p>
    </div>
  );
}
