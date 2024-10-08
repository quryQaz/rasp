import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";

import {basicRequestPost} from "MODELS/Requests/basicRequestPost"
import {basicRequestGet} from "MODELS/Requests/basicRequestGet"

class AuthStoreClass {

    user = null;
    roles = [];
    permissions = [];

    constructor() {
      makeObservable(this, {
        user: observable,
        roles: observable,
        permissions: observable,
        setUser: action,
        setRoles: action,
        setPermissions: action,
        clearData: action
      });

      this.user = null;
      this.roles = [];
      this.permissions = [];
    };

    setUser = (data) => {
        this.user = data;
    };

    setRoles = (data) => {
        this.roles = data;
    };

    setPermissions = (data) => {
        this.permissions = data;
    };

    clearData = () => {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        this.user = null;
        this.roles = [];
        this.permissions = [];
    };

    login(login, password) {

        this.clearData();

        const data = {
          username: login,
          password: password
        }

        return basicRequestPost('/api/login', data).then( (response) => {
          if (!response.data.error) {
              window.localStorage.setItem('accessToken', response.data.data.access_token);
              window.localStorage.setItem('refreshToken', response.data.data.refresh_token);
              this.fillAuthData();
          }
          else {
              console.warn(response);
          }
          return response;
        } ).catch( (error) => {
            console.error(error);
            throw error;
        });
    };

    fillAuthData = () => {
      return basicRequestGet('/api/user/info').then( (response) => {
        // дописать заполнение полей о юзере, для этого нужно еще добавить хедеры в запрос
      } ).catch( (error) => {
          console.error(error);
          throw error;
      });
    }

};

const AuthStore = new AuthStoreClass();
export default AuthStore;
