import React from 'react';
import UserDetails from '../../components/UserDetails';

export default function Details(props) {
  const { id } = props.match.params;
  return <UserDetails userId={id} />;
}
