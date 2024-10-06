'use client';

import { motion } from 'framer-motion';

export default function Loading({
  withTitle = true,
}: Readonly<{ withTitle?: boolean }>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        className="w-12 h-12 border-t-2 border-white dark:border-neutral-800 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.h1
        className="mt-8 text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.01, duration: 0.5 }}
      >
        {withTitle && 'Habit Loop'}
      </motion.h1>
    </div>
  );
}
