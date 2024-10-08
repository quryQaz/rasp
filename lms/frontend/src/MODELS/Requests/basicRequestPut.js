import {basicAxios} from "./basicAxios"

export async function basicRequestPut(url, data, config = {}) {

  return basicAxios().put(url, data, config);
}
