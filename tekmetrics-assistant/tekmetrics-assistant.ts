import { getTekmetricsAccessToken, getTekmetricsData } from './tekmetrics-api-client';

export class TekmetricsAssistant {
  private accessToken: string | null = null;

  constructor() {
    this.getAccessToken();
  }

  private async getAccessToken() {
    try {
      this.accessToken = await getTekmetricsAccessToken();
    } catch (error) {
      console.error('Error getting Tekmetrics access token:', error);
    }
  }

  async handleUserInput(input: string): Promise<string> {
    if (!this.accessToken) {
      return 'Unable to fetch Tekmetrics data. Please check your credentials.';
    }

    // Implement the logic to parse the user input and determine the appropriate API endpoint
    const endpoint = 'customers'; // Example endpoint

    try {
      const data = await getTekmetricsData(endpoint, this.accessToken);
      // Process the API response and generate a natural language response
      const response = `Here are the Tekmetrics ${endpoint} data: ${JSON.stringify(data)}`;
      return response;
    } catch (error) {
      console.error('Error fetching Tekmetrics data:', error);
      return 'An error occurred while fetching Tekmetrics data.';
    }
  }
}
