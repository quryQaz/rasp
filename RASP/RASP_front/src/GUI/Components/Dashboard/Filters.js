import { observable, makeObservable, action } from "mobx";

const options = {
  timeZone: 'Europe/Moscow', // Таймзона +03:00
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit',
  hour12: false // 24-часовой формат времени
};

export class Filters {

    type = '';
    level = '';
    query = '';
    endDate = '';
    endpoint = '';
    startDate = '';

    constructor(props) {
        makeObservable(this, {
          level: observable,
          setLevel: action
        });
        makeObservable(this, {
          type: observable,
          setType: action
        });
        makeObservable(this, {
          query: observable,
          setQuery: action
        });
        makeObservable(this, {
          endDate: observable,
          setEndDate: action
        });
        makeObservable(this, {
          endpoint: observable,
          setEndpoint: action
        });
        makeObservable(this, {
          startDate: observable,
          setStartDate: action
        });
    }

    setType = (value) => {
        this.type = value;
    }

    setLevel = (value) => {
        this.level = value;
    }

    setQuery = (value) => {
        this.query = value;
    }

    setEndDate = (value) => {
        const date = new Date(value);
        this.endDate = date.toLocaleString('ru-RU', options).replace(/\,/g, '');
    }

    setEndpoint= (value) => {
        this.endpoint = value;
    }

    setStartDate = (value) => {
        const date = new Date(value);
        this.startDate = date.toLocaleString('ru-RU', options).replace(/\,/g, '');
    }

    reset = () => {
        this.type = '';
        this.level = '';
        this.query = '';
        this.endDate = '';
        this.endpoint = '';
        this.startDate = '';
    }
}
