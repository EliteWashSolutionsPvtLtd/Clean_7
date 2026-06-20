"use client";

import { useState } from "react";
import OrangeGradientButton from "@/app/components/ui/buttons/OrangeGradientButton";
import { CheckCircle2 } from "lucide-react";

export default function FranchiseForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-[#33302E] mb-4">Inquiry Received!</h3>
        <p className="text-[#5E5450]">Thank you for your interest in Wash & Wow. Our franchise team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#33302E]">Full Name</label>
          <input 
            type="text" 
            required
            placeholder="Enter your name"
            className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#33302E]">Phone Number</label>
          <input 
            type="tel" 
            required
            placeholder="Phone number"
            className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#33302E]">Email Address</label>
          <input 
            type="email" 
            required
            placeholder="Email address"
            className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#33302E]">City</label>
          <input 
            type="text" 
            required
            placeholder="Proposed city"
            className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#33302E]">Investment Range</label>
          <select 
            required
            className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all appearance-none"
          >
            <option value="">Select range</option>
            <option value="5-10">₹5 - ₹10 Lakhs</option>
            <option value="10-20">₹10 - ₹20 Lakhs</option>
            <option value="20-50">₹20 - ₹50 Lakhs</option>
            <option value="50+">₹50 Lakhs +</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#33302E]">Business Experience</label>
          <select 
            required
            className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all appearance-none"
          >
            <option value="">Select experience</option>
            <option value="yes">I have business experience</option>
            <option value="no">I am a first-time founder</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#33302E]">Why do you want to partner with us?</label>
        <textarea 
          required
          rows={4}
          placeholder="Tell us a bit about your motivation..."
          className="w-full px-5 py-4 rounded-xl border border-[#E8DFD6] bg-[#FBF6F2]/30 focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-all"
        ></textarea>
      </div>

      <OrangeGradientButton className="w-full py-5 rounded-2xl font-bold text-lg">
        Submit Franchise Inquiry
      </OrangeGradientButton>
    </form>
  );
}
