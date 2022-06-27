export const API_TOKEN = 'f4530e048cb703679687b94457701128b3439a269826740a450897a132b12a03';
const API_URL = 'https://gorest.co.in/public/v1/users';

export const getUsers = async (query = API_URL) => {
  try {
    const response = await fetch(query);
    const result = await response.json();
    return result;
  } catch (error) {
    alert(error);
  }
}