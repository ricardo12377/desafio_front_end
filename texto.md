function FetchData() {
const options: AxiosRequestConfig = {
method: 'POST',
url: 'https://stoplight.io/mocks/mundo-wap-teste/react-developer-test---mundo-wap/39708592/users/login',
headers: {
'Content-Type': 'application/json',
Accept: 'application/json',
},
data: { username: 'm', password: '1' },
}

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })

}
