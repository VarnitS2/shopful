function requestOptions(type, info) {
  return {
    method: type,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };
}

async function getItems() {
  const response = await fetch(
    `/api/get/table`,
    requestOptions("POST", { table: "Items" })
  );
  return await response.json();
}

async function getMarkets() {
  const response = await fetch(
    `/api/get/table`,
    requestOptions("POST", { table: "Markets" })
  );
  return await response.json();
}

async function postNewOrder() {
  const response = await fetch(
    `/api/add/order`,
    requestOptions("POST", {
      notes: null,
      total_spent: 0,
      user_id: null,
      market_id: null,
    })
  );
  return await response.json();
}

async function postNewPurchase(order_id, item_id, price, quantity) {
  const response = await fetch(
    `/api/add/purchase`,
    requestOptions("POST", {
      order_id,
      item_id,
      price,
      quantity,
    })
  );
  return await response.json();
}

async function getPurchases(order_id) {
  const response = await fetch(
    `/api/get/purchases`,
    requestOptions("POST", {
      order_id,
    })
  );
  return await response.json();
}

export { getItems, getMarkets, postNewOrder, postNewPurchase, getPurchases };
