import {basicAxios} from "./basicAxios"

export async function basicRequestPost(url, data, config = {}) {

  return basicAxios().post(url, data, config);
}
