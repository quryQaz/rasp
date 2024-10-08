import {basicAxios} from "./basicAxios"

export async function basicRequestGet(url, config = {}) {

  return basicAxios().get(url, config);
}
