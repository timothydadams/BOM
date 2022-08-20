import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <section>
    <h1>404 - Not Found!</h1>
    <br />
    <Link to="/">
      Go Home
    </Link>
  </section>
);

export const NoResults = () => (
  <div className="Error Error-Label">
      Whoops, looks like the your search didn't find any results.  Please try again!
  </div>
)


export const NotAuthorized = () => (
  <section>
    <h1>Oops!</h1>
    <p>Looks like you don't have access.</p>
    <br />
    <Link to="/">
      Go Home
    </Link>
  </section>
);

export const Thanks = (props) => (
  <div>
    <h1>`Thank you for registering for ${props.bomEvent.BP_Title}`</h1>
    <Link to="/">
      Go Home
    </Link>
  </div>
);