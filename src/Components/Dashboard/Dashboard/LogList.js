import React, { useState, useEffect } from "react";
import firebase from "../../../firebase.js";
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
import "./Dashboard.css";

function LogList(props) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logsRef = firebase.database().ref("logs");
    logsRef.on("value", (snapshot) => {
      let logsObj = snapshot.val();
      let newState = [];
      for (let logItem in logsObj) {
        newState.push({
          id: logItem,
          logDateTime: logsObj[logItem].logDateTime,
          logMeals: logsObj[logItem].logMeals,
          logConsumption: logsObj[logItem].logConsumption,
          logBG: logsObj[logItem].logBG,
          logInsulin: logsObj[logItem].logInsulin,
        });
      }
      setLogs(newState);
    });
  }, []);
  //function for creating a new log
  const create = (newLog) => {
    //adding new item to an excisting array using ...operator
    setLogs([newLog, ...logs]);
  };
  const remove = (id) => {
    const logRef = firebase.database().ref(`/logs/${id}`);
    console.log(logRef);
    logRef.remove();
    setLogs(logs.filter((l) => l.id !== id));
  };

  //Updating only on frontend, not updating data in database
  const update = (
    id,
    updatedLogDateTime,
    updatedLogMeals,
    updatedLogConsumption,
    updatedLogBG,
    updatedLogInsulin
  ) => {
    const updatedLogs = logs.map((log) => {
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
    setLogs(updatedLogs);
  };

  const allLogs = logs.map((log) => {
    return (
      <Log
        key={log.id}
        id={log.id}
        logDateTime={log.logDateTime}
        logMeals={log.logMeals}
        logConsumption={log.logConsumption}
        logBG={log.logBG}
        logInsulin={log.logInsulin}
        removeLog={remove}
        updateLog={update}
      />
    );
  });
  return (
    <Grid container spacing={3}>
      {/* Recent Logs */}
      <Grid item xs={12} md={8} lg={9}>
        <Typography variant="h6" className="DashboardTitles">
          Recent Logs
        </Typography>
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
              {allLogs.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Alert severity="info">There are no logs...</Alert>
                  </TableCell>
                </TableRow>
              ) : (
                allLogs
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* Add Log */}
      <Grid item xs={12} md={4} lg={3}>
        <Typography variant="h6" className="DashboardTitles">
          Add Log
        </Typography>
        <NewLogForm createLog={create} />
      </Grid>
    </Grid>
  );
}

export default LogList;
