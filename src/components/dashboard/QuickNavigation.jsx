import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Target, Zap, Settings, Users, TrendingUp, FileText } from 'lucide-react';

const navigationItems = [
  { id: 'vision', label: 'Vision', icon: Target },
  { id: 'strategy', label: 'Strategy', icon: Zap },
  { id: 'process', label: 'Process', icon: Settings },
  { id: 'people', label: 'People', icon: Users },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'miscellaneous', label: 'Miscellaneous', icon: FileText }
];

export default function QuickNavigation({ onNavigate, activeSection }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#2F4F4F]">Quick Navigation</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#5C8A8A] hover:text-[#2F4F4F] border-[#5C8A8A] hover:border-[#2F4F4F]"
          >
            Back to Top
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "outline"}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center justify-center gap-2 p-3 h-auto transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-[#5C8A8A] text-white hover:bg-[#4A7373]' 
                  : 'hover:bg-[#E5F3F3] text-[#2F4F4F] border-[#D1D5DB] hover:border-[#5C8A8A]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}