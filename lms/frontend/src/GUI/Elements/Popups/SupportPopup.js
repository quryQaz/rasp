import React, { useState } from 'react';
import styled from "styled-components";
import GetColorCode from 'Utils/GetColorCode'

const Popup = styled.div`
    position: fixed;
    width: 300px;
    right: 20px; /* Позиционирование справа */
    bottom: 80px; /* Отступ снизу, учитывая высоту кнопки поддержки */
    background-color: white;
    border: 2px solid #000;
    padding: 20px;
    border-radius: 15px; /* Добавлены закруглённые углы */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 900;
`

const PopupInner = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
`

const Button = styled.button`
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    &:hover {
        background-color: #0056b3;
    }
`

const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    width: 100%;
    box-sizing: border-box;
`

const ButtonSend = styled.button`
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
    &:focus {
        outline: none;
    }
`

const ButtonStyle = {
  background: GetColorCode('orange'),
}


function SupportPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
     event.preventDefault();
     if (message) {
       fetch('http://localhost:8081/api/support/send', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ message: message })
       })
       .then(response => {
         if (response.ok) {
           return response.json();
         }
         throw new Error('Network response was not ok.');
       })
       .then(data => {
         console.log('Message sent:', data);
         setMessage("");  // Очистка поля ввода после отправки
       })
       .catch(error => {
         console.error('Ошибка при отправке сообщения:', error);
       });
     }
  };

  return (
    <div>
      <Button style={ButtonStyle} onClick={togglePopup}>🗨️</Button>
      {isOpen && (
        <Popup>
          <PopupInner>
            <h1>Служба поддержки</h1>
            <form onSubmit={handleSubmit}>
              <TextArea
                value={message}
                onChange={handleMessageChange}
                placeholder="Введите ваше сообщение..."
                rows="4"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <ButtonSend style={ButtonStyle} type="submit">Отправить</ButtonSend>
            </form>
          </PopupInner>
        </Popup>
      )}
    </div>
  );
}

export default SupportPopup;
