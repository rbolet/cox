export default function Vehicle({ vehicle }) {
  const { year, make, model } = vehicle;
  return <li>{`${year} ${make} ${model}`}</li>;
}
