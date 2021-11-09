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

async function updateOrder(
  order_id,
  purchase_date,
  market_id,
  notes,
  total_spent
) {
  const response = await fetch(
    `/api/update/order`,
    requestOptions("POST", {
      order_id,
      purchase_date,
      market_id,
      notes,
      total_spent,
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

async function deletePurchase(purchase_id) {
  const response = await fetch(
    `/api/delete/purchase`,
    requestOptions("POST", { purchase_id })
  );
  return await response.json();
}

async function getMaxPricePurchases() {
  const response = await fetch(
    `/api/get/max-price-per-user`,
    requestOptions("POST", {})
  );
  return await response.json();
}

async function deleteOrder(order_id) {
  const response = await fetch(
    `/api/delete/order`,
    requestOptions("POST", { order_id })
  );
  return await response.json();
}

async function getFrequentItemsBought() {
  const response = await fetch(
    `/api/get/frequently-bought-items`,
    requestOptions("POST", {})
  );
  return await response.json();
}

export {
  getItems,
  getMarkets,
  postNewOrder,
  postNewPurchase,
  getPurchases,
  deletePurchase,
  updateOrder,
  getMaxPricePurchases,
  deleteOrder,
  getFrequentItemsBought,
};
