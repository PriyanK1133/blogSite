import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import TagPage from './pages/TagPage';
import CategoryPage from './pages/CategoryPage';
import { AppContext } from './context/AppContext'
import { useContext, useEffect } from "react";


export default function App() {

  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams, setSearchParam] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get('page') ?? 1;

    if (location.pathname.includes('tags')) {
      const tag = location.pathname.split('/').at(-1).replaceAll('-', ' ');    //web-development - aa token remove karava
      fetchBlogPosts(Number(page), tag);
    }

    else if (location.pathname.includes('categories')) {
      const category = location.pathname.split('/').at(-1).replaceAll('-', ' ');
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/categories/:category" element={<CategoryPage />} />
    </Routes>

  );
}



async function getLocationName(latitude, longitude) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();
    
    // Extract location name from response
    const locationName = data.display_name;
    alert(locationName);
    return locationName;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(position => {

    getLocationName(position.coords.latitude, position.coords.longitude)
  .then(locationName => console.log('Location:', locationName));
    console.log('Latitude is :', position.coords.latitude);
    console.log('Longitude is :', position.coords.longitude);
  });
}
