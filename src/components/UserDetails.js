import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../actions';
import history from '../services/history';
import 'react-toastify/dist/ReactToastify.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px 0px',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function UserDetails(props) {
  let { userId } = props;
  userId = parseInt(userId, 10);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const users = useSelector(state => state);
  const dispatch = useDispatch();

  const setInitialState = () => {
    const userById = users.filter(user => user.id === userId);
    setFirstName(userById[0].firstName);
    setLastName(userById[0].lastName);
  };

  useEffect(() => {
    setInitialState();
  }, []);

  const saveChangesClick = e => {
    e.preventDefault();
    dispatch(actions.saveChanges(userId, firstName, lastName));
    toast.info('The changes have been saved!', {
      onClose: () => history.push('/'),
    });
  };

  const cancelChangesClick = e => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelation = e => {
    e.preventDefault();
    setOpen(false);
    setInitialState();
  };

  return (
    <div className={classes.root}>
      <ToastContainer autoClose={2000} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Edit User</Typography>
        </Grid>
        <Grid item xs={12}>
          <form>
            <TextField
              id="fname"
              variant="outlined"
              label="First Name"
              type="text"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              id="lname"
              label="Last Name"
              variant="outlined"
              type="text"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={e => saveChangesClick(e)}
            >
              Salvar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={cancelChangesClick}
            >
              Cancelar
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">WARNING</h2>
                <p id="simple-modal-description">
                  Are you sure you want to cancel these changes?
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={e => handleCancelation(e)}
                >
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDetails;
