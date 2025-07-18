'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/app/settings-context';
import clsx from 'clsx';

const RouteTransition = () => {
  const pathname = usePathname();
  const { isDark } = useSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500',
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      )}
    >

      <div className="relative flex flex-col items-center">
        {/* Main logo animation container */}
        <div className="relative mb-8">
          {/* Outer glow ring */}
          
          {/* Middle ring */}
          <div className={clsx(
            'absolute inset-2 rounded-full animate-spin-reverse',
            isDark 
              ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-400' 
              : 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-500',
            'blur-lg opacity-40'
          )} />
          
          {/* ZonePulse logo/icon */}
          <div >
            <img src="/logo.png" className="w-20 h-20 rounded-full" alt="Logo" />
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center mb-6">
          <h2 className={clsx(
            'text-2xl font-bold mb-2 animate-fade-in-up',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            ZonePulse
          </h2>
          <p className={clsx(
            'text-sm font-medium animate-fade-in-up',
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          )} style={{ animationDelay: '0.2s' }}>
            Smart Real Estate Intelligence
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={clsx(
              'h-full rounded-full transition-all duration-300 ease-out',
              isDark 
                ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
                : 'bg-gradient-to-r from-emerald-500 to-green-600'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={clsx(
                'w-2 h-2 rounded-full animate-bounce',
                isDark ? 'bg-emerald-400' : 'bg-emerald-500'
              )}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Status text */}
        <p className={clsx(
          'text-xs mt-4 animate-pulse',
          isDark ? 'text-slate-400' : 'text-slate-600'
        )}>
          Loading market insights...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default RouteTransition;