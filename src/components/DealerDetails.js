import { useState, useEffect, useCallback } from "react";

export default function DealerDetails(props) {
  const { dealerId, datasetId } = props;
  const [dealerDetails, setDealerDetails] = useState(null);

  const getDealer = useCallback(async () => {
    const data = await fetch(
      `http://api.coxauto-interview.com/api/${datasetId}/dealers/${dealerId}`
    ).then((res) => res.json());
    setDealerDetails(data);
  }, [dealerId, datasetId]);

  useEffect(() => {
    if (!dealerId || !datasetId) return;
    getDealer();
  }, [dealerId, datasetId, getDealer]);

  let content = dealerDetails ? `Buy it Now from: ${dealerDetails?.name}` : "Loading dealer ...";

  return <p>{content}</p>;
}
