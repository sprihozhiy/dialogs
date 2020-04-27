import React, { Component } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Log from "./Log";
import NewLogForm from "./NewLogForm";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";

import Typography from "@material-ui/core/Typography";

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
  }

  //function for creating a new log
  create(newLog) {
    //adding new item to an excisting array using ...operator
    this.setState({
      logs: [newLog, ...this.state.logs],
    });
  }
  remove(id) {
    this.setState({
      logs: this.state.logs.filter((t) => t.id !== id),
    });
  }
  update(
    id,
    updatedLogDateTime,
    updatedLogMeals,
    updatedLogConsumption,
    updatedLogBG,
    updatedLogInsulin
  ) {
    const updatedLogs = this.state.logs.map((log) => {
      if (log.id === id) {
        return {
          ...log,
          logDateTime: updatedLogDateTime,
          logMeals: updatedLogMeals,
          logConsumption: updatedLogConsumption,
          logBG: updatedLogBG,
          logInsulin: updatedLogInsulin,
        };
      }
      return log;
    });
    this.setState({ logs: updatedLogs });
  }
  render() {
    const logs = this.state.logs.map((log) => {
      return (
        <Log
          key={log.id}
          id={log.id}
          logDateTime={log.logDateTime}
          logMeals={log.logMeals}
          logConsumption={log.logConsumption}
          logBG={log.logBG}
          logInsulin={log.logInsulin}
          removeLog={this.remove}
          updateLog={this.update}
        />
      );
    });
    return (
      <Grid container spacing={3}>
        {/* Recent Logs */}
        <Grid item xs={12} md={8} lg={9}>
          <h3>Recent Logs</h3>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell align="right">Meals</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Glucose Consumption" placement="top">
                      <Typography>GC (g)</Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Blood Glucose" placement="top">
                      <Typography> BG (mmol/L)</Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Insulin Dosage in Units" placement="top">
                      <Typography> ID (u)</Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell>
                      <Alert severity="info">There are no logs...</Alert>
                    </TableCell>
                  </TableRow>
                ) : (
                  logs
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* Add Log */}
        <Grid item xs={12} md={4} lg={3}>
          <h3>Add Log</h3>
          <NewLogForm createLog={this.create} />
        </Grid>
      </Grid>
    );
  }
}

export default LogList;
