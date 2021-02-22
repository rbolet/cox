import "./Header.css";

export default function Header(props) {
  const { getData, datasetId } = props;

  return (
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
  );
}
