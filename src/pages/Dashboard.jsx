
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AccessLog } from '@/api/entities';
import { 
  Target, 
  Zap, 
  Settings, 
  Users, 
  TrendingUp, 
  FileText,
  Shield
} from 'lucide-react';

import PasswordProtection from '../components/auth/PasswordProtection';
import Header from '../components/dashboard/Header';
import QuickNavigation from '../components/dashboard/QuickNavigation';
import CategorySection from '../components/dashboard/CategorySection';

const operationalData = {
  vision: {
    title: "VISION",
    icon: Target,
    bgColor: "bg-gradient-to-br from-[#5C8A8A]/10 to-[#2F4F4F]/10",
    borderColor: "border-l-[#5C8A8A]",
    iconColor: "bg-[#5C8A8A]",
    items: [
      {
        title: "Vision & Dream Outcome",
        description: "Long-term strategic vision and desired future state of the business"
      },
      {
        title: "Product Revenue Vehicles",
        description: "Core products and services that drive business revenue"
      }
    ]
  },
  strategy: {
    title: "STRATEGY",
    icon: Zap,
    bgColor: "bg-gradient-to-br from-[#D2691E]/10 to-[#B8621B]/10",
    borderColor: "border-l-[#D2691E]",
    iconColor: "bg-[#D2691E]",
    items: [
      {
        title: "Go-to-Market Plan(s)",
        description: "Strategic approach for bringing products/services to market"
      }
    ]
  },
  process: {
    title: "PROCESS",
    icon: Settings,
    bgColor: "bg-gradient-to-br from-[#2F4F4F]/10 to-[#5C8A8A]/10",
    borderColor: "border-l-[#2F4F4F]",
    iconColor: "bg-[#2F4F4F]",
    items: [
      {
        title: "Data Standards & Maintenance",
        description: "Procedures for data quality, consistency, and regular maintenance"
      },
      {
        title: "Activities Linked to Outcomes",
        description: "Clear connections between daily activities and business results"
      },
      {
        title: "Knowledge Repository",
        description: "Centralized storage and management of business knowledge"
      },
      {
        title: "Standard Operating Procedures (SOPs)",
        description: "Documented step-by-step processes for key business operations"
      },
      {
        title: "Software Integrations & Dependencies",
        description: "Technology stack connections and system interdependencies"
      },
      {
        title: "Institutional Knowledge",
        description: "Critical knowledge held by individuals within the organization"
      },
      {
        title: "Demand-to-Resource Analysis: Employees",
        description: "Workforce capacity planning and resource allocation"
      },
      {
        title: "Demand-to-Resource Analysis: Customers",
        description: "Customer demand forecasting and service capacity planning"
      },
      {
        title: "Demand-to-Resource Analysis: Activities",
        description: "Activity-based resource planning and optimization"
      }
    ]
  },
  people: {
    title: "PEOPLE",
    icon: Users,
    bgColor: "bg-gradient-to-br from-[#5C8A8A]/10 to-[#D2691E]/10",
    borderColor: "border-l-[#5C8A8A]",
    iconColor: "bg-[#5C8A8A]",
    items: [
      {
        title: "Organizational Chart & Functions",
        description: "Clear hierarchy and role definitions across the organization"
      },
      {
        title: "Responsibility Matrix",
        description: "RACI matrix defining who is responsible, accountable, consulted, and informed"
      },
      {
        title: "Job Descriptions",
        description: "Detailed role specifications and expectations for all positions"
      },
      {
        title: "Skills, Certifications, Licenses",
        description: "Required competencies and credentials for each role"
      },
      {
        title: "HR Policies",
        description: "Comprehensive human resources policies and procedures"
      },
      {
        title: "Performance Reviews",
        description: "Regular assessment processes for employee performance"
      },
      {
        title: "Employee Growth Plans & Career Paths",
        description: "Development opportunities and advancement trajectories"
      },
      {
        title: "Succession Planning",
        description: "Leadership continuity and key role transition planning"
      },
      {
        title: "Employee Guidelines Handbook",
        description: "Comprehensive guide for workplace policies and expectations"
      }
    ]
  },
  performance: {
    title: "PERFORMANCE",
    icon: TrendingUp,
    bgColor: "bg-gradient-to-br from-[#D2691E]/10 to-[#5C8A8A]/10",
    borderColor: "border-l-[#D2691E]",
    iconColor: "bg-[#D2691E]",
    items: [
      {
        title: "Revenue Distribution: By Product/Service",
        description: "Analysis of revenue contribution across different offerings"
      },
      {
        title: "Revenue Distribution: By Customer",
        description: "Customer-based revenue analysis and concentration metrics"
      },
      {
        title: "Performance/Success Metrics",
        description: "Key performance indicators and success measurements"
      },
      {
        title: "Performance Evaluations",
        description: "Business and individual performance assessment processes"
      },
      {
        title: "Key Objectives",
        description: "Strategic goals and primary business objectives"
      },
      {
        title: "Delivery SLAs",
        description: "Service level agreements and delivery commitments"
      }
    ]
  },
  miscellaneous: {
    title: "MISCELLANEOUS",
    icon: FileText,
    bgColor: "bg-gradient-to-br from-[#D1D5DB]/30 to-[#F3F4F6]/30",
    borderColor: "border-l-[#2F4F4F]",
    iconColor: "bg-[#2F4F4F]",
    items: [
      {
        title: "Customer-Facing Points of Contact",
        description: "All touchpoints and interfaces with customers"
      },
      {
        title: "Lead Pipeline",
        description: "Sales funnel and prospect management processes"
      },
      {
        title: "Known Gaps",
        description: "Identified deficiencies and areas needing improvement"
      },
      {
        title: "Known Constraints",
        description: "Limitations and bottlenecks affecting business operations"
      },
      {
        title: "Concerns",
        description: "Areas of worry or potential issues requiring attention"
      },
      {
        title: "Risks",
        description: "Identified threats and potential negative impacts on business"
      }
    ]
  }
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      // Log the access
      AccessLog.create({
        access_time: new Date().toISOString(),
        user_agent: navigator.userAgent,
        ip_address: 'Client IP' // This would be populated server-side in a real app
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(operationalData);
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setExpandedSections({});
    setActiveSection('');
  };

  const toggleSection = (sectionId, expanded) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: expanded
    }));
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5F3F3]">
      <Header onLogout={handleLogout} />
      <QuickNavigation onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4 py-8"
        >
          <h2 className="text-3xl font-bold text-[#2F4F4F] tracking-tight">
            Operational Excellence Framework
          </h2>
          <p className="text-[#5C8A8A] text-lg max-w-3xl mx-auto leading-relaxed">
            A comprehensive review of your business operations across six critical areas. 
            Each section contains essential elements for sustainable growth and operational efficiency.
          </p>
        </motion.div>

        <div className="space-y-6">
          {Object.entries(operationalData).map(([key, section], index) => (
            <div key={key} id={key}>
              <CategorySection
                title={section.title}
                icon={section.icon}
                items={section.items}
                bgColor={section.bgColor}
                borderColor={section.borderColor}
                iconColor={section.iconColor}
                isExpanded={expandedSections[key]}
                onToggle={(expanded) => toggleSection(key, expanded)}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-12 space-y-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-[#5C8A8A] to-[#2F4F4F] rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[#2F4F4F]">
            Review Complete
          </h3>
          <p className="text-[#5C8A8A] max-w-2xl mx-auto">
            This framework provides a structured approach to evaluating and improving your business operations. 
            Regular assessment of these areas will drive sustainable growth and operational excellence.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
