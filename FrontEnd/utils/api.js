// utils/api.js
const useApi = () => {
    const { BASE_URL } = useNuxtApp().$config.public;    

    const apiFetch = async (url, options = {}) => {
        const { method = 'GET', body, headers = {}, params } = options;

        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        const token = useCookie('token').value
        const defaultHeaders = {
            authorization : `Bearer ${token}`,
            ...headers,
        };

        const fetchOptions = {
            method,
            body,
            headers: defaultHeaders,
            ...options,
        };

        try {
            const fullUrl = `${BASE_URL}${url}${queryString}`;
            const response = await $fetch(fullUrl, fetchOptions);
            return response; 
        } catch (error) {
            console.error('Error in apiFetch:', error.response);
            throw new Error(error.response._data.message || 'An error occurred');
        }
    };

    return {
        get: (url, options) => apiFetch(url, { ...options, method: 'GET' }),
        post: (url, body, options) => apiFetch(url, { ...options, method: 'POST', body }),
        patch: (url, body, options) => apiFetch(url, { ...options, method: 'PATCH', body }),
        put: (url, body, options) => apiFetch(url, { ...options, method: 'PUT', body }),
        delete: (url, options) => apiFetch(url, { ...options, method: 'DELETE' }),
    };
};

export default useApi;
