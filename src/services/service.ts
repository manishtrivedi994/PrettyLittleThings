import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.API_URL;

export interface ApiResponse<T> {
  data: T;
}

class PLTApiService {
  private static instance: PLTApiService;
  private axiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
    });
  }

  public static getInstance(): PLTApiService {
    if (!PLTApiService.instance) {
      PLTApiService.instance = new PLTApiService();
    }
    return PLTApiService.instance;
  }

  public async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> =
        await this.axiosInstance.get(url);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PLTApiService;
