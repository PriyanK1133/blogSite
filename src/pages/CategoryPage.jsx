import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

function CategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.pathname.split('/').at(-1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-x-1">
      <Header/>
      <div>
        <button onClick={()=>navigate(-1)}>Back</button>
      </div>
      <h2>
        Blogs on <span>{category}</span>
      </h2>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default CategoryPage