import axios from 'axios';
import { observable } from "mobx";
import _get from 'lodash/get';

class ConfigStore {

    loaded = false
    config = {}

    load = () => {
      return axios.get('/config.json').then(response => {
          this.config = response.data;
          this.loaded = true;
      })
    }

    get BACKEND_URL() {
        return this.config['BackendUrl'];
    }
}

let config = new ConfigStore();

export { config }
