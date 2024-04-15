import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

function TagPage() {
  const location = useLocation();
  const navigation = useNavigate();
  const tag= location.pathname.split('/').at(-1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-x-1">
      <Header/>
      <div>
        <button onClick={()=>navigation(-1)}>Back</button>
      </div>
      <h2>Blogs Tagged <span>#{tag}</span></h2>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default TagPage