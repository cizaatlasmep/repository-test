import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, ShieldAlert, X, Sparkles, KeyRound } from 'lucide-react';

interface InvestorPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onRequestCode: () => void;
}

export default function InvestorPasswordModal({
  isOpen,
  onClose,
  onSuccess,
  onRequestCode
}: InvestorPasswordModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const VALID_CODES = ['MASTERBLOACK#%..'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedCode = code.trim();

    if (!cleanedCode) {
      setError(true);
      setErrorMessage('Please enter an access code.');
      return;
    }

    if (VALID_CODES.includes(cleanedCode)) {
      setError(false);
      setErrorMessage('');
      onSuccess();
    } else {
      setError(true);
      setErrorMessage('Invalid access code. Request credentials below if you need an access key.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0d12]/85 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-md bg-bg-surface border border-accent-gold/40 shadow-2xl rounded-none overflow-hidden z-10"
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]" />

        {/* Header with Close */}
        <div className="p-6 pb-2 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-gold block font-semibold">
                RESTRICTED EXECUTIVE ACCESS
              </span>
              <h3 className="font-display font-bold text-lg text-text-primary">
                Investor Pitch Room
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1 rounded transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 pt-3 space-y-5">
          <p className="text-xs text-text-secondary leading-relaxed">
            Access to our capitalization structure, pro forma financials, and seed terms requires an executive access key.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-text-secondary uppercase tracking-wider block flex items-center justify-between">
                <span>Enter Access Code</span>
                <span className="text-[10px] text-accent-gold/80 flex items-center gap-1">
                  <KeyRound className="w-3 h-3" /> Encrypted
                </span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError(false);
                  }}
                  autoFocus
                  placeholder="Enter access code"
                  className={`w-full bg-bg-base text-text-primary font-mono tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:text-text-muted p-3.5 rounded border text-sm transition-colors focus:outline-none ${
                    error
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-line-hairline focus:border-accent-gold'
                  }`}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-400 mt-1.5 font-medium">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-none transition-all duration-150 shadow-md shadow-accent-gold/20 hover:brightness-110 cursor-pointer"
            >
              <span>Unlock Pitch Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line-hairline/60" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono">
              <span className="bg-bg-surface px-2 text-text-muted">Need a code?</span>
            </div>
          </div>

          {/* Request Code Trigger */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestCode();
            }}
            className="w-full inline-flex items-center justify-center gap-2 bg-black hover:bg-bg-surface-hover text-accent-gold font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 border border-accent-gold/40 rounded-none transition-colors duration-150 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
            <span>Request Investor Information</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="bg-brand-steel-dark/50 px-6 py-2.5 border-t border-line-hairline text-[10px] font-mono text-text-muted flex justify-between items-center">
          <span>SEC SEED DISCLOSURE PROTECTED</span>
          <span>ATLAS MEP GROUP LLC</span>
        </div>
      </motion.div>
    </div>
  );
}
