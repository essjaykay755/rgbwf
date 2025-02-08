"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

export default function FAQ() {
  const faqs = [
    {
      question: "What types of charities can I donate to and how do I find them?",
      answer:
        "You can donate to various causes including education, healthcare, disaster relief, and more. Use our search feature to find verified charities that match your interests.",
    },
    {
      question: "Is my donation tax-deductible and how do I claim it on my taxes?",
      answer:
        "Yes, all donations are tax-deductible. You will receive a donation receipt that you can use for tax purposes.",
    },
    {
      question: "Can I donate anonymously?",
      answer: "Yes, you can choose to make your donation anonymous during the checkout process.",
    },
    {
      question: "What percentage of my donation actually goes to the charity for administration?",
      answer:
        "95% of your donation goes directly to the charity. Only 5% is used for platform maintenance and processing fees.",
    },
    {
      question: "Can I donate goods or services instead of money?",
      answer:
        "Yes, many of our partner charities accept in-kind donations. Contact them directly to arrange non-monetary donations.",
    },
  ]

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">FAQ</h2>
          </div>
          <p className="text-gray-600">
            Find answers to commonly asked questions about donations and our work
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto divide-y divide-gray-200"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-6 text-left group-hover:text-primary transition-colors"
      >
        <span className="font-medium pr-8">{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

