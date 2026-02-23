import { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

import { useNavigate } from 'react-router';
const user = {
   first_name: 'John',
   last_name: 'Doe',
   email: 'John@gmail.com',
   role: 'admin',
   profile_image: 'https://randomuser.me/api/portraits',
   logout: () => {
      console.log('Log out');
   },
};
const Header = () => {
   const navigate = useNavigate();
   //   const { user, logout } = useAuth();
   const handleLogout = async () => {
      await user.logout();
      navigate('/login');
   };

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const navItems = [{ label: 'Home', href: '/' }];

   return (
      <header
         className={`fixed top-0 w-full z-50 transition-all duration-300 bg-black shadow-2xl`}
      >
         <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded-lg">
                     <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                     IRON<span className="text-red-600">FORGE</span>
                  </span>
               </div>

               <nav className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                     <a
                        key={item.label}
                        href={item.href}
                        className="text-white font-medium transition-colors hover:text-red-600 relative group"
                     >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                     </a>
                  ))}

                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                     JOIN NOW
                  </button>
               </nav>

               <button
                  className="md:hidden text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle menu"
               >
                  {isMenuOpen ? (
                     <X className="h-6 w-6" />
                  ) : (
                     <Menu className="h-6 w-6" />
                  )}
               </button>
            </div>

            {isMenuOpen && (
               <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800 py-4">
                  {navItems.map((item) => (
                     <a
                        key={item.label}
                        href={item.href}
                        className="block px-6 py-3 text-white hover:text-red-600 hover:bg-gray-900 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                     >
                        {item.label}
                     </a>
                  ))}
                  <div className="px-6 pt-2">
                     <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                        JOIN NOW
                     </button>
                  </div>
               </div>
            )}
         </div>
      </header>
   );
};

export default Header;
