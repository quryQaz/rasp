import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
// import Header from "GUI/Elements/Header"
import SearchBar from 'GUI/Elements/SearchBar';
import ProductList from './ProductList';
import SupportPopup from 'GUI/Elements/Popups/SupportPopup';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// Обертка для всей страницы
const MainFormWrapper = styled.div`
    text-align: center;
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #e0f7fa, #80deea);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Стили для заголовка
const Header = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

// Стили для заголовка страницы
const Title = styled.h1`
    margin: 0;
    color: #00796b;
`;

// Стили для контейнера поиска
const SearchContainer = styled.div`
    margin-top: 10px;
`;

@observer
export class Dashboard extends React.Component {
    @observable data = [];

    constructor(props) {
        super(props);
        document.title = "Dashboard";
    }

    @action
    setData = (data) => {
        this.data = data;
        this.forceUpdate();
    }

    render() {
        return (
            <>
                <MainFormWrapper>
                    <Header>
                        <Title>Магазин товаров</Title>
                        <SearchContainer>
                            <SearchBar data={this.data} setData={this.setData} />
                        </SearchContainer>
                    </Header>
                    <ProductList products={this.data} />
                    <SupportPopup />
                </MainFormWrapper>
            </>
        );
    }
}
