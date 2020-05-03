import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import TextField from "@material-ui/core/TextField";
// import { Icon } from "@material-ui/core";

function Log(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [logDateTime, setLogDateTime] = useState(props.logDateTime);
  const [logMeals, setLogMeals] = useState(props.logMeals);
  const [logConsumption, setLogConsumption] = useState(props.logConsumption);
  const [logBG, setLogBG] = useState(props.logBG);
  const [logInsulin, setLogInsulin] = useState(props.logInsulin);

  const handleRemove = () => {
    props.removeLog(props.id);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    //take new log data and pass up to parent
    props.updateLog(
      props.id,
      logDateTime,
      logMeals,
      logConsumption,
      logBG,
      logInsulin
    );
    setIsEditing(false);
  };
  const toggleForm = () => {
    setIsEditing(!isEditing);
  };
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

  let result;
  if (isEditing) {
    result = (
      <TableRow>
        <TableCell component="th" scope="row">
          <form onSubmit={handleUpdate}>
            <TextField
              type="text"
              value={logDateTime}
              name="logDateTime"
              onChange={handleDateTimeChange}
              color="secondary"
            />
            <TextField
              type="text"
              value={logMeals}
              name="logMeals"
              onChange={handleMealsChange}
              color="secondary"
            />
            <TextField
              type="text"
              value={logConsumption}
              name="logConsumption"
              onChange={handleConsumptionChange}
              color="secondary"
            />
            <TextField
              type="text"
              value={logBG}
              name="logBG"
              onChange={handleBGChange}
              color="secondary"
            />
            <TextField
              type="text"
              value={logInsulin}
              name="logInsulin"
              onChange={handleInsulinChange}
              color="secondary"
            />

            <IconButton size="small" type="submit" aria-label="edit">
              <SaveIcon />
            </IconButton>
          </form>
        </TableCell>
      </TableRow>
    );
  } else {
    result = (
      <TableRow>
        <TableCell component="th" scope="row">
          {props.logDateTime}
        </TableCell>
        <TableCell align="right">{props.logMeals}</TableCell>
        <TableCell align="right">{props.logConsumption}</TableCell>
        <TableCell align="right">{props.logBG}</TableCell>
        <TableCell align="right">{props.logInsulin}</TableCell>
        <TableCell align="right">
          <IconButton size="small" aria-label="edit" onClick={toggleForm}>
            <EditIcon></EditIcon>
          </IconButton>

          <IconButton size="small" aria-label="delete" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
  return result;
}

export default Log;
