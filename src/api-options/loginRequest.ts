import { AxiosRequestConfig } from 'axios'

export function LoginRequestOptions(
  name: string,
  password: string,
  URL: string
) {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: { username: name, password: password },
  }

  return options
}
