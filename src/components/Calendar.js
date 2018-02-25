import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { 
  Drawer, 
  MuiThemeProvider, 
  TextField, 
  FlatButton 
} from 'material-ui';
import moment from 'moment';
// import events from '../Events';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      title: '',
      events: [],
      date: null
    }
  }
  
  componentDidUpdate() {
    console.log(this.state)
  };

  handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });
  
  handleTitleInput = (e) => this.setState({ title: e.target.value })

  handleSelectEvent = (event) => {
    console.log('handleSelectEvent', event)
    
  };

  handleSelectSlot = (slotInfo) => {
    console.log('handleSelectSlot', slotInfo)
    let str = JSON.stringify(slotInfo.start)

    var sliced = str.slice(1, str.length - 1)
    console.log('sliced', sliced)
    console.log(new Date(sliced))

    this.setState({date: new Date(sliced)})
    
    this.handleDrawerToggle()

  };

  createEvent = () => {

    const event = {
      id: this.state.events.length,
      title: this.state.title,
      start: this.state.date,
      end: this.state.date
    }

    this.setState({ events: [...this.state.events, event] });
  }

  


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Drawer
            open={this.state.drawerOpen}
          >
            <span className='btn-close' onClick={this.handleDrawerToggle}>&times;</span>
            <h3>Create An Event</h3>
            <TextField
              hintText='Title'
              floatingLabelText='Title'
              onChange={this.handleTitleInput}
            />
            <FlatButton 
              label="Create Event"
              onClick={this.createEvent}
            />

          </Drawer>
        </MuiThemeProvider>

        <BigCalendar
          selectable
          showMultiDayTimes
          popup
          events={this.state.events}
          defaultView='month'
          onSelectEvent={this.handleSelectEvent} 
          onSelectSlot={this.handleSelectSlot}
        />

      </div>
    );
  }
}

export default Calendar;

