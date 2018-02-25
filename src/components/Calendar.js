import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from '../Events';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  handleSelectEvent = (event) => {
    console.log('handleSelectEvent', event)
  }

  handleSelectSlot = (slotInfo) => {
    console.log('handleSelectSlot', slotInfo)

  }

  componentDidUpdate() {
    console.log()
  }

  render() {
    return (
      <BigCalendar 
        className='calendar'
        selectable
        events={this.state.events}
        defaultView='month'
        onSelectEvent={this.handleSelectEvent} 
        onSelectSlot={this.handleSelectSlot}
      />
    );
  }
}

export default Calendar;

