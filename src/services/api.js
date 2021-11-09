function requestOptions(type, info) {
  return {
    method: type,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };
}

function getItems() {
  return fetch(
    `api/get/table`,
    requestOptions("POST", { table: "Items" })
  ).then((response) => response.json());
}

function getMarkets() {
  return fetch(
    `api/get/table`,
    requestOptions("POST", { table: "Markets" })
  ).then((response) => response.json());
}

export { getItems, getMarkets };
