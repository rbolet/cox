import { getDatasetId, getVehicleIds, getAllVehicleData, getDealers, groupByDealer } from "./lib";

jest.setTimeout(30000);

const testDatasetId = "_KTgp9HW2Ag";
const testVehicleIds = [
  928800569,
  130030408,
  1307574209,
  1197830779,
  1408493127,
  720403266,
  357592894,
  1489353685,
  866182575,
];

const testVehicleData = [
  {
    vehicleId: 928800569,
    year: 2013,
    make: "Mitsubishi",
    model: "Gallant",
    dealerId: 1823955482,
    dealer: { dealerId: 1823955482, name: "House of Wheels" },
  },
  {
    vehicleId: 130030408,
    year: 2004,
    make: "MINI",
    model: "Cooper",
    dealerId: 1685437400,
    dealer: { dealerId: 1685437400, name: "Bob's Cars" },
  },
  {
    vehicleId: 1307574209,
    year: 1979,
    make: "Cheverolet",
    model: "Corvette",
    dealerId: 649083484,
    dealer: { dealerId: 649083484, name: "Doug's Doozies" },
  },
  {
    vehicleId: 1197830779,
    year: 2016,
    make: "Bentley",
    model: "Mulsanne",
    dealerId: 649083484,
    dealer: { dealerId: 649083484, name: "Doug's Doozies" },
  },
  {
    vehicleId: 1408493127,
    year: 2016,
    make: "Kia",
    model: "Soul",
    dealerId: 1823955482,
    dealer: { dealerId: 1823955482, name: "House of Wheels" },
  },
  {
    vehicleId: 720403266,
    year: 2012,
    make: "Nissan",
    model: "Altima",
    dealerId: 649083484,
    dealer: { dealerId: 649083484, name: "Doug's Doozies" },
  },
  {
    vehicleId: 357592894,
    year: 2014,
    make: "Ford",
    model: "F150",
    dealerId: 1685437400,
    dealer: { dealerId: 1685437400, name: "Bob's Cars" },
  },
  {
    vehicleId: 1489353685,
    year: 2016,
    make: "Honda",
    model: "Accord",
    dealerId: 1685437400,
    dealer: { dealerId: 1685437400, name: "Bob's Cars" },
  },
  {
    vehicleId: 866182575,
    year: 2009,
    make: "Ford",
    model: "F150",
    dealerId: 1823955482,
    dealer: { dealerId: 1823955482, name: "House of Wheels" },
  },
];

const testDealers = [
  { dealerId: 1823955482, name: "House of Wheels" },
  { dealerId: 1685437400, name: "Bob's Cars" },
  { dealerId: 649083484, name: "Doug's Doozies" },
];

const testDealerShape = [
  {
    dealerId: 1823955482,
    name: "House of Wheels",
    vehicles: [
      { make: "Mitsubishi", model: "Gallant", vehicleId: 928800569, year: 2013 },
      { make: "Kia", model: "Soul", vehicleId: 1408493127, year: 2016 },
      { make: "Ford", model: "F150", vehicleId: 866182575, year: 2009 },
    ],
  },
  {
    dealerId: 1685437400,
    name: "Bob's Cars",
    vehicles: [
      { make: "MINI", model: "Cooper", vehicleId: 130030408, year: 2004 },
      { make: "Ford", model: "F150", vehicleId: 357592894, year: 2014 },
      { make: "Honda", model: "Accord", vehicleId: 1489353685, year: 2016 },
    ],
  },
  {
    dealerId: 649083484,
    name: "Doug's Doozies",
    vehicles: [
      { make: "Cheverolet", model: "Corvette", vehicleId: 1307574209, year: 1979 },
      { make: "Bentley", model: "Mulsanne", vehicleId: 1197830779, year: 2016 },
      { make: "Nissan", model: "Altima", vehicleId: 720403266, year: 2012 },
    ],
  },
];

test("A datasetId is retrieved from the API", async () => {
  const randomizedDatasetID = await getDatasetId();

  expect(typeof randomizedDatasetID).toEqual("string");
  expect(randomizedDatasetID.length).toEqual(11);
});

test("An array of vehicleIds is retrieved from the API", async () => {
  const vehicleIds = await getVehicleIds(testDatasetId);
  expect(vehicleIds).toStrictEqual(testVehicleIds);
});

test("An array of vehicles with dealer info is retreived from the API", async () => {
  const vehicles = await getAllVehicleData(testDatasetId, testVehicleIds);

  expect(vehicles).toStrictEqual(testVehicleData);
});

test("Can get an array of dealers from vehicle data", () => {
  const dealers = getDealers(testVehicleData);

  expect(dealers).toStrictEqual(testDealers);
});

test("Groups vehicles by dealer", () => {
  const dealerShape = groupByDealer(testVehicleData);

  expect(dealerShape).toStrictEqual(testDealerShape);
});
