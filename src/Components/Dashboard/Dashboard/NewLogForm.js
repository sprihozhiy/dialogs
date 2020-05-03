import React, { useState } from "react";
//adding a unique "key" prop for each child
import { v4 as uuid } from "uuid";
import firebase from "../../../firebase.js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./NewLogForm.css";

function NewLogForm(props) {
  const [logDateTime, setLogDateTime] = useState("");
  const [logMeals, setLogMeals] = useState("");
  const [logConsumption, setLogConsumption] = useState("");
  const [logBG, setLogBG] = useState("");
  const [logInsulin, setLogInsulin] = useState("");

  const handleDateTimeChange = (e) => {
    setLogDateTime(e.target.value);
  };
  const handleMealsChange = (e) => {
    setLogMeals(e.target.value);
  };
  const handleConsumptionChange = (e) => {
    setLogConsumption(e.target.value);
  };
  const handleBGChange = (e) => {
    setLogBG(e.target.value);
  };
  const handleInsulinChange = (e) => {
    setLogInsulin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logsRef = firebase.database().ref("logs");
    const log = {
      logDateTime: logDateTime,
      logMeals: logMeals,
      logConsumption: logConsumption,
      logBG: logBG,
      logInsulin: logInsulin,
      id: uuid(),
    };
    logsRef.push(log);
    //passing function using props from TodoList component with adding id to key
    props.createLog({
      logDateTime,
      logMeals,
      logConsumption,
      logBG,
      logInsulin,
      id: uuid(),
    });
    //clear state
    setLogDateTime("");
    setLogMeals("");
    setLogConsumption("");
    setLogBG("");
    setLogInsulin("");
  };

  return (
    <Paper>
      <Grid
        spacing={1}
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <form onSubmit={handleSubmit} className="NewLogForm">
          <Grid item>
            <InputLabel htmlFor="logDateTime">Date & Time</InputLabel>
            <TextField
              type="datetime-local"
              id="logDateTime"
              name="logDateTime"
              value={logDateTime}
              onChange={handleDateTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel id="meals-select-outlined-label">Meals</InputLabel>
              <Select
                labelId="logMeals"
                id="logMeals"
                name="logMeals"
                onChange={handleMealsChange}
                label="Meals"
                value={logMeals}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"lunch"}>Lunch</MenuItem>
                <MenuItem value={"dinner"}>Dinner</MenuItem>
                <MenuItem value={"snack"}>Snack</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              type="number"
              placeholder="Glucose Consumption"
              id="logConsumption"
              name="logConsumption"
              value={logConsumption}
              onChange={handleConsumptionChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              placeholder="Blood Glucose"
              id="logBG"
              name="logBG"
              value={logBG}
              onChange={handleBGChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              placeholder="Insulin Dose"
              id="logInsulin"
              name="logInsulin"
              value={logInsulin}
              onChange={handleInsulinChange}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              Add Log
            </Button>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
}

export default NewLogForm;
