import React from 'react';
import styled from "styled-components";
import Arrow from "styles/icons/arrow"
import Menu from "styles/icons/menu"
import ButtonWithIcon from "GUI/Elements/Buttons/ButtonWithIcon"
import Button from "GUI/Elements/Buttons"
import Calendar from "GUI/Elements/Calendar"
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native-web';
import {basicRequestPost} from "MODELS/Requests/basicRequestPost"
import {config} from "Utils/Config"
import Select from 'react-select'
import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";
import "styles/alerts.css"

const ComponentWrapper = styled.div`
    margin: 0px;
    height: 100%;
    padding-top: 10px;
    position: relative;
`

const MainWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`

const TitleHeader = styled.div`
    width: 145px;
    height: 35px;
    padding: 0px 20px;
    margin: 5px 15px 5px 75px;
    text-align: center;
    font: small-caps bold 30px/1 sans-serif;
    color: white;
    float: left;
    border-bottom: 1px ridge white;
`

const ButtonWrapper = styled.div`
    width: 40px;
    padding: 0px 0px;
    float: left;
`

const ContentWrapper = styled.div`
    width: 100%;
    height: calc(100% - 115px);
    margin-top: 75px;
    padding-left: 35px;
`

const SelectWrapper = styled.div`
    width: 246px;
    margin: 5px 10px;
    font: small-caps 12px sans-serif;
`

const Input = styled.input`
    padding: 10px;
    margin: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 225px;
    height: 10px;
    font: small-caps 12px sans-serif;
`

const Alerts = (observer(class extends React.Component {

    constructor(props) {
        super(props);
    }

    clickAlert = (alert) => {
        this.props.changeActiveAlertState(alert);
        this.props.changeTab(8)
    }

    render() {
        return(
            <MainWrapper>
                <ComponentWrapper className={this.props.isActive ? "alerts-active" : "alerts"}>
                    <TitleHeader>
                    Menu
                    </TitleHeader>
                    <ButtonWrapper>
                        <ButtonWithIcon
                        label={''}
                        backgroundColorRGB={'rgba(21,21,21,1)'}
                        borderColor={'white'}
                        width={'35px'}
                        height={'35px'}
                        fontSize={'20px'}
                        borderRadius={'10px'}
                        margin={'0px 10px'}
                        icon={<Menu/>}
                        innerPadding={'0px 0px 0px 5px'}
                        onClick={this.props.changeAlertsState}
                        />
                    </ButtonWrapper>
                    { this.props.isActive &&
                        <ContentWrapper>
                            <Calendar filters={this.props.filters} search={this.props.search}/>
                            <Input
                              type="text"
                              placeholder="Поиск по эндпоинту"
                              value={this.props.filters.endpoint}
                              onChange={e => this.props.filters.setEndpoint(e.target.value)}
                              onBlur={this.props.search}
                            />
                            <Input
                              type="text"
                              placeholder="Поиск по запросу"
                              value={this.props.filters.query}
                              onChange={e => this.props.filters.setQuery(e.target.value)}
                              onBlur={this.props.search}
                            />
                            <SelectWrapper>
                                <Select
                                  components={components}
                                  options={options}
                                  placeholder="Поиск по критичности"
                                  value={this.props.filters.level}
                                  onChange={value => {
                                      this.props.filters.setLevel(value);
                                      this.props.search();
                                  }}
                                  styles={{
                                      control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '5px',
                                          minHeight: '32px',
                                          height: '32px',
                                      }),
                                  }}
                                />
                            </SelectWrapper>
                            <SelectWrapper style={{margin: '10px'}}>
                                <Select
                                  components={components}
                                  options={types}
                                  placeholder="Поиск по типу"
                                  value={this.props.filters.type}
                                  onChange={value => {
                                      this.props.filters.setType(value);
                                      this.props.search();
                                  }}
                                  styles={{
                                      control: (baseStyles, state) => ({
                                          ...baseStyles,
                                          borderRadius: '5px',
                                          minHeight: '32px',
                                          height: '32px',
                                      }),
                                  }}
                                />
                            </SelectWrapper>
                        </ContentWrapper>
                    }
                </ComponentWrapper>
            </MainWrapper>
        )
    }
}));

const components = {
  DropdownIndicator: null,
};

export default function(props) {
  return <Alerts {...props} />;
}

const options = [
  { value: 'Critical', label: 'Критическая' },
  { value: 'Medium', label: 'Средняя' },
  { value: 'Low', label: 'Маленькая' }
]

const types = [
  { value: 'SQLI', label: 'SQLI' },
  { value: 'XSS', label: 'XSS' },
  { value: 'SSTI', label: 'SSTI' },
  { value: 'Path Traversal', label: 'Path Traversal' }
]
