export async function getDatasetId() {
  return await fetch("http://api.coxauto-interview.com/api/datasetId").then(async (res) => {
    const data = await res.json();
    return data.datasetId;
  });
}

export async function getVehicleIds(datasetId) {
  return await fetch(`http://api.coxauto-interview.com/api/${datasetId}/vehicles`).then(
    async (res) => {
      const data = await res.json();
      return data.vehicleIds;
    }
  );
}

export async function getAllVehicleData(datasetId, vehicleIds) {
  return await Promise.all(
    vehicleIds.map(async (vehicleId) => {
      const vehicle = await fetch(
        `http://api.coxauto-interview.com/api/${datasetId}/vehicles/${vehicleId}`
      ).then((res) => res.json());

      const dealer = await fetch(
        `http://api.coxauto-interview.com/api/${datasetId}/dealers/${vehicle.dealerId}`
      ).then((res) => res.json());
      vehicle.dealer = dealer;
      return vehicle;
    })
  );
}

export function getDealers(vehicles) {
  const dealerSet = new Set(vehicles.map((vehicle) => JSON.stringify(vehicle.dealer)));
  let dealers = [];
  dealerSet.forEach((dealer) => dealers.push(JSON.parse(dealer)));

  return dealers;
}

export function groupByDealer(vehicleData) {
  const dealers = getDealers(vehicleData);

  return dealers.map((dealer) => {
    const vehicles = vehicleData
      .filter((vehicle) => vehicle.dealer.dealerId === dealer.dealerId)
      .map((vehicle) => {
        const { vehicleId, year, make, model } = vehicle;
        return { vehicleId, year, make, model };
      });

    dealer.vehicles = vehicles;
    return dealer;
  });
}

export async function postAnswer(datasetId, dealers) {
  const body = JSON.stringify({ dealers });
  const response = await fetch(`http://api.coxauto-interview.com/api/${datasetId}/answer`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body,
  }).then((res) => res.json());
  return response;
}
