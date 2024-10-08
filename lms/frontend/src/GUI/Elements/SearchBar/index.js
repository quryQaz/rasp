import React, { useState } from 'react';
import styled from "styled-components";
import { observer } from "mobx-react";
import GetColorCode from 'Utils/GetColorCode'

const Input = styled.input`
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
`

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`

const ButtonStyle = {
  background: GetColorCode('orange'),
}

@observer
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchData || '' // Используем props как начальное значение, если оно предоставлено
    };

    // Привязка контекста this к методам
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8081/api/products/$search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ search: this.state.searchTerm })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Выводим полученные данные в консоль
      this.props.setData(data.data);
    })
    .catch(error => {
      console.error('Ошибка при поиске товаров:', error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSearchSubmit}>
        <Input
          type="text"
          placeholder="Поиск товаров..."
          value={this.searchTerm}
          onChange={this.handleSearchChange}
        />
        <Button style={ButtonStyle} type="submit">Поиск</Button>
      </form>
    );
  }
}

export default SearchBar;
