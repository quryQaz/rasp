import React, { useState, useEffect } from 'react';
import { observable, action, makeObservable } from "mobx";

class ToastStoreClass {

    list = []
    lastId = 1

    constructor() {
      makeObservable(this, {
        list: observable,
        addToast: action
      });
    };

    info = (message) => {
        this.addToast(message);
    };

    addToast = (message) => {
      let toastProperties = {
            id: this.lastId,
            message: message,
        };
        this.list = [...this.list, toastProperties];
        this.lastId++;
    }

    removeToast = (index) => {
        this.list.splice(index, 1);
    }

}
const ToastStore = new ToastStoreClass();
export default ToastStore;
