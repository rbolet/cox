import "./VehicleCard.css";

export default function VehicleCard(props) {
  const { vehicle } = props;

  return <div className="vehicle-card">{vehicle?.vehicleId}</div>;
}
