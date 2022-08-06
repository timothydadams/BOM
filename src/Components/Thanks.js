import React from 'react';
import { Link } from 'react-router-dom';

const Thanks = (props) => (
  <div>
    <h1>Thank you for registering for props.bomEvent.BP_Title</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default Thanks;