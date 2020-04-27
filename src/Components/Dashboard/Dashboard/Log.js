import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import TextField from "@material-ui/core/TextField";
// import { Icon } from "@material-ui/core";

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      logDateTime: this.props.logDateTime,
      logMeals: this.props.logMeals,
      logConsumption: this.props.logConsumption,
      logBG: this.props.logBG,
      logInsulin: this.props.logInsulin,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleRemove() {
    this.props.removeLog(this.props.id);
  }
  handleUpdate(e) {
    e.preventDefault();
    //take new logData data and pass up to parent
    this.props.updateLog(
      this.props.id,
      this.state.logDateTime,
      this.state.logMeals,
      this.state.logConsumption,
      this.state.logBG,
      this.state.logInsulin
    );
    this.setState({ isEditing: false });
  }
  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <TableRow>
          <TableCell component="th" scope="row">
            <form onSubmit={this.handleUpdate}>
              <TextField
                type="text"
                value={this.state.logDateTime}
                name="logDateTime"
                onChange={this.handleChange}
                color="secondary"
              />

              <TextField
                type="text"
                value={this.state.logMeals}
                name="logMeals"
                onChange={this.handleChange}
                color="secondary"
              />
              <TextField
                type="text"
                value={this.state.logConsumption}
                name="logConsumption"
                onChange={this.handleChange}
                color="secondary"
              />
              <TextField
                type="text"
                value={this.state.logBG}
                name="logBG"
                onChange={this.handleChange}
                color="secondary"
              />
              <TextField
                type="text"
                value={this.state.logInsulin}
                name="logInsulin"
                onChange={this.handleChange}
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
            {this.props.logDateTime}
          </TableCell>
          <TableCell align="right">{this.props.logMeals}</TableCell>
          <TableCell align="right">{this.props.logConsumption}</TableCell>
          <TableCell align="right">{this.props.logBG}</TableCell>
          <TableCell align="right">{this.props.logInsulin}</TableCell>
          <TableCell align="right">
            <IconButton
              size="small"
              aria-label="edit"
              onClick={this.toggleForm}
            >
              <EditIcon></EditIcon>
            </IconButton>

            <IconButton
              size="small"
              aria-label="delete"
              onClick={this.handleRemove}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    }
    return result;
  }
}

export default Log;
