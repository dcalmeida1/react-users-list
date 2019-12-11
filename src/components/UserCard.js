import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  ButtonGroup,
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
// import { Container } from './styles';

function UserCard({ user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid key={user.id} item xs={4} md={12}>
      <Card className={classes.card}>
        <Hidden mdUp>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {user.firstName.substring(0, 1).toUpperCase()}
              </Avatar>
            }
            title="User"
            style={{ backgroundColor: '#eee' }}
          />
        </Hidden>

        <CardContent className={classes.cardUser}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Checkbox
                type="checkbox"
                checked={user.isChecked}
                onChange={() => dispatch(actions.checkSingleUser(user.id))}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" className={classes.user}>
                {user.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" className={classes.user}>
                {user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                color="primary"
                component={Link}
                to={`/details/${user.id}`}
              >
                Detalhes
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => dispatch(actions.deleteSingleUser(user.id))}
              >
                Deletar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserCard;
