import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css'
import '../style/Home.css'
const heroSlides = [
  {
    title: "Gaming Store",
    subtitle: "Upgrade your gaming gear",
    bg: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
  },
  {
    title: "Electronics Sale",
    subtitle: "Best Deals of the Month",
    bg: "https://wallpaperaccess.com/full/6424708.jpg",
  },
  {
    title: "Home & Kitchen",
    subtitle: "Stylize Your Space",
    bg: "https://www.appliancehero.co.uk/_next/image?url=https:%2F%2Fwww.wp.appliancehero.pomeg.dev%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-3-edited-1-1-scaled.jpg&w=1080&q=75",
  },
  {
    title: "Shoes & Sandles",
    subtitle: "Step Into Style and Comfort",
    bg: "https://wallpaperaccess.com/full/1597755.jpg",
  }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % heroSlides.length);
  const prevSlide = () => setCurrent((current - 1 + heroSlides.length) % heroSlides.length);

  const handleKeywordClick = (keyword) => {
    navigate("/customer_page", { state: { keyword } });
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
            <div className="logo">
              <span className="logo-text">Often Shopping</span>
        </div>
      
    <nav className="navigation">
      {/* Left-side navigation links */}
      <div className="nav-links">
        <Link to="/admin_sell" className="nav-item">Sell</Link>
        <Link to="/customer_service" className="nav-item">Customer Service</Link>
        <Link to="/join_delivery" className="nav-item">Join Delivery</Link>
      </div>

      {/* Right-side buttons and profile */}
      <div className="nav-buttons">
        <Link to="/customer_signup" className="nav-btn">Sign Up</Link>
        <Link to="/signin" className="nav-btn">Sign In</Link>
      </div>
    </nav>


      </header>
    <div className="container">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroSlides[current].bg})` }}>
        <div className="hero-content glass">
          <h1 className="hero-title">{heroSlides[current].title}</h1>
          <p className="hero-subtitle">{heroSlides[current].subtitle}</p>
        </div>
        <div className="hero-nav">
          <button className="hero-nav-btn prev" onClick={prevSlide}>‹</button>
          <button className="hero-nav-btn next" onClick={nextSlide}>›</button>
        </div>
      </section>

      {/* Info Banner */}
      <div className="india-banner glass">
        <p>You are on OftenShopping.com. You can also shop for millions of products with fast local delivery.</p>
      </div>

      {/* Category Section */}
      <div className="category-section">
        <section className="categories">

          {/* Mobiles */}
          <div className="category-card">
            <h3 className="category-title">Top Mobiles You Can Buy</h3>
            <div className="category-grid">
              <div className="category-item">
                <img src="https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-8-pro-1.jpg" alt="Redmi" onClick={() => handleKeywordClick("Redmi")} />
                <span>Redmi Note 8 Pro</span>
              </div>
              <div className="category-item">
                <img src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-1.jpg" alt="iPhone" onClick={() => handleKeywordClick("iPhone")} />
                <span>iPhone 14 Pro</span>
              </div>
              <div className="category-item">
                <img src="http://rukmini1.flixcart.com/image/300/300/xif0q/mobile/5/i/7/-original-imahfu766ybd5h4z.jpeg" alt="Samsung" onClick={() => handleKeywordClick("Samsung")} />
                <span>Samsung S24 Ultra</span>
              </div>
              <div className="category-item">
                <img src="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg" alt="OnePlus" onClick={() => handleKeywordClick("OnePlus")} />
                <span>OnePlus 12</span>
              </div>
            </div>
          </div>

          {/* Beauty */}
          <div className="category-card">
            <h3 className="category-title">Top Beauty Products</h3>
            <div className="category-grid">
              <div className="category-item">
                <img src="https://tse3.mm.bing.net/th/id/OIP.U0LtqBjKG7fcB93RRpt-jwHaER?pid=Api&P=0&h=180" alt="Skincare" onClick={() => handleKeywordClick("Skincare")} />
                <span>Skincare</span>
              </div>
              <div className="category-item">
                <img src="https://tse3.mm.bing.net/th/id/OIP.OHSVh-CBqK6ZXZTOfItNsAHaFi?pid=Api&P=0&h=180" alt="Makeup" onClick={() => handleKeywordClick("Makeup")} />
                <span>Makeup</span>
              </div>
              <div className="category-item">
                <img src="https://tse1.mm.bing.net/th/id/OIP.8RSXU8XFksOlqez-7q7VFwHaE8?pid=Api&P=0&h=180" alt="Hair Care" onClick={() => handleKeywordClick("Hair Care")} />
                <span>Hair Care</span>
              </div>
              <div className="category-item">
                <img src="https://tse4.mm.bing.net/th/id/OIP.ghQ6L-dp8i9mzjRjKD70ogHaFL?pid=Api&P=0&h=180" alt="Fragrances" onClick={() => handleKeywordClick("Fragrances")} />
                <span>Fragrances</span>
              </div>
            </div>
          </div>

          {/* Fashion */}
          <div className="category-card">
            <h3 className="category-title">Top Fashion Picks</h3>
            <div className="category-grid">
              <div className="category-item">
                <img src="https://tse3.mm.bing.net/th/id/OIP.nb0HlrFjbc9mOQCOIP0gcQHaFj?pid=Api&P=0&h=180" alt="Casual Wear" onClick={() => handleKeywordClick("Casual Wear")} />
                <span>Casual Wear</span>
              </div>
              <div className="category-item">
                <img src="https://tse3.mm.bing.net/th/id/OIP.w14-D1uZPXtMSN_I_T7txwHaHS?pid=Api&P=0&h=180" alt="Sports Wear" onClick={() => handleKeywordClick("Sports Wear")} />
                <span>Sports Wear</span>
              </div>
              <div className="category-item">
                <img src="https://purepng.com/public/uploads/large/purepng.com-women-dressfashion-women-dress-cloth-apparelclothingwomen-dress-631522326940onrfa.png" alt="Women Dress" onClick={() => handleKeywordClick("Women Dress")} />
                <span>Women Dress</span>
              </div>
              <div className="category-item">
                <img src="https://tse3.mm.bing.net/th/id/OIP.dTzlcg6yIN-fLnxL4_dAZgAAAA?pid=Api&P=0&h=180" alt="Kids Wear" onClick={() => handleKeywordClick("Kids Wear")} />
                <span>Kids Wear</span>
              </div>
            </div>
          </div>

          {/* Appliances */}
          <div className="category-card">
            <h3 className="category-title">Top Home Appliances</h3>
            <div className="category-grid">
              <div className="category-item">
                <img src="http://pluspng.com/img-png/microwave-hd-png-microwave-monitor-png-image-oven-hd-png-microwave-png-hd-1500.png" alt="Microwave" onClick={() => handleKeywordClick("Microwave")} />
                <span>Microwave</span>
              </div>
              <div className="category-item">
                <img src="https://tse3.mm.bing.net/th/id/OIP.vgAIbaHNq_eOeKq1t2zx6QHaE7?pid=Api&P=0&h=180" alt="Refrigerator" onClick={() => handleKeywordClick("Refrigerator")} />
                <span>Refrigerator</span>
              </div>
              <div className="category-item">
                <img src="https://img.freepik.com/premium-photo/washing-machine-with-white-background-high-quality_889056-17816.jpg?w=2000" alt="Washing Machine" onClick={() => handleKeywordClick("Washing Machine")} />
                <span>Washing Machine</span>
              </div>
              <div className="category-item">
                <img src="https://img.freepik.com/premium-photo/vacuum-cleaner-white-background_308643-2461.jpg?w=2000" alt="Vacuum Cleaner" onClick={() => handleKeywordClick("Vacuum Cleaner")} />
                <span>Vacuum Cleaner</span>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
    </div>
  );
}
