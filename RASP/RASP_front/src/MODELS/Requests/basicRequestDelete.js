import {basicAxios} from "./basicAxios"

export async function basicRequestDelete(url, config = {}) {

  return basicAxios().delete(url, config);
}
