const BASE_URL = "http://localhost:3000";

async function coreFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  if (response.status === 204) return null;
  return response.json();
}

export const publicFetch = {
  get: async (path: string, options: RequestInit = {}) => {
    return coreFetch(path, { ...options, method: "GET" });
  },

  post: async (path: string, body: any, options: RequestInit = {}) => {
    return coreFetch(path, {
      ...options,
      method: "POST", // triggered by publicFetch.post()
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
  },

  put: async (path: string, body: any, options: RequestInit = {}) => {
    return coreFetch(path, {
      ...options,
      method: "PUT", // triggered by publicFetch.put()
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
  },

  delete: async (path: string, options: RequestInit = {}) => {
    return coreFetch(path, { ...options, method: "DELETE" });
  },
};
