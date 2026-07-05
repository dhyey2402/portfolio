import { useState } from 'react';
import axios from 'axios';
import { CONTACT } from '../../lib/data';
import { useMagnetic, useReveal } from '../../hooks/usePortfolio';
import { Mail, MapPin, Github, Linkedin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const API = `${import.meta.env.VITE_BACKEND_URL || ''}/api`;

export default function Contact() {
  const ref = useReveal();
  const btnRef = useMagnetic(0.25, 90);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Missing fields', description: 'Name, email, and message are required.' });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      toast({ title: 'Message sent ✓', description: "Thanks — I'll get back within 24-48 hours." });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      toast({ title: 'Something went wrong', description: err?.response?.data?.detail || 'Please try again in a moment.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-6 reveal">
          <span className="section-num">04 / Contact</span>
          <span className="h-px flex-1 bg-slate-800" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-6xl leading-[1.05] text-slate-100">
              Let’s build something{' '}
              <span className="italic text-amber-300">together.</span>
            </h2>
            <p className="reveal reveal-delay-2 mt-6 text-slate-400 text-lg max-w-lg">
              Always open for exciting opportunities and collabs. If you have a project in mind,
              don’t hesitate to reach out.
            </p>

            <div className="reveal reveal-delay-3 mt-10 space-y-4">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
                <span className="w-12 h-12 rounded-xl grid place-items-center border border-slate-800 bg-slate-950/60 text-amber-300 group-hover:border-amber-400/60 transition">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500">Email</div>
                  <div className="text-slate-100 group-hover:text-amber-300 transition">{CONTACT.email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl grid place-items-center border border-slate-800 bg-slate-950/60 text-amber-300">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-500">Location</div>
                  <div className="text-slate-100">{CONTACT.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="reveal reveal-delay-2 lg:col-span-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" value={form.name} onChange={onChange} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <Field label="Subject" name="subject" value={form.subject} onChange={onChange} />
            <Field label="Message" name="message" as="textarea" rows={5} value={form.message} onChange={onChange} required />

            <button ref={btnRef} type="submit" disabled={loading}
              className="mag w-full sm:w-auto btn-amber inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-70">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : sent ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {loading ? 'Sending...' : sent ? 'Sent' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = 'text', required, as, rows }) {
  const shared = 'w-full bg-slate-900/60 border border-slate-800 focus:border-amber-400/60 focus:ring-0 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition';
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-slate-500">{label}{required && <span className="text-amber-400"> *</span>}</span>
      {as === 'textarea' ? (
        <textarea name={name} rows={rows} value={value} onChange={onChange} required={required} className={`${shared} mt-2 resize-y`} placeholder={`Your ${label.toLowerCase()}...`} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} required={required} className={`${shared} mt-2`} placeholder={`Your ${label.toLowerCase()}...`} />
      )}
    </label>
  );
}
