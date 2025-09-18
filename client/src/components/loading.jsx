import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'   // or 'react-toastify'

const Loading = () => { 
  const { navigate } = useAppContext();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get('next');
  const notify = query.get('notify');

  useEffect(() => {
    let notifyTimer, navTimer;

    if (notify) {
      // show toast after 1 second
      notifyTimer = setTimeout(() => {
        toast.success(notify.replace(/\+/g, " "));
      }, 1000);
    }

    if (nextUrl) {
      // navigate after 2 seconds
      navTimer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 2500);
    }

    return () => {
      clearTimeout(notifyTimer);
      clearTimeout(navTimer);
    };
  }, [nextUrl, notify, navigate]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-38 w-38 border-8 border-gray-300 border-t-primary'></div>
    </div>
  )
}

export default Loading
