import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user !== null;
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/chat');
    }
  }, [navigate]);


  return (
    <main className="homePage_main">
      <div className="homePage">
        <div className="homePage_container">

        </div>
      </div>
    </main>
  );
}

export default HomePage;
