import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from '../pages/List';
import Details from '../pages/Details';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/details/:id" component={Details} />
    </Switch>
  );
}

export default Routes;
