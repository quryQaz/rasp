import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormWrapper = styled.div`
    text-align: center;
    padding: 40px 20px;
    background-color: #f8f9fa; /* Light background for contrast */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 700px;
`;

const Form = styled.form`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 30px;
    text-align: left;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333; /* Darker label color */
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff; /* Blue focus border */
        outline: none;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff; /* Blue focus border */
        outline: none;
    }
`;

const Button = styled.button`
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #0056b3; /* Darker blue on hover */
        transform: translateY(-2px); /* Slight lift effect */
    }

    &:active {
        transform: translateY(0); /* Reset lift on click */
    }
`;

const CreateProductPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [inStock, setInStock] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = {
            name,
            description,
            price: parseFloat(price),
            in_stock: inStock,
        };

        try {
            const response = await fetch('http://localhost:8081/api/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert('Продукт успешно создан!');
                navigate('/dashboard'); // Перенаправление после успешного создания
            } else {
                alert('Ошибка создания продукта');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Ошибка запроса');
        }
    };

    return (
        <FormWrapper>
            <h1 style={{ color: '#007bff' }}>Создание нового продукта</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Название</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                        id="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="price">Цена</Label>
                    <Input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>В наличии</Label>
                    <Input
                        type="checkbox"
                        id="inStock"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                    />
                </FormGroup>
                <Button type="submit">Создать продукт</Button>
            </Form>
        </FormWrapper>
    );
};

export default CreateProductPage;
