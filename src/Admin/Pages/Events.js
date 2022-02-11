
import React, { Component } from 'react';
import GetEvents from "../Events/GetEvents"
import {Link} from "react-router-dom"
import { Container } from 'react-bootstrap';
import { Select } from '@mui/material';

class Events extends Component {

  render() {
    return (
        <div>
          <Container>
            
            <Link to="/events/create" className='btn btn-primary'>
              <i className="icon-edit py-5"></i>Create New Event
            </Link>
          </Container>
            <GetEvents/>
        </div>
    );
  }
}

export default Events;