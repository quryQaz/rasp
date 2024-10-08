import { observer } from "mobx-react";
import { observable, makeObservable, action } from "mobx";
import styled from "styled-components";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { startOfDay, endOfDay } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const ControlsWrapper = styled.div`
  display: flex;
  justifyContent: space-around;
  alignItems: center;
  position: relative;
  padding: 5px 0;

  .react-datepicker {
    font-size: 12px;

    .react-datepicker__month {
      margin: 0;
    }

    .react-datepicker__header {
      background-color: #f0f0f0;
      border-bottom: none;
    }

    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
      width: 22px;
      line-height: 22px;
    }
  }

  .react-datepicker-wrapper {
    width: 107px;
    margin: 0 10px 0 9px;

    input {
      width: 107px;
      height: 25px;
      border-radius: 5px;
      padding: 0 5px;
    }
  }

`;

const DateRangePicker = (observer(class extends React.Component {

  startDate = '';
  endDate = '';

  constructor(props) {
      makeObservable(this, {
        startDate: observable,
        setStartDate: action
      });
      makeObservable(this, {
        endDate: observable,
        setEndDate: action
      });
  }

  setStartDate = value => {
      this.startDate = value
  }

  setEndDate = value => {
      this.endDate = value
  }

  render() {
      return (
        <ControlsWrapper>
            <DatePicker
              selected={this.startDate}
              onChange={date => {
                  this.startDate = date;
                  this.props.filters.setStartDate(startOfDay(date));
                  this.props.search();
              }}
              selectsStart
              placeholderText={"Дата до"}
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              selected={this.endDate}
              onChange={date => {
                  this.endDate = date;
                  this.props.filters.setEndDate(endOfDay(date));
                  this.props.search();
              }}
              selectsEnd
              placeholderText={"Дата после"}
              minDate={this.startDate}
              dateFormat="dd/MM/yyyy"
            />
        </ControlsWrapper>
      );
  }
}))

export default DateRangePicker;
