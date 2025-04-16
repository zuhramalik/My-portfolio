"use client"

import { motion } from "framer-motion"

export default function DeviceShowcase() {
  return (
    <div className="relative h-[200px] md:h-[250px] flex items-center justify-center">
      {/* Web Browser */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-0 md:left-[10%] top-1/2 transform -translate-y-1/2 z-10"
      >
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl w-[180px] md:w-[250px] border border-gray-700">
          <div className="bg-gray-900 h-6 flex items-center px-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto bg-gray-700 rounded-full h-3 w-24"></div>
          </div>
          <div className="relative h-[100px] md:h-[140px] bg-gradient-to-br from-pink-500/20 to-violet-500/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-xs md:text-sm font-medium">Web Development</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Phone */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute z-20"
      >
        <div className="bg-gray-800 rounded-[24px] overflow-hidden shadow-2xl w-[80px] md:w-[100px] h-[160px] md:h-[200px] border-4 border-gray-700">
          <div className="bg-black h-4 flex items-center justify-center">
            <div className="w-8 h-2 rounded-full bg-gray-800"></div>
          </div>
          <div className="relative h-full bg-gradient-to-br from-violet-500/20 to-pink-500/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-[8px] md:text-xs font-medium text-center">
                Mobile
                <br />
                Apps
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-700 rounded-full"></div>
        </div>
      </motion.div>

      {/* Tablet */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-0 md:right-[10%] top-1/2 transform -translate-y-1/2 z-10"
      >
        <div className="bg-gray-800 rounded-[16px] overflow-hidden shadow-2xl w-[140px] md:w-[180px] h-[180px] md:h-[220px] border-4 border-gray-700">
          <div className="relative h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-xs md:text-sm font-medium">Responsive Design</div>
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-700 rounded-full"></div>
        </div>
      </motion.div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
        <motion.path
          d="M 100,100 L 200,100 L 300,100"
          stroke="url(#gradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
