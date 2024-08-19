// plugins/api.js
import { useRuntimeConfig } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    const { BASE_URL } = useRuntimeConfig().public;
    console.log('API plugin loaded  : ', BASE_URL); 

    const apiFetch = async (url, options = {}) => {
        const { method = 'GET', body, headers = {}, params } = options;

        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';

        const defaultHeaders = {
            ...headers,
        };

        const fetchOptions = {
            method,
            body,
            headers: defaultHeaders,
            credentials: 'include',
            ...options,
        };

        try {
            const fullUrl = `${BASE_URL}${url}${queryString}`;
            const response = await $fetch(fullUrl, fetchOptions);
            return response; 
        } catch (error) {
            console.error('Error in apiFetch:', error.response._data );
            throw new Error(error.response?._data?.message || 'Login failed');
        }
    };

    nuxtApp.provide('customApi', {
        get: (url, options) => apiFetch(url, { ...options, method: 'GET' }),
        post: (url, body, options) => apiFetch(url, { ...options, method: 'POST', body }),
        patch: (url, body, options) => apiFetch(url, { ...options, method: 'PATCH', body }),
        put: (url, body, options) => apiFetch(url, { ...options, method: 'PUT', body }),
        delete: (url, options) => apiFetch(url, { ...options, method: 'DELETE' }),
    });
});
