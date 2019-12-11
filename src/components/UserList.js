import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileSaver from 'file-saver';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  ButtonGroup,
  TextField,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Hidden,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import * as actions from '../actions';
import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '50px 0px',
  },
  toolbar: {
    backgroundColor: '#eee',
    marginBottom: '20px',
  },
  toolbarContent: {
    verticalAlign: 'center',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  user: {
    fontSize: '20px',
  },
  cardUser: {
    textAlign: 'center',
  },
}));

function UserList() {
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const users = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    setUsersToDisplay(users);
  }, [users]);

  const handleFilter = e => {
    const text = e.target.value;
    if (text !== '') {
      const filter = usersToDisplay.filter(userFiltered => {
        const fullName = `${userFiltered.firstName} ${userFiltered.lastName}`;
        return (
          fullName.includes(text) ||
          fullName.toLowerCase().includes(text) ||
          fullName.toUpperCase().includes(text)
        );
      });
      setUsersToDisplay(filter);
    } else {
      setUsersToDisplay(users);
    }
  };

  const downloadUsers = () => {
    const usersSelected = users.filter(user => user.isChecked === true);
    const dataToDownload = usersSelected.map(({ isChecked, ...rest }) => rest);

    const blob = new Blob([JSON.stringify(dataToDownload)], {
      type: 'application/json',
    });
    FileSaver.saveAs(blob, 'usersSelected.json');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">React app - User List</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outline-basic"
            label="Search"
            type="text"
            variant="outlined"
            onChange={e => handleFilter(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            {usersToDisplay.filter(user => user.isChecked === true).length}
            <span> itens selected</span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonGroup fullWidth>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              type="button"
              disabled={
                usersToDisplay.filter(user => user.isChecked === true)
                  .length === 0
              }
              onClick={() => dispatch(actions.deleteUsers())}
            >
              Delet selected
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              type="button"
              disabled={
                usersToDisplay.filter(user => user.isChecked === true)
                  .length === 0
              }
              onClick={() => downloadUsers()}
            >
              Download
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.toolbar}>
            <CardContent className={classes.toolbarContent}>
              <Grid container>
                <Grid item xs={4} md={2}>
                  <Checkbox
                    color="primary"
                    type="checkbox"
                    onChange={e => {
                      dispatch(actions.checkAllUsers(e));
                    }}
                  />
                  <Hidden mdUp>
                    <Typography component="span">Check All</Typography>
                  </Hidden>
                </Grid>
                <Hidden mdDown>
                  <Grid item xs={3}>
                    <Typography variant="body1">First Name</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1">Last Name</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">Actions</Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {usersToDisplay.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
    </div>
  );
}

export default UserList;
