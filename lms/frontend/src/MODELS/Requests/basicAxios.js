import axios from 'axios';
import {config} from "MODELS/Stores/ConfigStore"

const basicAxios = () => {

  const conf = {
      baseURL: config.BACKEND_URL
  };

  return axios.create(conf);

};

export { basicAxios }
