import React, { useEffect } from "react";
import { getMaxPricePurchases } from "../services/api";

function AnalyticsPage() {
  const [maxPricePurchases, setMaxPricePurchases] = React.useState([])

  useEffect(() => {
    getMaxPricePurchases().then((tempArray)=>{console.log(tempArray.message)});

  }, [])

  return (
    <div>
      <h1>Items Purchased At Peak Price</h1>
      <div>
        <p>These are some items bought by users at their peak selling price.</p>
      </div>
      <script>
        
      </script>
    </div>
  );
}

export default AnalyticsPage;
