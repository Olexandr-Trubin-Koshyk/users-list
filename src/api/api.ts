import { User } from "../types";

const API_TOKEN = 'f4530e048cb703679687b94457701128b3439a269826740a450897a132b12a03';
const API_BASE_URL = 'https://gorest.co.in/';
const USERS_ENDPOINT = 'public/v1/users';

export const getUsers = async(query = (API_BASE_URL + USERS_ENDPOINT)) => {
  const result = await fetch(query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
  })
  .then(response => response.json())
    
  return result;
}

export const updateUser = async(user: User) => {
  await fetch(`${API_BASE_URL}${USERS_ENDPOINT}/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(user),
  })
}