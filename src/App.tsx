import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import CaesarTool from './components/CaesarTool';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <ParticleBackground darkMode={darkMode} />

      <div className="relative z-10">
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed top-6 right-6 p-3 rounded-full ${
            darkMode
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-900 shadow-lg'
          }`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>

        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <motion.h1
              className={`text-6xl md:text-7xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              animate={{
                textShadow: darkMode
                  ? [
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                      '0 0 40px rgba(168, 85, 247, 0.8)',
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                    ]
                  : [
                      '0 0 10px rgba(147, 51, 234, 0.3)',
                      '0 0 20px rgba(147, 51, 234, 0.5)',
                      '0 0 10px rgba(147, 51, 234, 0.3)',
                    ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="inline-block mr-4">🔐</span>
              Caesar Cipher
              <br />
              Encryptor & Decryptor
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`text-xl md:text-2xl ${
                darkMode
                  ? 'text-purple-300'
                  : 'text-purple-700'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Secure your text with ancient encryption!
            </motion.p>
          </motion.div>

          <CaesarTool darkMode={darkMode} />

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`text-center mt-16 pb-8 text-lg ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Made with ❤️ by Archit
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default App;
