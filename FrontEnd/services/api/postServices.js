// services/authService.js
import useApi from '~/utils/api';

export const publishTweet = async (data) => {
    try {
      const response = await useApi().post('/tweet/create', data);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'failed to post your tweet !');
    }
  };


  export const fetchAllTweets = async () => {
    try {
      const response = await useApi().get('/tweet/tweets')
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'failed to fetch tweets !');
    }    
  };

  

  