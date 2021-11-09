import React from "react";
import OrderItem from "../components/OrderItem";

function AnalyticsPage() {
  return (
    <div>
      <h1>HELLO THIS IS THE ANALYTICS PAGE!</h1>
      <OrderItem order_id={3} order_date={"June 8th 2001"} order_total={100} />
      <OrderItem order_id={5} order_date={"June 9th 2001"} order_total={110} />
    </div>
  );
}

export default AnalyticsPage;
