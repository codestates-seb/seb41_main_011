import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const api = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  timeout: 1000,
});

/*
  1. 요청 인터셉터를 작성합니다.
  2개의 콜백 함수를 받습니다.

  1) 요청 바로 직전 - 인자값: axios config
  2) 요청 에러 - 인자값: error
*/
api.interceptors.request.use(
  function (config) {
      // 요청 바로 직전
      // axios 설정값에 대해 작성합니다.
    const refreshToken = localStorage.getItem('refreshToken');
    api.defaults.headers.common.Authorization  = `Bearer ${accessToken}`
    api.defaults.headers.common.refreshToken  = `Bearer ${refreshToken}`
  
    return config;
  }, 
  function (error) {
      // 요청 에러 처리를 작성합니다.
      return Promise.reject(error);
  }
);

/*
  2. 응답 인터셉터를 작성합니다.
  2개의 콜백 함수를 받습니다.

  1) 응답 정성 - 인자값: http response
  2) 응답 에러 - 인자값: http error
*/
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
        const originalRequest = config;
        const refreshToken = await localStorage.getItem("refreshToken");
        // token refresh 요청
        axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
    
        const { data } = await axios.post(
          process.env.REACT_APP_DB_HOST + '/api/access-token/issue', // token refresh api 
        );
        // 새로운 토큰 저장
        const newAccessToken = data.accessToken
        const accessTokenExpireTime = data.accessTokenExpireTime
        await localStorage.setItem("accessToken",`${newAccessToken}`);
        await localStorage.setItem('accessTokenExpireTime',`${accessTokenExpireTime}`);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        api.defaults.headers.common.refreshToken  = `Bearer ${refreshToken}`

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
      return Promise.reject(error);
    },
);

// 생성한 인스턴스를 익스포트 합니다.
export default api;