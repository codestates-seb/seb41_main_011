import axios from 'axios';
import moment from 'moment';



export const momentTest = async() =>{



  axios.defaults.headers.common['Authorization'] =localStorage.getItem('accessToken');
  let token = localStorage.getItem('refreshToken');
  let expiredTime = await moment.utc(localStorage.getItem('accessTokenExpireTime'));
  let curTime = await moment.utc()
  let diffTime: any = await moment.duration(curTime.diff(expiredTime)).asMilliseconds();

  
  if (diffTime < 960000) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('refreshToken');
    await axios
      .post(process.env.REACT_APP_DB_HOST + '/api/access-token/issue',token)
      .then(
        (res) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('accessTokenExpireTime');
          localStorage.setItem('accessToken', `${res.data.accessToken}`);
          localStorage.setItem('accessTokenExpireTime',`${res.data.accessTokenExpireTime}`);
          axios.defaults.headers.common['Authorization'] ='Bearer'+localStorage.getItem('accessToken');
          
        })
        // (err) => {

        //   // <Navigate to='./pages/login_general' />;
        // },
      
      }
    }

    axios.interceptors.request.use((config) => {
      if (!config.headers) return config;
    
      let token: string | null = null;
    
      if (config.url === process.env.REACT_APP_DB_HOST + '/api/access-token/issue') {
        token = localStorage.getItem('refreshToken');
      } else {
        token = localStorage.getItem('accessToken');
      }
    
      if(token !== null){
        config.headers.Authorization = `Bearer ${token}`;
      }
    
      return config;
    });