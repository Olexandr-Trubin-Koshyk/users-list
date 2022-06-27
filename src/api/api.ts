import { User } from "../types";

const API_TOKEN = 'f4530e048cb703679687b94457701128b3439a269826740a450897a132b12a03';
const API_BASE_URL = 'https://gorest.co.in/public/v1/users';

export const getUsers = async(query = API_BASE_URL) => {
  console.log(`GetUsers from API`);
  
  try {
    const response = await fetch(query);
    const result = await response.json();
    return result;
  } catch (error) {
    alert(error);
  }
}

export const updateUser = async(user: User) => {
  console.log(`UpdateUser from API`);
  await fetch(`${API_BASE_URL}/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(user),
  })
}