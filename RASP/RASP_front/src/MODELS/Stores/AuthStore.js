import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";

import {basicRequestPost} from "MODELS/Requests/basicRequestPost"
import {basicRequestGet} from "MODELS/Requests/basicRequestGet"

class AuthStoreClass {


};

const AuthStore = new AuthStoreClass();
export default AuthStore;
