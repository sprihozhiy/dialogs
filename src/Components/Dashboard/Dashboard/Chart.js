import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./Dashboard.css";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const data = [
  { name: "Breakfast", bg: 5.5 },
  { name: "Lunch", bg: 7.9 },
  { name: "Dinner", bg: 4.3 },
  { name: "Snack", bg: 7.2 },
  { name: "Breakfast", bg: 8.4 },
];

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Grid container spacing={3}>
        <Typography variant="h6" className="DashboardTitles">
          Chart
        </Typography>
        <LineChart
          width={980}
          height={230}
          data={data}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Line type="monotone" dataKey="bg" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Grid>
    );
  }
}

export default Chart;
