import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { 
  Drawer, 
  MuiThemeProvider, 
  TextField, 
  RaisedButton,
  IconButton,
  AppBar
} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// Grey out past dates
const DateCell = ({
  range,
  value,
  children
}) => {

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return (
    <div className={value < now ? "date-in-past" : ""}>
      {children}
    </div>
  );
};

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
      selectedEventId: null,
      selectedEventTitle: null,
    };
  };
  
  // componentDidUpdate() {
  //   console.log("update state", this.state)
  // };

  handleSelectEvent = event => {
    this.setState({drawerOpen: true, editEvent: true, selectedEventId: event.id})
  };

  handleSelectSlot = (slotInfo) => {
    const str = JSON.stringify(slotInfo.start)

    var sliced = str.slice(1, str.length - 1)

    this.setState({ date: new Date(sliced), drawerOpen: true})
    
  };

  compareEventDates = (newEventDate) => {
    const bools = [];

    for (let i = 0; i < this.state.events.length; i++) {
      const currEventDate = new Date(this.state.events[i].start)
      if (+currEventDate === +newEventDate) {
        bools.push(false);
      };
      bools.push(true);
    };
    return bools.includes(false) ? false : true;
  };

  createEvent = (newEvent) => {
    const currDate = new Date().setHours(0,0,0,0);
    const eventDate = new Date(this.state.date);

    if (+currDate <= +eventDate) {
      if (this.compareEventDates(+eventDate)) {

        this.setState({ events: [...this.state.events, newEvent], drawerOpen: false, id: ++this.state.id });

      } else {
        alert('Sorry you already have a scheduled event');
      };
    } else {
      alert('Sorry you can not create an event in the past');
    };

  };

  handleRemoveEvent = (id) => {
    this.setState({
      events: this.state.events.filter(event => event.id !== id), drawerOpen: false, editEvent: false
    });
  };

  handleEditEvent = () => {

    const currDate = new Date().setHours(0, 0, 0, 0);
    const eventDate = new Date(this.state.date);

    if (+currDate <= +eventDate) {
      if (this.compareEventDates(+eventDate)) {
        const filteredItem = this.state.events.filter((event, index) => {
          return event.id === this.state.selectedEventId;
        });

        filteredItem[0].start = this.state.date;
        filteredItem[0].end = this.state.date;
        const filteredArr = this.state.events.filter(event => event.id !== this.state.selectedEventId);
        
        filteredArr.push(filteredItem[0]);

        this.setState({ events: filteredArr, drawerOpen: false });

      } else {
        alert('Sorry you already have a scheduled event');
      };
    } else {
      alert('Sorry you can not create an event in the past');
    };
  };

  renderEditEvent = () => {
    return this.state.editEvent ? (
      <MuiThemeProvider>
        <div>
          <h3>Edit Event</h3>
          <p>Select a new day on the Calendar</p>
          <p>Then click Edit button</p>
          <RaisedButton onClick={this.handleEditEvent}>Edit</RaisedButton>
          <h3>Remove Event</h3>
          <RaisedButton onClick={() => this.handleRemoveEvent(this.state.selectedEventId)}>Remove</RaisedButton>
        </div>
      </MuiThemeProvider> 
    ) : <noscript />
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Drawer
            className='drawer'
            open={this.state.drawerOpen}
          >
            <AppBar 
              title = {<span>Create Event</span>}
              iconElementLeft={<IconButton onClick={() => this.setState({ drawerOpen: false })}><NavigationClose /></IconButton>}
            />
            
            <TextField
              hintText='Title'
              floatingLabelText='Title'
              onChange={e => this.setState({ title: e.target.value })}
            />
            <RaisedButton 
              label="Create Event"
              onClick={() => this.createEvent({
                id: this.state.id,
                title: this.state.title,
                start: this.state.date,
                end: this.state.date,
              })}
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
          components={{ dateCellWrapper: DateCell }}
          defaultDate={new Date()}
        />

      </div>
    );
  };
};

export default Calendar;
