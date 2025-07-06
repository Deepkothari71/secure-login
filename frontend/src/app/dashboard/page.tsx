'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

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
    <ProtectedRoute>
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
              x: useTransform(springX, (x) => x * 0.1),
              y: useTransform(springY, (y) => y * 0.1),
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
              x: useTransform(springX, (x) => x * -0.1),
              y: useTransform(springY, (y) => y * 0.1),
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
              x: useTransform(springX, (x) => x * 0.1),
              y: useTransform(springY, (y) => y * -0.1),
            }}
          />
        </div>

        {/* Content */}
        <div className="relative min-h-screen p-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                rotateX: useTransform(springY, [-300, 300], [5, -5]),
                rotateY: useTransform(springX, [-300, 300], [-5, 5]),
              }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-xl"
                style={{
                  x: useTransform(springX, (x) => x * 0.05),
                  y: useTransform(springY, (y) => y * 0.05),
                }}
              />
              <div className="relative bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 mt-8">
                <div className="flex justify-between items-center mb-8">
                  <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    Welcome, {user?.name}!
                  </motion.h1>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/50 backdrop-blur-sm rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="text-lg font-medium text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-lg font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 