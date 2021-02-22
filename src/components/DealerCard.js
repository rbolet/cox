import "./DealerCard.css";
import Vehicle from "./Vehicle";

export default function DealerCard(props) {
  const { dealer } = props;
  const Vehicles = dealer?.vehicles.map((vehicle) => (
    <Vehicle key={vehicle.vehicleId} vehicle={vehicle} />
  ));
  return (
    <div className="dealer-card col">
      <h5>{dealer?.name}</h5>
      <ul>{Vehicles}</ul>
    </div>
  );
}
