'use client';

import React from 'react';
import { 
  Compass,
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Inbox, 
  SlidersHorizontal,
  ChevronLeft, 
  ChevronRight,
  Layers,
  Layout
} from 'lucide-react';

export type ActiveTab = 
  | 'overview' 
  | 'blogs' 
  | 'projects' 
  | 'services'
  | 'testimonials' 
  | 'pages'
  | 'enquiries' 
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  newEnquiriesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  newEnquiriesCount,
}) => {
  interface NavItem {
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'projects', label: 'Projects / Gallery', icon: ImageIcon },
    { id: 'blogs', label: 'Blog Articles', icon: FileText },
    { id: 'services', label: 'Services & Offerings', icon: Layers },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'pages', label: 'Page Content', icon: Layout },
    { 
      id: 'enquiries', 
      label: 'Enquiries', 
      icon: Inbox, 
      badge: newEnquiriesCount > 0 ? newEnquiriesCount : undefined 
    },
    { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
  ];

  const handleNavClick = (id: ActiveTab) => {
    setActiveTab(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-[#24241F]/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-[#F5F1E9] dark:bg-[#24241F] border-r border-[#DDD5C9] dark:border-[#3E3C33] transition-all duration-200 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Half: Brand and Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Mark and Studio Header */}
          <div className="h-18 flex items-center justify-between px-4 border-b border-[#DDD5C9] dark:border-[#3E3C33] shrink-0">
            <div 
              className="flex items-center gap-2.5 overflow-hidden cursor-pointer" 
              onClick={() => handleNavClick('overview')}
            >
              {/* Split Arch Geometric Logo */}
              <div className="relative w-7 h-7 shrink-0">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 16C3 8.82 8.82 3 16 3V7.5C11.306 7.5 7.5 11.306 7.5 16H3Z" fill="#C2633E" />
                  <path d="M17.5 3H18.5C25.404 3 31 8.596 31 15.5V28H17.5V3Z" fill="#526653" />
                </svg>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-[14px] font-semibold tracking-[0.22em] text-[#292722] dark:text-[#F5F2EB] leading-none truncate">
                    EXCORTO
                  </span>
                  <span className="text-[6.5px] font-semibold tracking-[0.28em] text-[#94745F] uppercase mt-1 leading-none truncate">
                    BUILDERS &amp; INTERIORS
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex w-7 h-7 rounded items-center justify-center text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Primary Navigation Section */}
          <div className="py-6 px-3.5">
            {!isCollapsed && (
              <span className="text-[11px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium px-3.5 mb-3 block">
                Workspace
              </span>
            )}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded text-[14px] transition-all text-left ${
                      isActive
                        ? 'bg-[#EBE5DA] dark:bg-[#38362F] text-[#302A25] dark:text-[#F4EFE5] font-medium border-l-[3px] border-[#777963] dark:border-[#8E9177] shadow-2xs'
                        : 'text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA]/50 dark:hover:bg-[#38362F]/50 font-normal'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-[#777963] dark:text-[#8E9177]' : 'text-[#777067] dark:text-[#B6AEA1]'}`} />

                    {!isCollapsed && (
                      <span className="truncate flex-1 tracking-tight">
                        {item.label}
                      </span>
                    )}

                    {!isCollapsed && item.badge !== undefined && (
                      <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[#777963] text-[#FCFAF6]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer: Architect Profile */}
        <div className="p-3.5 border-t border-[#DDD5C9] dark:border-[#3E3C33] bg-[#F5F1E9] dark:bg-[#24241F] shrink-0">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="relative shrink-0">
              <span className="w-8 h-8 rounded bg-[#302A25] dark:bg-[#F4EFE5] text-[#F5F1E9] dark:text-[#24241F] text-xs font-serif font-medium flex items-center justify-center border border-[#DDD5C9] dark:border-[#3E3C33]">
                CD
              </span>
              <span className="w-2 h-2 rounded-full bg-[#777963] dark:bg-[#8E9177] border border-white dark:border-[#24241F] absolute bottom-0 right-0"></span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] truncate">
                  Clara Delacroix
                </span>
                <span className="text-[10.5px] text-[#777067] dark:text-[#B6AEA1] truncate">
                  Principal Architect
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
