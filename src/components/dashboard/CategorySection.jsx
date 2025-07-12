import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CategorySection({ 
  title, 
  icon: Icon, 
  items, 
  bgColor, 
  borderColor, 
  iconColor,
  isExpanded = false,
  onToggle 
}) {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle && onToggle(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${bgColor} ${borderColor} border-l-4 hover:shadow-lg transition-all duration-300 cursor-pointer`}>
        <CardHeader 
          onClick={handleToggle}
          className="flex flex-row items-center justify-between space-y-0 pb-3"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${iconColor} bg-opacity-20`}>
              <Icon className={`w-6 h-6 ${iconColor.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-[#2F4F4F] tracking-tight">
                {title}
              </CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs bg-[#E5F3F3] text-[#2F4F4F]">
                {items.length} items
              </Badge>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-[#5C8A8A]" />
          </motion.div>
        </CardHeader>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#5C8A8A] mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#2F4F4F] font-medium leading-relaxed">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-[#5C8A8A] text-sm mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}