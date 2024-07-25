const BASE_URL = "";

// Helper function to handle response
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error || 'Something went wrong.');
    }
    return response.json();
};

// Helper function to construct URL with query parameters
const constructURI = (path, params = null) => {
    const uri = new URL(path);
    if (params) {
        Object.keys(params).forEach(key => uri.searchParams.append(key, params[key]));
    }
    return uri;
}

// helper function to get bind headers values and return to exported methods
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    // Add authentication token if available
    const authtoken = localStorage.getItem('token');
    if (authtoken) {
        headers['Authorization'] = `Bearer ${authtoken}`;
    }
    return headers;
}

const apiService = {
    get: async (path, params) => {
        const url = constructURI(path, params);
        const res = await fetch(url, {
            method: "GET",
            headers: getHeaders()
        });
        return handleResponse(res);
    },
    post: async (path, data) => {
        const url = constructURI(path);
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers:getHeaders()
        });
        return handleResponse(res);
    },
    put: async (path, data) => {
        const url = constructURI(path);
        const response = await fetch(url, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(data),
        });
        return handleResponse(response);
      },
    
      delete: async (path) => {
        const url = constructURI(path);
        const response = await fetch(url, {
          method: 'DELETE',
          headers: getHeaders(),
        });
        return handleResponse(response);
      },
}

export default apiService;