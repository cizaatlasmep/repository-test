import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, User, Building, Send, CheckCircle2, History, Trash2, X, UploadCloud, FileText, Paperclip } from 'lucide-react';
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
    attachments: []
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: initialType }));
  }, [initialType]);

  const [submitted, setSubmitted] = useState(false);
  const [submissionsHistory, setSubmissionsHistory] = useState<ContactInquiry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format file sizes nicely
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFilesAdded = (filesList: FileList | File[]) => {
    const newFiles = Array.from(filesList).map((f) => ({
      name: f.name,
      size: formatFileSize(f.size),
      type: f.type || 'Document'
    }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...newFiles]
    }));
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index)
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atlas_inquiries');
      if (stored) {
        setSubmissionsHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load inquiries', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const newInquiry = { ...formData };
    const updatedHistory = [newInquiry, ...submissionsHistory];
    
    try {
      localStorage.setItem('atlas_inquiries', JSON.stringify(updatedHistory));
      setSubmissionsHistory(updatedHistory);
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      type: 'general',
      message: '',
      attachments: []
    });
    setSubmitted(false);
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem('atlas_inquiries');
      setSubmissionsHistory([]);
    } catch (e) {
      console.error(e);
    }
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
          {submissionsHistory.length > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-1.5 sm:p-2 text-text-secondary hover:text-accent-gold bg-bg-surface rounded border border-line-hairline hover:border-accent-gold/40 transition-colors"
              title="View Inquiry History"
            >
              <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-text-secondary hover:text-red-400 bg-bg-surface rounded border border-line-hairline transition-colors"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-3.5 sm:p-6 overflow-y-auto overscroll-contain flex-1">
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex justify-between items-center border-b border-line-hairline pb-3">
                <h4 className="font-display font-semibold text-text-primary text-xs sm:text-sm uppercase tracking-wider">
                  Submitted Inquiries ({submissionsHistory.length})
                </h4>
                <button
                  onClick={clearHistory}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Clear All
                </button>
              </div>

              <div className="max-h-80 sm:max-h-96 overflow-y-auto space-y-3 pr-1">
                {submissionsHistory.map((item, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-bg-surface border border-line-hairline rounded relative">
                    <span className="absolute top-2.5 right-2.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-steel-light/20 text-brand-steel-light">
                      {item.type}
                    </span>
                    <div className="font-display font-medium text-text-primary text-xs sm:text-sm">{item.name}</div>
                    <div className="font-mono text-[11px] sm:text-xs text-text-muted mt-0.5">{item.email} • {item.phone}</div>
                    {item.company && <div className="text-[11px] sm:text-xs text-text-secondary mt-0.5">Company: {item.company}</div>}
                    <div className="text-[11px] sm:text-xs text-text-secondary mt-1.5 border-t border-line-hairline/50 pt-1.5 italic">
                      "{item.message}"
                    </div>
                    {item.attachments && item.attachments.length > 0 && (
                      <div className="mt-2 border-t border-line-hairline/30 pt-2">
                        <div className="text-[9px] sm:text-[10px] font-mono text-accent-gold uppercase font-bold flex items-center gap-1 mb-1">
                          <Paperclip className="w-3 h-3" />
                          Attached Documents ({item.attachments.length})
                        </div>
                        <ul className="space-y-1">
                          {item.attachments.map((file, fIdx) => (
                            <li key={fIdx} className="text-[10px] sm:text-[11px] font-mono text-text-secondary flex justify-between items-center bg-bg-base/60 px-2 py-0.5 rounded">
                              <span className="truncate max-w-[180px] sm:max-w-[200px]">{file.name}</span>
                              <span className="text-text-muted">{file.size}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowHistory(false)}
                className="w-full bg-bg-surface hover:bg-bg-surface-hover text-text-primary text-xs font-semibold py-2 sm:py-2.5 rounded border border-line-hairline transition-colors mt-3"
              >
                Back to Form
              </button>
            </motion.div>
          ) : submitted ? (
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
                {formData.attachments && formData.attachments.length > 0 && (
                  <div className="border-t border-line-hairline/50 pt-1.5 mt-1.5">
                    <span className="text-text-muted uppercase font-bold block mb-1">ATTACHED FILES ({formData.attachments.length}):</span>
                    <ul className="space-y-1">
                      {formData.attachments.map((file, fIdx) => (
                        <li key={fIdx} className="text-[10px] sm:text-[11px] text-accent-gold flex items-center justify-between">
                          <span className="truncate max-w-[180px] sm:max-w-[220px]">📎 {file.name}</span>
                          <span>({file.size})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 sm:gap-3 max-w-sm mx-auto pt-1 sm:pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-accent-gold hover:bg-accent-gold-dark text-bg-base font-bold text-[11px] sm:text-xs uppercase py-2.5 sm:py-3 px-3 rounded transition-colors"
                >
                  New Submission
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="flex-1 bg-bg-surface hover:bg-bg-surface-hover text-text-primary text-[11px] sm:text-xs font-semibold py-2.5 sm:py-3 px-3 rounded border border-line-hairline transition-colors"
                >
                  View History
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-2.5 sm:space-y-4"
            >
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
                  rows={2}
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

              {/* Document & Specification File Uploads (Only for non-investor inquiries) */}
              {formData.type !== 'investor' && (
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider block flex justify-between items-center">
                    <span>Drawings & Specs (Up To 15MB)</span>
                    <span className="text-[9px] sm:text-[10px] text-text-muted font-normal">PDF, DWG, CAD, ZIP</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFilesAdded(e.target.files);
                        e.target.value = '';
                      }
                    }}
                    accept=".pdf,.dwg,.dxf,.cad,.zip,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                  />

                  {/* Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded p-2.5 sm:p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                      isDragging
                        ? 'border-accent-gold bg-accent-gold/10'
                        : 'border-line-hairline bg-bg-surface hover:border-accent-gold/50 hover:bg-bg-surface-hover'
                    }`}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-steel/40 flex items-center justify-center text-accent-gold">
                      <UploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-text-primary">
                        Drag & drop blueprints or spec sheets
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-text-muted mt-0.5">
                        or <span className="text-accent-gold font-medium underline">browse files</span>
                      </p>
                    </div>
                  </div>

                  {/* Uploaded File List */}
                  {formData.attachments && formData.attachments.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-accent-gold uppercase tracking-wider block font-bold">
                        Attached Documents ({formData.attachments.length})
                      </span>
                      <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                        {formData.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-bg-surface border border-line-hairline rounded text-[11px]"
                          >
                            <div className="flex items-center gap-1.5 min-w-0 pr-2">
                              <FileText className="w-3.5 h-3.5 text-accent-gold flex-shrink-0" />
                              <div className="truncate">
                                <span className="font-medium text-text-primary truncate block">{file.name}</span>
                                <span className="text-[9px] text-text-muted font-mono">{file.size}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(idx);
                              }}
                              className="text-text-muted hover:text-red-400 p-0.5 transition-colors flex-shrink-0 cursor-pointer"
                              title="Remove File"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider py-3 sm:py-4 rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-accent-gold hover:bg-accent-gold-dark text-bg-base"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {formData.type === 'investor' ? 'Submit Investor Information Request' : 'Transmit Scope to Estimating'}
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
