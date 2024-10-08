import React from 'react';
import { observer } from "mobx-react";
import styled from "styled-components";

// Обертка для списка продуктов
const ProductsWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f7f6;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Стили для каждого продукта
const ProductCard = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px 0;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.02);
    }
`;

const ProductName = styled.h3`
    margin: 0;
    color: #00796b;
`;

const ProductDescription = styled.p`
    color: #666;
`;

const ProductStock = styled.p`
    font-weight: bold;
    color: ${props => props.instock === 'true' ? '#388e3c' : '#d32f2f'};
`;

const ProductPrice = styled.p`
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
`;

@observer
class ProductList extends React.Component {
    render() {
        const { products } = this.props; // Правильное обращение к props
        if (!products || !products.length) {
            return <ProductsWrapper><div>Нет товаров для отображения</div></ProductsWrapper>;
        }
        return (
            <ProductsWrapper>
                <h2>Список товаров</h2>
                {products.map((product, index) => (
                    <ProductCard key={index}>
                        <ProductName><a href={`${window.location.href}${product.id}`}>{product.name}</a></ProductName>
                        <ProductDescription>{product.description}</ProductDescription>
                        <ProductStock instock={product.in_stock.toString()}>
                            {product.in_stock ? "В наличии" : "Нет в наличии"}
                        </ProductStock>
                        <ProductPrice>{product.price > 0 ? `${product.price} руб.` : "Цена не указана"}</ProductPrice>
                    </ProductCard>
                ))}
            </ProductsWrapper>
        );
    }
}

export default ProductList;
