import { AxiosRequestConfig } from 'axios'
import { EditStatusType } from '../types/editStatusType'

export function EditStatusOptions(
  URL: string,
  token: string,
  body: EditStatusType
) {
  const options: AxiosRequestConfig = {
    method: 'PUT',
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer' + token,
    },
    data: { ids: body.ids, active: body.active },
  }
  return options
}
