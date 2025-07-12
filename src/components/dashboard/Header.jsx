import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut, Calendar, Clock } from 'lucide-react';

export default function Header({ onLogout }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F4F4F] via-[#5C8A8A] to-[#2F4F4F]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-10 p-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    Operational Review Platform
                  </h1>
                  <p className="text-gray-200 text-lg">
                    Strategic Business Assessment & Growth Framework
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-200">{currentDate}</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Confidential Access
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">6</p>
                    <p className="text-xs text-gray-200">Review Areas</p>
                  </div>
                </CardContent>
              </Card>
              
              <Button
                variant="outline"
                onClick={onLogout}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Secure Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}