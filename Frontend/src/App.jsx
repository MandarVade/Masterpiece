import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthModal from './components/common/AuthModal';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Artists from './pages/Artists';
import ArtistDetail from './pages/ArtistDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <AuthModal />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/artist/:slug" element={<ArtistDetail />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;