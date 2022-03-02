import Loader from '@components/elements/loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface PageLoaderProps {
  isVisible: boolean;
}

const PageLoader = ({ isVisible }: PageLoaderProps) => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="pageloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.1 }}
            className="fixed z-50 bg-white top-0 left-0 w-full h-screen flex justify-center items-center"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="loader"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed z-50 bg-white top-0 left-0 w-full h-screen flex justify-center items-center"
          >
            <Loader
              className="h-16 w-16"
              appearance="primary"
              strokeWidth={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageLoader;
