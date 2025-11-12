import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Copy, RotateCcw, Check } from 'lucide-react';
import { caesarEncrypt, caesarDecrypt } from '../utils/caesar';

interface CaesarToolProps {
  darkMode: boolean;
}

const CaesarTool = ({ darkMode }: CaesarToolProps) => {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inputText) {
      const output = mode === 'encrypt'
        ? caesarEncrypt(inputText, shift)
        : caesarDecrypt(inputText, shift);
      setResult(output);
    } else {
      setResult('');
    }
  }, [inputText, shift, mode]);

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInputText('');
    setResult('');
    setShift(3);
  };

  const handleShiftInput = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 25) {
      setShift(num);
    } else if (value === '') {
      setShift(3);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className={`backdrop-blur-lg rounded-3xl p-8 shadow-2xl border ${
        darkMode
          ? 'bg-gray-800/50 border-purple-500/30'
          : 'bg-white/70 border-purple-300/50'
      }`}>
        <div className="mb-8">
          <label
            className={`block text-sm font-semibold mb-3 ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Enter Your Text
          </label>
          <motion.textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className={`w-full h-32 px-4 py-3 rounded-xl text-lg resize-none transition-all duration-300 ${
              darkMode
                ? 'bg-gray-900/80 text-white border-2 border-purple-500/50 focus:border-purple-400'
                : 'bg-white text-gray-900 border-2 border-purple-300 focus:border-purple-500'
            } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div className="mb-8">
          <label
            className={`block text-sm font-semibold mb-3 ${
              darkMode ? 'text-purple-300' : 'text-purple-700'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Shift Value
          </label>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <motion.input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500"
                whileHover={{ scale: 1.01 }}
                style={{
                  background: `linear-gradient(to right, ${
                    darkMode ? '#a855f7' : '#9333ea'
                  } 0%, ${darkMode ? '#3b82f6' : '#2563eb'} 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>1</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>25</span>
              </div>
            </div>

            <motion.input
              type="number"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => handleShiftInput(e.target.value)}
              className={`w-20 px-4 py-2 rounded-xl font-bold text-lg text-center transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-900/80 text-white border-2 border-purple-500/50 focus:border-purple-400'
                  : 'bg-white text-gray-900 border-2 border-purple-300 focus:border-purple-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <motion.button
            onClick={() => setMode('encrypt')}
            className={`flex-1 min-w-[140px] py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
              mode === 'encrypt'
                ? darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-400/50'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={
              mode === 'encrypt'
                ? {
                    boxShadow: darkMode
                      ? [
                          '0 10px 30px rgba(168, 85, 247, 0.5)',
                          '0 10px 40px rgba(168, 85, 247, 0.7)',
                          '0 10px 30px rgba(168, 85, 247, 0.5)',
                        ]
                      : [
                          '0 10px 20px rgba(168, 85, 247, 0.4)',
                          '0 10px 30px rgba(168, 85, 247, 0.6)',
                          '0 10px 20px rgba(168, 85, 247, 0.4)',
                        ],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Lock className="w-5 h-5 inline-block mr-2" />
            Encrypt
          </motion.button>

          <motion.button
            onClick={() => setMode('decrypt')}
            className={`flex-1 min-w-[140px] py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
              mode === 'decrypt'
                ? darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-400/50'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={
              mode === 'decrypt'
                ? {
                    boxShadow: darkMode
                      ? [
                          '0 10px 30px rgba(59, 130, 246, 0.5)',
                          '0 10px 40px rgba(59, 130, 246, 0.7)',
                          '0 10px 30px rgba(59, 130, 246, 0.5)',
                        ]
                      : [
                          '0 10px 20px rgba(59, 130, 246, 0.4)',
                          '0 10px 30px rgba(59, 130, 246, 0.6)',
                          '0 10px 20px rgba(59, 130, 246, 0.4)',
                        ],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Unlock className="w-5 h-5 inline-block mr-2" />
            Decrypt
          </motion.button>

          <motion.button
            onClick={handleReset}
            className={`py-4 px-6 rounded-xl font-bold text-lg ${
              darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <label
                className={`block text-sm font-semibold mb-3 ${
                  darkMode ? 'text-purple-300' : 'text-purple-700'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Result
              </label>
              <motion.div
                className={`relative w-full min-h-[120px] px-4 py-3 rounded-xl text-lg ${
                  darkMode
                    ? 'bg-gray-900/80 text-white border-2 border-purple-500/50'
                    : 'bg-white text-gray-900 border-2 border-purple-300'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                animate={{
                  boxShadow: darkMode
                    ? [
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 30px rgba(168, 85, 247, 0.5)',
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                      ]
                    : [
                        '0 0 10px rgba(168, 85, 247, 0.2)',
                        '0 0 20px rgba(168, 85, 247, 0.3)',
                        '0 0 10px rgba(168, 85, 247, 0.2)',
                      ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="break-words">{result}</p>
              </motion.div>

              <motion.button
                onClick={handleCopy}
                className={`mt-4 w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  copied
                    ? darkMode
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 text-white'
                    : darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 inline-block mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 inline-block mr-2" />
                    Copy Result
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CaesarTool;
