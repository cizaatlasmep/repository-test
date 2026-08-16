import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, Building, Send, CheckCircle2, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactInquiry } from '../types';

interface InquiryFormProps {
  initialType?: 'general' | 'investor';
  onClose?: () => void;
  embedded?: boolean;
}

export default function InquiryForm({ initialType = 'general', onClose, embedded = false }: InquiryFormProps) {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: initialType,
    message: '',
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: initialType }));
  }, [initialType]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    const submissionPayload = {
      access_key: '20a0ac29-84b7-468b-b198-d38037b4b837',
      subject: formData.type === 'investor'
        ? `Atlas MEP - Investor Information Request: ${formData.name}`
        : `Atlas MEP - Construction Estimating Request: ${formData.name}`,
      from_name: 'Atlas MEP Group Web Portal',
      to_email: 'ciza@atlasmepgroup.com',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || 'Not Specified',
      inquiry_category: formData.type === 'investor' ? 'Investor Relations & Capitalization' : 'Commercial Estimating Direct',
      message: formData.message,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      });

      const data = await response.json();

      if (!data.success) {
        console.warn('Web3Forms response status:', data);
      }
    } catch (err: any) {
      console.error('Web3Forms dispatch notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      type: 'general',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className={`bg-bg-elevated rounded border border-line-hairline overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${embedded ? 'w-full' : 'max-w-2xl mx-auto'}`}>
      
      {/* Header Banner */}
      <div className="bg-brand-steel-dark p-3.5 sm:p-6 border-b border-line-hairline flex justify-between items-center shrink-0">
        <div>
          <span className="text-[9px] sm:text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-0.5 sm:mb-1">
            {formData.type === 'investor' ? 'INVESTOR RELATIONS & CAPITALIZATION' : 'COMMERCIAL ESTIMATING DIRECT'}
          </span>
          <h3 className="font-display font-bold text-base sm:text-xl text-text-primary">
            {formData.type === 'investor' ? 'Request Investor Information Package' : 'MEP Design-Build Project Consultation'}
          </h3>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-text-secondary hover:text-red-400 bg-bg-surface rounded border border-line-hairline transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3.5 sm:p-6 overflow-y-auto overscroll-contain flex-1">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-6 sm:py-12 px-2 sm:px-4 space-y-4 sm:space-y-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent-gold/10 text-accent-gold border border-accent-gold/30">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="font-display font-bold text-text-primary text-lg sm:text-xl">
                  {formData.type === 'investor' ? 'Investor Request Transmitted' : 'Inquiry Successfully Encoded'}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
                  {formData.type === 'investor'
                    ? 'Thank you for your interest in Atlas MEP Group. Our executive team will send our investor deck and prospectus directly to your email.'
                    : 'Your MEP construction specifications have been transmitted. Our downstate Estimating Directors will contact you with full cost breakdowns shortly.'}
                </p>
              </div>

              {/* Submitted Details Review */}
              <div className="bg-bg-surface p-3 sm:p-4 rounded border border-line-hairline text-left text-[11px] sm:text-xs max-w-md mx-auto space-y-1.5 sm:space-y-2 font-mono">
                <div className="text-accent-gold uppercase font-bold text-center border-b border-line-hairline/50 pb-1.5 mb-1.5">
                  TRANSMISSION RECEIPT
                </div>
                <div><span className="text-text-muted">CLIENT:</span> {formData.name}</div>
                <div><span className="text-text-muted">EMAIL:</span> {formData.email}</div>
                <div><span className="text-text-muted">PHONE:</span> {formData.phone}</div>
                {formData.company && <div><span className="text-text-muted">COMPANY:</span> {formData.company}</div>}
                <div className="border-t border-line-hairline/50 pt-1.5 mt-1.5 truncate">
                  <span className="text-text-muted">MSG:</span> "{formData.message}"
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3 max-w-xs mx-auto pt-1 sm:pt-2">
                <button
                  onClick={handleReset}
                  className="w-full bg-accent-gold hover:bg-accent-gold-dark text-bg-base font-bold text-[11px] sm:text-xs uppercase py-2.5 sm:py-3 px-4 rounded transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              action="https://api.web3forms.com/submit"
              method="POST"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-2.5 sm:space-y-4"
            >
              {/* Web3Forms Hidden Metadata Configuration */}
              <input type="hidden" name="access_key" value="20a0ac29-84b7-468b-b198-d38037b4b837" />
              <input 
                type="hidden" 
                name="subject" 
                value={formData.type === 'investor' 
                  ? `Atlas MEP - Investor Information Request: ${formData.name || 'New Lead'}` 
                  : `Atlas MEP - Construction Estimating Request: ${formData.name || 'New Lead'}`} 
              />
              <input type="hidden" name="from_name" value="Atlas MEP Group Web Portal" />
              <input type="hidden" name="to_email" value="ciza@atlasmepgroup.com" />

              {/* Form Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-bg-surface text-text-primary placeholder:text-text-muted pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded border border-line-hairline focus:border-accent-gold focus:outline-none text-xs sm:text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Atlas Builders"
                      className="w-full bg-bg-surface text-text-primary placeholder:text-text-muted pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded border border-line-hairline focus:border-accent-gold focus:outline-none text-xs sm:text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Form Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@company.com"
                      className="w-full bg-bg-surface text-text-primary placeholder:text-text-muted pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded border border-line-hairline focus:border-accent-gold focus:outline-none text-xs sm:text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider block">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-muted" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 773-230-8711"
                      className="w-full bg-bg-surface text-text-primary placeholder:text-text-muted pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded border border-line-hairline focus:border-accent-gold focus:outline-none text-xs sm:text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider block">
                  {formData.type === 'investor' ? 'Investor Inquiry & Allocation Details *' : 'Project Scope & Specifications *'}
                </label>
                <textarea
                  required
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    formData.type === 'investor'
                      ? 'Please outline your investment entity, accreditation status, target capital allocation...'
                      : 'Please outline mechanical/electrical/plumbing parameters, construction timelines...'
                  }
                  className="w-full bg-bg-surface text-text-primary placeholder:text-text-muted p-2.5 sm:p-4 rounded border border-line-hairline focus:border-accent-gold focus:outline-none text-xs sm:text-sm transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider py-3 sm:py-4 rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-accent-gold hover:bg-accent-gold-dark text-bg-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {formData.type === 'investor' ? 'Submit Investor Information Request' : 'Transmit Scope to Estimating'}
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Footer disclaimer */}
      <div className="bg-bg-surface p-2.5 sm:p-4 border-t border-line-hairline/50 text-center text-[9px] sm:text-[10px] text-text-muted leading-relaxed font-sans shrink-0">
        Atlas MEP Group is a union mechanical, electrical, plumbing contractor fully licensed in the State of Illinois.
      </div>
    </div>
  );
}
