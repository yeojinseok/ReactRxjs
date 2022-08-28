// const API_KEY = '10923b261ba94d897ac6b81148314a3f'
const BASE_PATH = process.env.REACT_APP_SERVER

interface SignupInterface {
  id: string
  name: string
  password: string
}
export function SignupApi(data: SignupInterface) {
  const response = fetch(`${BASE_PATH}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: data.id,
      password: data.password,
      name: data.name,
    }),
  }).then(response => response.json())

  return response
}
