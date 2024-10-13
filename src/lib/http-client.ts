import { BACKEND_URL } from '@/constants/constants';

export class HttpClient {
  public static instance: HttpClient;
  private readonly baseUrl: string;
  private headers: HeadersInit;
  constructor(baseUrl: string, headers: HeadersInit = {}) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }
  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || `Error: ${response.status} ${response.statusText}`,
      );
    }
    return data;
  }
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers,
      cache: 'force-cache',
    });
    return this.handleResponse<T>(response);
  }
  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }
  public static getInstance(baseUrl: string, headers: HeadersInit = {}) {
    if (!this.instance) {
      HttpClient.instance = new HttpClient(baseUrl, headers);
    }
    return HttpClient.instance;
  }
  public setBearer(token: string) {
    this.headers = { ...this.headers, Authorization: `Bearer ${token}` };
  }
}
export const httpClient = HttpClient.getInstance(BACKEND_URL);
