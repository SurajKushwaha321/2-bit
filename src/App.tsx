import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Flame, X } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setIsAdmin(true); // For demo purposes
    setShowLogin(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-black via-[#3D0E05] to-black h-64 w-full text-white">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between  items-center">
           
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <img src="./logo.png" alt=""  className='w-[140px]'/>
                
              </Link>
            </div>
            <div className='w-[350px]'></div>
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:text-orange-500">Home</Link>
              <Link to="/events" className="hover:text-orange-500">Events</Link>
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="hover:text-orange-500">Admin Dashboard</Link>
                  )}
                  <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 text-orange-500 hover:text-orange-400"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setShowSignUp(true)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/admin" 
            element={
              isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />
            } 
          />
        </Routes>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 w-full max-w-md relative">
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-8 text-orange-500">Login</h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-medium"
                >
                  Login
                </button>
                <p className="text-center text-gray-400">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => {
                      setShowLogin(false);
                      setShowSignUp(true);
                    }}
                    className="text-orange-500 hover:text-orange-400"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Sign Up Modal */}
        {showSignUp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 w-full max-w-md relative">
              <button 
                onClick={() => setShowSignUp(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-8 text-orange-500">Sign Up</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="admin"
                    className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="admin" className="text-sm text-gray-300">
                    Register as Admin (requires admin code)
                  </label>
                </div>
                <button className="w-full py-3 rounded bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-medium">
                  Sign Up
                </button>
                <p className="text-center text-gray-400">
                  Already have an account?{' '}
                  <button 
                    onClick={() => {
                      setShowSignUp(false);
                      setShowLogin(true);
                    }}
                    className="text-orange-500 hover:text-orange-400"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-around">
          <div className="max-w-xl">
            <span className="text-orange-500 font-medium text-xl mb-4 bg-[#473936] p-1 px-3 ">Welcome</span>
            <h1 className="text-6xl font-bold mb-6">The Fusion Club</h1>
            <p className="text-xl text-gray-300">
              Where innovation, creativity, and technology come together to build the future!
            </p>
          </div>
          <div className="hidden lg:block">
          

            <img 
              src="/image.png"
              alt="Robot Head"
              className="w-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="py-24 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCard
              title="Tech"
              event="Cgc"
              date="April 5, 2025"
              description="We are doing nothing in this, we will pass just time pass"
              category="Tech"
            />
            <EventCard
              title="Gaming"
              event="Game Design Challenge"
              date="November 29, 2023"
              description="Design and prototype a game in just 48 hours! Work in teams or solo to create something amazing."
              category="Gaming"
            />
            <EventCard
              title="Tech"
              event="AI Workshop"
              date="November 22, 2023"
              description="Learn the basics of artificial intelligence and machine learning in this hands-on workshop. No prior experience required!"
              category="Tech"
            />
          </div>
          <div className="text-center mt-12">
            <button className="text-orange-500 hover:text-orange-400">See More ›</button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-gray-300 mb-6">
            The Fusion Club is a dynamic community where innovation, creativity, and technology 
            collide to shape the future. We bring together passionate minds from diverse fields to 
            collaborate, learn, and build groundbreaking projects.
          </p>
          <p className="text-gray-300">
            Whether you're a coder, designer, or an innovator, Fusion Club is the place to connect, 
            grow, and push boundaries!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-orange-500 mb-6">@FusionClub</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function EventCard({ title, event, date, description, category }: { 
  title: string;
  event: string;
  date: string;
  description: string;
  category: string;
}) {
  return (
    <div className="bg-[#2a1212] rounded-lg overflow-hidden hover:bg-[#3a1818] transition-colors">
      <div className="h-48 bg-gradient-to-br from-orange-500/20 to-transparent" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-2xl font-bold mb-4">{event}</div>
        <div className="text-gray-400 mb-2">{date}</div>
        <p className="text-gray-300 mb-4">{description}</p>
        <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm">
          {category}
        </span>
      </div>
    </div>
  );
}

export default App;