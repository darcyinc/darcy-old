let defaultOptions: {
  baseURL: string;
  headers?: {
    Authorization: string;
  };
} = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: '',
  },
};

function updateToken() {
  const token = localStorage.getItem('token');
  defaultOptions = {
    ...defaultOptions,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
}

if (typeof window !== 'undefined') {
  updateToken();

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', () => updateToken());
  }
}

export async function request(path: `/${string}`, options?: RequestInit) {
  if (options?.body) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  }

  const req = await fetch(`${defaultOptions.baseURL}${path}`, {
    ...defaultOptions,
    ...options,
  });

  // If content-type is application/json, parse the response as JSON
  const contentType = req.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    const data = await req.json();
    return { ...req, data };
  }

  // Otherwise, return the response as text
  const text = await req.text();
  return { ...req, data: text };
}

export const get = async (path: `/${string}`) => request(path);

export const post = async (path: `/${string}`, body?: any) => {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export default {
  get,
  post,
};
