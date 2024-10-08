import React from "react";
import styled from "styled-components";
import Sidebar from "GUI/Elements/Sidebar"
import Alerts from "GUI/Components/Dashboard/Alerts"
import {Filters} from "GUI/Components/Dashboard/Filters"
import {Header} from "GUI/Components/Dashboard/Components/Header"
import {Footer} from "GUI/Components/Dashboard/Components/Footer"
import {InfoLogs} from "GUI/Components/Dashboard/Components/InfoLogs"
import {basicRequestPost} from "MODELS/Requests/basicRequestPost"
import {config} from "Utils/Config"
import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";


const MainFormWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: absolute;
`

const PageWrapper = styled.div`
    height: 100%;
    padding-left: 340px;
    padding-right: 0px;
    width: 100%;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(15,15,15,1) 0%, rgba(20,20,20,1) 50%, rgba(40,40,40,1) 100%);
`
// background-color: #1e1e1e;
// background-image: url('https://uploads-ssl.webflow.com/5a9ee6416e90d20001b20038/635ac0a24a485ff0387c8448_horizontal%20(19).svg');

const AlertWrapper = styled.div`
    height: 100%;
    position: fixed;
    left: 0px;
    width: 330px;
    background-image: url('https://stonexpo.ru/upload/iblock/ad9/Starlight_Black_1.jpg');
`
const Dashboard = (observer(class extends React.Component {

  defaultState = {
    alertsOpen: false,
  };

  items = []
  filters = new Filters();

  constructor(props) {
      super(props);
      document.title = "Dashboard";
      this.state = this.defaultState;
      makeObservable(this, {
        items: observable,
        setItems: action
      });
      makeObservable(this, {
        filters: observable,
      });
      this.loadData();
  }

  setItems = (data) => this.items = data;

  loadData = () => {
      basicRequestPost(`${config.BACKEND_URL}/api/logs`, {filters: this.filters}).then((response) => {
          this.setItems(response.data.data);
          console.log(this.items);
      })
  }

  changeAlertsState = () => {
      this.setState({ alertsOpen : !this.state.alertsOpen });
  }


    render() {
        return (
            <MainFormWrapper>
                <AlertWrapper>
                    <Alerts
                        filters={this.filters}
                        changeAlertsState={this.changeAlertsState}
                        isActive={this.state.alertsOpen}
                        search={this.loadData}
                    />
                </AlertWrapper>
                <PageWrapper>
                    <Header label={"Logs"}/>
                    <InfoLogs items={this.items} filters={this.filters}/>
                    <Footer/>
                </PageWrapper>
            </MainFormWrapper>
        )
    }

}));

export default function(props) {
  return <Dashboard {...props} />;
}
