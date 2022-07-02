import { AxiosRequestConfig } from 'axios'
export function FetchAllDataOptions(URL: string, token: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + token,
    },
  }

  return options
}
