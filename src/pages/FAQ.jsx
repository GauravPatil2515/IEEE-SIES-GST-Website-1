import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    id: "1",
    question: "What is IEEE SIES GST?",
    answer: "IEEE SIES GST is the student branch of the Institute of Electrical and Electronics Engineers at SIES Graduate School of Technology. We are dedicated to fostering technological innovation, professional development, and academic excellence among students."
  },
  {
    id: "2",
    question: "How can I become a member?",
    answer: "You can join IEEE SIES GST by attending our membership drives or contacting us directly. Membership is open to all students interested in engineering, technology, and innovation. We conduct regular membership drives at the beginning of each academic year."
  },
  {
    id: "3",
    question: "What are the benefits of joining?",
    answer: "Members gain access to exclusive workshops, networking opportunities, leadership roles, skill development programs, IEEE digital library, industry connections, certificate courses, and the chance to participate in organizing major technical events."
  },
  {
    id: "4",
    question: "What sub-chapters are available?",
    answer: "IEEE SIES GST has three active sub-chapters: Computer Society (CS), Microwave Theory and Techniques Society (MTT-S), and Women in Engineering (WiE). Each sub-chapter focuses on specific domains and organizes specialized events and workshops."
  },
  {
    id: "5",
    question: "What kind of events do you organize?",
    answer: "We organize various technical and non-technical events including Techopedia (our flagship event), Epsilon (international conference), workshops, seminars, webinars, coding competitions, and networking sessions with industry professionals."
  },
  {
    id: "6",
    question: "How can I contact IEEE SIES GST?",
    answer: "You can reach us at ieee@siesgst.ac.in, follow us on our social media platforms, or visit us at SIES Graduate School of Technology, Nerul, Navi Mumbai."
  },
];

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <motion.div
      className="border-b border-[var(--color-border)] last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? 'text-[var(--color-accent)]' : 'text-white group-hover:text-[var(--color-accent)]'}`}>
          {faq.question}
        </span>
        <span className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[var(--color-accent)] text-white' : 'bg-white/5 text-[var(--color-text-secondary)]'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-[var(--color-text-secondary)] text-sm leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = React.useState("1");

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Frequently Asked <span className="text-[var(--color-accent)]">Questions</span>
          </h2>
          <p className="section-subtitle">
            Find answers to common questions about IEEE SIES GST membership, events, and activities.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="card">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;