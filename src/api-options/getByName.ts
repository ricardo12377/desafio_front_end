import { AxiosRequestConfig } from 'axios'

export function GetByNameOptions(URL: string, param: string, token: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: URL,
    params: { name: param },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + token,
    },
  }

  return options
}
