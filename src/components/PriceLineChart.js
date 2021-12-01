import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlignLast: "center",
    width: "80%",
  },
  header: {
    height: "50%",
  },
  pastButton: {
    borderRadius: "100px",
  },
  list: {
    maxHeight: "100%",
    overflow: "auto",
  },
  user: {
    borderRadius: "100px",
  },
});

function PriceLineChart(props) {
  const classes = useStyles();

  return (
    <ResponsiveContainer width="90%" height="90%">
      <div className={classes.dashboardView_transactionsContainerInner}>
        <LineChart
          width={1350}
          height={550}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" minTickGap={30} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </div>
    </ResponsiveContainer>
  );
}

export default PriceLineChart;
