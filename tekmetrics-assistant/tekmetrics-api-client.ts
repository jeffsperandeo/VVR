import axios from 'axios';

const API_BASE_URL = 'https://sandbox.tekmetric.com/api/v1';
const CLIENT_ID = 'RT8YJmkQBqqQ-RnX';
const CLIENT_SECRET = 'shd5Slfr1ducEnBEqmhRNmbZ';

export const getTekmetricsAccessToken = async () => {
  const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const base64Auth = Buffer.from(authString).toString('base64');

  try {
    const response = await axios.post(
      `${API_BASE_URL}/oauth/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Basic ${base64Auth}`,
        },
      }
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error('Error getting Tekmetrics access token:', error);
    throw error;
  }
};

export const getTekmetricsData = async (endpoint: string, accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching Tekmetrics data:', error);
    throw error;
  }
};
