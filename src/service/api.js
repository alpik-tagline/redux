import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      'https://api.escuelajs.co/api/v1/auth/login',
      {email, password},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Login error', error);
    throw error;
  }
};
