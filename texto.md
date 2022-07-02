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

onClick={() => GetCheckedItems(id)}

<S.Header>
<S.SearchContainer>

<div onClick={() => RequestByName(param)}>
<AiOutlineSearch size={30} color="white" />
</div>
<input
placeholder="Procure pelo nome"
onChange={(e) => GetId(e.target.value)}
/>
</S.SearchContainer>

      <S.Buttons>
        <S.Action color="green" onClick={() => HandleEditStatus()}>
          Ativar
        </S.Action>
        <S.Action color="red" onClick={() => HandleEditStatus()}>
          Desativar
        </S.Action>
      </S.Buttons>
    </S.Header>

{detailedStore.name !== '' ? (
<ItemList
id={detailedStore.id}
name={detailedStore.name}
active={detailedStore.active}
func={() => GetCheckedItems(detailedStore.id)}
/>
) : (
stores.map((item, index) => {
return (
<ItemList
id={item.id}
name={item.name}
index={index}
active={item.active}
func={() => GetCheckedItems(item.id)}
/>
)
})
)}
