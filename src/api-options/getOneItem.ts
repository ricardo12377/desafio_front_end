import { AxiosRequestConfig } from 'axios'

export function GetOneItemOptions(URL: string, token: string, param: number) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: URL + param,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + token,
    },
  }
  return options
}
