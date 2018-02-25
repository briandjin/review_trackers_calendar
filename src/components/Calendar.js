import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { 
  Drawer, 
  MuiThemeProvider, 
  TextField, 
  FlatButton,
  Divider,

} from 'material-ui';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      drawerOpen: false,
      editEvent: false,
      title: null,
      events: [],
      date: null,
      selectedEventId: null
    }
  }
  
  componentDidUpdate() {
    console.log(this.state)
  };

  handleDrawerToggle = () => this.setState({ drawerOpen: !this.state.drawerOpen });
  
  handleTitleInput = (e) => this.setState({ title: e.target.value })

  handleSelectEvent = (event, e) => {
    console.log('handleSelectEvent', event)
    this.setState({drawerOpen: true, editEvent: true, selectedEventId: event.id})
    
  };

  handleSelectSlot = (slotInfo) => {
    let str = JSON.stringify(slotInfo.start)

    var sliced = str.slice(1, str.length - 1)

    this.setState({ date: new Date(sliced), drawerOpen: true})
    
  };

  compareEventDates = (newEventDate) => {
    if (this.state.events.length === 0) {
      return true;
    };

    for (let i = 0; i < this.state.events.length; i++) {
      const currEventDate = new Date(this.state.events[i].start)
      if (+currEventDate === +newEventDate) {
        return false;
      };
      return true;
    };

  };

  createEvent = () => {
    const currDate = new Date().setHours(0,0,0,0);
    const eventDate = new Date(this.state.date);

    const newEvent = {
      id: this.state.id,
      title: this.state.title,
      start: this.state.date,
      end: this.state.date,
    };

    if (+currDate <= +eventDate) {
      if (this.compareEventDates(+eventDate)) {

        this.setState({ events: [...this.state.events, newEvent], drawerOpen: false, id: ++this.state.id });

      } else {
        alert('Sorry you already have a scheduled event')
      }
    } else {
      alert('Sorry you can not create an event in the past')
    };

  };

  handleRemoveEvent = () => {
    this.setState({
      events: this.state.events.filter((event) => event.id !== this.state.selectedEventId), drawerOpen: false
    });
  }

  renderEditEvent = () => {
    if (this.state.editEvent) {
      return (
          <MuiThemeProvider>
            <div className='edit-section'> 
              <FlatButton onClick={this.handleRemoveEvent}>Remove Event</FlatButton>
            </div>
          </MuiThemeProvider>
      )
    }
    return <noscript />
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Drawer
            className='drawer'
            open={this.state.drawerOpen}
          >
            <span 
              className='btn-close' 
              onClick={()=> this.setState({ drawerOpen: false })}
            >&times;</span>
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
            {this.renderEditEvent()}
          </Drawer>
        </MuiThemeProvider>

        <BigCalendar
          className='calendar'
          selectable
          defaultView='month'
          events={this.state.events}
          onSelectEvent={this.handleSelectEvent} 
          onSelectSlot={this.handleSelectSlot}
        />

      </div>
    );
  }
}

export default Calendar;

