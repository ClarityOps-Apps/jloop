import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Shield, Eye, EyeOff, Lock } from 'lucide-react';

const CORRECT_PASSWORD = "OperationalReview2024";

export default function PasswordProtection({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === CORRECT_PASSWORD) {
      onAuthenticated();
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5C8A8A] via-[#4A7373] to-[#3A5F5F] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center space-y-6 pb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-[#5C8A8A] to-[#2F4F4F] rounded-2xl flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-[#2F4F4F] tracking-tight">
                Secure Access Required
              </h1>
              <p className="text-[#5C8A8A] text-sm leading-relaxed">
                Enter your password to access the Operational Review Platform
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12 h-12 text-base border-[#D1D5DB] focus:border-[#5C8A8A] focus:ring-[#5C8A8A]/20"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C8A8A] hover:text-[#2F4F4F] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[#D2691E] text-sm font-medium bg-[#D2691E]/10 px-3 py-2 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={!password || isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#5C8A8A] to-[#2F4F4F] hover:from-[#4A7373] hover:to-[#234040] text-white font-medium text-base transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Access Platform
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-[#5C8A8A]">
                This platform contains confidential business information
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}