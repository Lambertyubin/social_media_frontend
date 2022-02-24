import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "./../auth/auth-helper";
import { remove } from "./api-user.js";
import { useNavigate } from "react-router-dom";

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();
  const navigate = useNavigate();
  const userId = props.userId;

  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    remove(userId, jwt.token).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        redirection();
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  const redirection = () => {
    return navigate("/");
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
