import React from 'react';
import { observer, inject } from 'mobx-react';
import styled from "styled-components";

const Container = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 12px;
    right: 12px;
    width: 350px;
    z-index: 999999;
`;

const Body = styled.div`
  padding-left: 10px;
  font-size: 17px;
  background: red;
  margin-bottom: 10px;
  border-radius: 10px;
`

const Message = styled.div`
    width: 94%;
    padding: 20px 0px;
`

const Button = styled.button`
    float: right;
    height: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
`
// TODO: Добавить анимацию, сделать info, warning, error цвета, переписать ошибки и сообщения в уведомления
const Toast = inject('ToastStore')(observer( class extends React.Component {
  render() {
    const {ToastStore} = this.props;

    return (
        <Container>
        {
          ToastStore.list.map((toast, i) =>
            <Body key={i} >
                <Button onClick={() => {ToastStore.removeToast(i)}}>
                    &times;
                </Button>
                <Message>
                    {toast.message}
                </Message>
            </Body>
          )
      }
      </Container>
    );
  };

}));


export default function(props) {
  return <Toast {...props} />;
}
