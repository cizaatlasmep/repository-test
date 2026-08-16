import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainWebsite from './components/MainWebsite';
import InvestorPortal from './components/InvestorPortal';
import InquiryForm from './components/InquiryForm';
import InvestorPasswordModal from './components/InvestorPasswordModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'website' | 'portal'>('website');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inquiryType, setInquiryType] = useState<'general' | 'investor'>('general');
  const [preselectedTier, setPreselectedTier] = useState<string | undefined>(undefined);
  const [preselectedAmount, setPreselectedAmount] = useState<number | undefined>(undefined);

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleViewChange = (view: 'website' | 'portal') => {
    if (view === 'portal') {
      setShowPasswordModal(true);
    } else {
      setCurrentView('website');
    }
  };

  const handleUnlockInvestorAccess = () => {
    setShowPasswordModal(false);
    setCurrentView('portal');
  };

  const handleOpenInquiry = (type: 'general' | 'investor', tier?: string, amount?: number) => {
    setInquiryType(type);
    if (tier) setPreselectedTier(tier);
    if (amount) setPreselectedAmount(amount);
    setShowInquiryForm(true);
  };

  const handleCloseInquiry = () => {
    setShowInquiryForm(false);
    setPreselectedTier(undefined);
    setPreselectedAmount(undefined);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-bg-base text-text-primary selection:bg-accent-gold/30 selection:text-accent-gold overflow-x-clip">
      
      {/* Faded Architectural Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" id="bg-grid-pattern">
        {/* Fine Architectural Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.025)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Subtle accent vertical/horizontal guide lines for high architectural blueprint feel */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent-gold/5 to-transparent" />
        <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent-gold/5 to-transparent" />
        <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/5 to-transparent" />
        <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/5 to-transparent" />
        
        {/* Radial vignette overlay to fade the grid elegantly around margins for maximum minimalism */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_90%)]" />
      </div>

      {/* Universal Header / Navigation */}
      <Navbar 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        onOpenInquiry={(type) => handleOpenInquiry(type)} 
      />

      {/* Main Content Area with View Transitions */}
      <main className="flex-grow relative z-10 bg-transparent">
        <AnimatePresence mode="wait">
          {currentView === 'website' ? (
            <motion.div
              key="website"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <MainWebsite 
                onViewChange={handleViewChange} 
                onOpenInquiry={(type) => handleOpenInquiry(type)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <InvestorPortal 
                onOpenInquiry={handleOpenInquiry} 
                onViewChange={handleViewChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer 
        onViewChange={handleViewChange} 
        onOpenInquiry={(type) => handleOpenInquiry(type)} 
        currentView={currentView}
      />

      {/* Password Protection Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <InvestorPasswordModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onSuccess={handleUnlockInvestorAccess}
            onRequestCode={() => handleOpenInquiry('investor')}
          />
        )}
      </AnimatePresence>

      {/* Interactive Floating Action Modal (Bidding or Seed Inquiry) */}
      <AnimatePresence>
        {showInquiryForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseInquiry}
              className="absolute inset-0 bg-[#12161D]/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Form Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl z-10 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
            >
              <InquiryForm 
                initialType={inquiryType} 
                onClose={handleCloseInquiry}
                embedded={true}
              />
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
