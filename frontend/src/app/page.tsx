'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // All useTransform hooks must be called unconditionally
  const orb1X = useTransform(springX, (x) => x * 0.1);
  const orb1Y = useTransform(springY, (y) => y * 0.1);
  const orb2X = useTransform(springX, (x) => x * -0.1);
  const orb2Y = useTransform(springY, (y) => y * 0.1);
  const orb3X = useTransform(springX, (x) => x * 0.1);
  const orb3Y = useTransform(springY, (y) => y * -0.1);

  const cardRotateX = useTransform(springY, [-300, 300], [5, -5]);
  const cardRotateY = useTransform(springX, [-300, 300], [-5, 5]);
  const cardX = useTransform(springX, (x) => x * 0.05);
  const cardY = useTransform(springY, (y) => y * 0.05);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position relative to center of screen
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        {/* Interactive gradient orbs */}
        <motion.div
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            x: orb1X,
            y: orb1Y,
          }}
        />
        <motion.div
          className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            x: orb2X,
            y: orb2Y,
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            x: orb3X,
            y: orb3Y,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Toaster position="top-center" />
        
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl"
                  style={{
                    x: cardX,
                    y: cardY,
                  }}
                />
                <div className="relative bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8">
                  <LoginForm />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-center text-black" 
                  >
                    Don&apos;t have an account?{' '}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLogin(false)}
                      className="text-black hover:text-blue-500 font-medium underline"
                    >
                      Register here
                    </motion.button>
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl"
                  style={{
                    x: cardX,
                    y: cardY,
                  }}
                />
                <div className="relative bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8">
                  <RegisterForm />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-center text-black"
                  >
                    Already have an account?{' '}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLogin(true)}
                      className="text-black hover:text-blue-500 font-medium underline"
                    >
                      Login here
                    </motion.button>
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
