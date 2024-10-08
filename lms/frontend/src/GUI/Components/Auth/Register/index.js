import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";

import Input from "GUI/Elements/Input"
import Button from "GUI/Elements/Buttons"
import GetColorCode from 'Utils/GetColorCode'
import Box from "GUI/Elements/Box"
import {basicRequestPost} from "MODELS/Requests/basicRequestPost"
import {config} from "MODELS/Stores/ConfigStore"


const MainWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const FormTopTextWrapper = styled.div`
    width: 80%;
    height: 20%;
    margin-top: 10%;
    margin-left: 10%;
`

const FormBottomTextWrapper = styled.div`
    left: 0;
    right: 0;
    text-align: center;
    position: absolute;
    bottom: 0;
`

const ErrorWrapper = styled.div`
    left: 0;
    right: 0;
    text-align: center;
    bottom: 0;
    font-size: 20px;
    color: red;
`

const RegisterTextStyle = {
  color: GetColorCode('blue'),
  fontSize: '30px',
  fontWeight: 'bold',
  marginBottom: '0px'
};

const LinkStyle = {
  fontWeight: 'bold',
  color: GetColorCode('orange'),
}

const Register = observer(class extends React.Component {

    error = '';

    constructor() {
      makeObservable(this, {
        error: observable
      });
      document.title = "Register";
      this.state={
        email:'',
        username:'',
        password:''
      }
    }

    validateEmail = () => {
      return String(this.state.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    validate = () => {
      if ( !this.state.username ) {
        this.error = 'Введите имя пользователя'
        return false;
      }
      if ( !this.state.password ) {
        this.error = 'Введите пароль'
        return false;
      }
      if (!this.validateEmail()) {
        this.error = 'Невалидный email'
        return false;
      }
      return true;
    }

    handleSubmit = () => {
      if (!this.validate()) {
        return;
      }

      const data = this.state;

      basicRequestPost('/api/register', data).then( (response) => {
        if (!response.data.error) {
          this.props.navigation('/login')
        }
        else {
          console.log(response);
          // this.error = response.response.data.message;
        }
      } ).catch( (response) => {
        console.log(response);
        // this.error = response.response.data.message;
      });
    }

    render() {
        return (
          <MainWrapper>
            <Box
              width={'25%'}
              height={'70%'}
              margin={'8% 0 0 8%'}
              border-radius={'25px'}
              borderColor={'black'}
              relative
              minWidth={'340px'}
            >
                <FormTopTextWrapper>
                    <p style={RegisterTextStyle}> Регистрация </p>
                    <p style={{marginBottom: '0px', fontSize: '14px'}}> Создайте аккаунт для доступа к Магазину</p>
                </FormTopTextWrapper>
                <form action="">
                    <Input
                      label={'Email'}
                      placeholder={'Email'}
                      id={'email'}
                      mainWidth={'80%'}
                      borderRadius={'10px'}
                      innerPadding={'20px 15px'}
                      margin={'10px auto'}
                      onChange={value => this.setState({email:value})}
                      value={this.state.email}
                    />
                    <Input
                      label={'Имя пользователя'}
                      placeholder={'Имя'}
                      id={'username'}
                      mainWidth={'80%'}
                      borderRadius={'10px'}
                      innerPadding={'20px 15px'}
                      margin={'10px auto'}
                      onChange={value => this.setState({username:value})}
                      value={this.state.username}
                    />
                    <Input
                      label={'Пароль'}
                      placeholder={'Пароль'}
                      id={'password'}
                      mainWidth={'80%'}
                      borderRadius={'10px'}
                      innerPadding={'20px 15px'}
                      margin={'10px auto'}
                      onChange={value => this.setState({password:value})}
                      value={this.state.password}
                    />
                    <Button
                      disabled={false}
                      onClick={this.handleSubmit}
                      label={'Регистрация'}
                      width={"80%"}
                      backgroundColor={'orange'}
                      margin={'20px auto'}
                      fontSize={'15px'}
                      innerPadding={'10px'}
                    />
                </form>
                {
                  this.error ?
                  <ErrorWrapper>
                  {this.error}
                  </ErrorWrapper> : null
                }
                <FormBottomTextWrapper>
                    <p>Уже есть аккаунт? &nbsp;&nbsp;&nbsp;
                      <a href="login" style={LinkStyle}>Войти</a>
                    </p>
                </FormBottomTextWrapper>
            </Box>
          </MainWrapper>
        )
    }

})

export default function(props) {
  const navigation = useNavigate();

  return <Register {...props} navigation={navigation} />;
}
