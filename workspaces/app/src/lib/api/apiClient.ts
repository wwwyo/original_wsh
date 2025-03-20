const BASE_URL = process.env['API_URL'] || '/';

const createFetchClient = () => {
  const fetchWithConfig = async (url: string, options: RequestInit = {}) => {
    const finalUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(finalUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return {
    delete: <T>(url: string, options: RequestInit = {}) =>
      fetchWithConfig(url, { method: 'DELETE', ...options }) as Promise<T>,
    get: <T>(url: string, options: RequestInit = {}) =>
      fetchWithConfig(url, { method: 'GET', ...options }) as Promise<T>,
    post: <T>(url: string, data?: unknown, options: RequestInit = {}) =>
      fetchWithConfig(url, { body: data ? JSON.stringify(data) : undefined, method: 'POST', ...options }) as Promise<T>,
    put: <T>(url: string, data?: unknown, options: RequestInit = {}) =>
      fetchWithConfig(url, { body: data ? JSON.stringify(data) : undefined, method: 'PUT', ...options }) as Promise<T>,
  };
};

export const apiClient = createFetchClient();
