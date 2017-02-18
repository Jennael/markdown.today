import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import KeyboardArrowLeft from "material-ui/svg-icons/image/navigate-before";
import CircularProgress from "material-ui/CircularProgress";
import { getEntryById } from "../accessors";
import { formatTimestamp } from "../utils";
import { updateEntry } from "../actionCreators";
import SavingProgress from "./SavingProgress";

class EditEntry extends Component {
  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconElementLeft={
            (
              <IconButton onClick={this.props.goHome}>
                <KeyboardArrowLeft />
              </IconButton>
            )
          }
        />
        <SavingProgress />
        {!this.props.loaded
          ? <div
              style={{ width: "100%", textAlign: "center", marginTop: "300px" }}
            >
              <CircularProgress size={80} thickness={5} />
            </div>
          : <TextField
              id={`${this.props.id}`}
              onChange={this.props.handleChange}
              fullWidth={true}
              multiLine={true}
              value={this.props.markdown}
            />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const entry = getEntryById(state, ownProps.routeParams.id);
  return {
    loaded: !!entry,
    title: entry && formatTimestamp(entry.date),
    markdown: entry && entry.markdown
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: e =>
    dispatch(updateEntry(ownProps.routeParams.id, e.target.value)),
  goHome: () => dispatch(push("/"))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
