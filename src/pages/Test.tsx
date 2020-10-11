import React, { useState, useEffect } from 'react';
import { default as axiosInstance } from '../util/AxiosUtil';

const axios = axiosInstance.instance;

function Test() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setError(null);
      setUsers(null);
      setLoading(true);

      const response = await axios.get(
        '/test',
      );
      setUsers(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러발생</div>;
  if (!users) return null;

  return (
    <>
      {
        users
      }
    </>
  );
}

export default Test;
