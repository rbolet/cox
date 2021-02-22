import "./DealerCard.css";

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

function Vehicle({ vehicle }) {
  const { year, make, model } = vehicle;
  return <li>{`${year} ${make} ${model}`}</li>;
}
