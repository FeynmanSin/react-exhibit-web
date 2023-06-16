import { useState, useEffect } from 'react'

// const axios = window.axios;

// todo: 请求hooks
const useRequest = (url: string, immediate: boolean = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resData, setResData] = useState<any>();
  useEffect(() => {
    if (immediate) {
      get();
    }
  }, [url]);

  const get = async () => {
    // const res = await axios.get(url);
    // console.log('>>>>>>111', res);
    setIsLoading(false);
  }

  const post = (data: object) => {

  }
  const put = async (data: object) => {

  }

  return { isLoading, resData, get, post, put }
}

export default useRequest