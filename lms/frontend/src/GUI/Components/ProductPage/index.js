import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SupportPopup from 'GUI/Elements/Popups/SupportPopup';

// Основные стили страницы
const MainFormWrapper = styled.div`
    font-family: 'Roboto', sans-serif;
    padding: 40px;
    background-color: #f4f7f6;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f7fa, #80deea);
    background-attachment: fixed;
`;

const Header = styled.div`
    background-color: #00796b;
    padding: 30px;
    border-bottom: 1px solid #004d40;
    margin-bottom: 40px;
    color: #fff;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Обертка для контента продукта и комментариев
const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 40px;
`;

const ProductDetails = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    padding: 30px;
    max-width: 600px;
    text-align: left;
`;

const ProductName = styled.h2`
    margin: 0;
    color: #333;
    font-size: 2rem;
`;

const ProductDescription = styled.div`
    margin: 20px 0;
    color: #666;
    line-height: 1.6;
    font-size: 1rem;
`;

const ProductPrice = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    color: #00796b;
`;

const ProductStock = styled.p`
    color: ${props => props.instock === 'true' ? '#388e3c' : '#d32f2f'};
    font-weight: bold;
    font-size: 1.1rem;
`;

const ProductImage = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 30px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const BuyButton = styled.button`
    background-color: #00796b;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #004d40;
    }
`;

// Блок комментариев
const CommentsSection = styled.div`
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    padding: 30px;
    width: 400px;
    max-height: 600px;
    overflow-y: auto;
`;

const Comment = styled.div`
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f4f4f4;
    border-radius: 8px;
`;

const CommentAuthor = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`;

const CommentText = styled.p`
    color: #333;
    line-height: 1.4;
`;

const CommentInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    resize: vertical;
`;

const SubmitCommentButton = styled.button`
    background-color: #00796b;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #004d40;
    }
`;

const ProductPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/products/${id}`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result[0].data[0]);
                } else {
                    console.error('Ошибка загрузки данных');
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:8081/comments`);
                if (response.ok) {
                    const result = await response.json();
                    setComments(result);
                } else {
                    console.error('Ошибка загрузки комментариев');
                }
            } catch (error) {
                console.error('Ошибка запроса:', error);
            }
        };

        fetchProductData();
        fetchComments();
    }, [id]);

    // Функция для отправки нового комментария
    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8081/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newComment }),
            });

            if (response.ok) {
                const comment = await response.json();
                setComments([...comments, comment]);
                setNewComment("");
            } else {
                console.error('Ошибка при отправке комментария');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    if (!data) {
        return <div>Загрузка...</div>;
    }
    console.log(comments);
    return (
        <MainFormWrapper>
            <Header>
                <h1>Детали продукта</h1>
            </Header>
            <ContentWrapper>
                <ProductDetails>
                    <ProductImage
                        src={`http://localhost:8081/api/images?filename=1.jpeg`}
                        alt={data.name}
                    />
                    <ProductName>{data.name}</ProductName>
                    <ProductDescription><div dangerouslySetInnerHTML={{ __html: data.description }} /></ProductDescription>
                    <ProductPrice>{data.price} ₽</ProductPrice>
                    <ProductStock instock={data.in_stock.toString()}>
                        {data.in_stock ? 'В наличии' : 'Нет в наличии'}
                    </ProductStock>
                    <BuyButton>Купить сейчас</BuyButton>
                </ProductDetails>

                {/* Секция комментариев */}
                <CommentsSection>
                    <h3>Комментарии</h3>
                    {comments.map((comment, index) => (
                        <Comment key={index}>
                            <CommentAuthor>Пользователь</CommentAuthor>
                            <CommentText>{comment}</CommentText>
                        </Comment>
                    ))}

                    <CommentInput
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий..."
                    />
                    <SubmitCommentButton onClick={handleCommentSubmit}>Отправить</SubmitCommentButton>
                </CommentsSection>
            </ContentWrapper>
            <SupportPopup />
        </MainFormWrapper>
    );
};

export default ProductPage;
