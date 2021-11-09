function requestOptions(type, info) {
  return {
    method: type,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };
}

function getItems() {
  return fetch(
    `/api/get/table`,
    requestOptions("POST", { table: "Items" })
  ).then((response) => response.json());
}

function getMarkets() {
  return fetch(
    `/api/get/table`,
    requestOptions("POST", { table: "Markets" })
  ).then((response) => response.json());
}

function postNewOrder() {
  return fetch(
    `/api/add/order`,
    requestOptions("POST", {
      notes: null,
      total_spent: 0.0,
      user_id: null,
      market_id: null,
    })
  ).then((response) => response.json());
}

function postNewPurchase(order_id, item_id, price, quantity) {
  return fetch(
    `/api/add/purchase`,
    requestOptions("POST", {
      order_id,
      item_id,
      price,
      quantity,
    })
  ).then((response) => response.json());
}

export { getItems, getMarkets, postNewOrder, postNewPurchase };
