import React, { Component } from "react";
//adding a unique "key" prop for each child
import { v4 as uuid } from "uuid";

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

class NewLogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logDateTime: "",
      logMeals: "",
      logConsumption: "",
      logBG: "",
      logInsulin: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    //passing function using props from TodoList component with adding id to key
    this.props.createLog({ ...this.state, id: uuid() });
    //clear state
    this.setState({
      logDateTime: "",
      logMeals: "",
      logConsumption: "",
      logBG: "",
      logInsulin: "",
    });
  }
  render() {
    return (
      <Paper>
        <Grid
          spacing={1}
          container
          direction="column"
          justify="space-around"
          alignItems="center"
        >
          <form onSubmit={this.handleSubmit} className="NewLogForm">
            <Grid item>
              <InputLabel htmlFor="logDateTime">Date & Time</InputLabel>
              <TextField
                type="datetime-local"
                id="logDateTime"
                name="logDateTime"
                value={this.state.logDateTime}
                onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  label="Meals"
                  value={this.state.logMeals}
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
                value={this.state.logConsumption}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="number"
                placeholder="Blood Glucose"
                id="logBG"
                name="logBG"
                value={this.state.logBG}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                placeholder="Insulin Dose"
                id="logInsulin"
                name="logInsulin"
                value={this.state.logInsulin}
                onChange={this.handleChange}
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
}

export default NewLogForm;
