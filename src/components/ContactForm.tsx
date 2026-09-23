"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry, type InquiryFormState } from "@/lib/actions";

const initialState: InquiryFormState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok, state.message]);

  return (
    <form action={formAction} ref={formRef}>
      {state.message && (
        <div className={`form-status ${state.ok ? "ok" : "err"}`}>{state.message}</div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor="fName">Full Name *</label>
          <input id="fName" name="fullName" required />
        </div>
        <div className="field">
          <label htmlFor="fEmail">Email Address *</label>
          <input id="fEmail" name="email" type="email" required />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="fWhats">WhatsApp Number</label>
          <input id="fWhats" name="whatsapp" />
        </div>
        <div className="field">
          <label htmlFor="fService">Service Needed *</label>
          <select id="fService" name="service" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option>Logo Design</option>
            <option>Pedigree Banner</option>
            <option>Breeding Banner</option>
            <option>Stud Banner</option>
            <option>Animated Banner</option>
            <option>Website Development</option>
            <option>Printing</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="fBudget">Budget Range (optional)</label>
        <select id="fBudget" name="budget" defaultValue="">
          <option value="">Prefer not to say</option>
          <option>Under $100</option>
          <option>$100 – $500</option>
          <option>$500 – $1,000</option>
          <option>$1,000+</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="fDetails">Project Details *</label>
        <textarea id="fDetails" name="details" required placeholder="Tell me about your brand, timeline, and what you need." />
      </div>

      <div className="field">
        <label htmlFor="fFile">Reference File (optional)</label>
        <input id="fFile" name="file" type="file" />
      </div>

      <div className="form-foot">
        <button type="submit" className="btn btn-solid" disabled={pending}>
          {pending ? "Sending…" : "Send Inquiry"} <span className="btn-arrow">→</span>
        </button>
        <span className="form-note">Your inquiry is saved and I&apos;ll follow up by email or WhatsApp.</span>
      </div>
    </form>
  );
}
