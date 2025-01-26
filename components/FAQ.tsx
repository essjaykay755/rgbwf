"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

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
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div initial={false} className="border-b border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left">
        <span className="font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
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
            <p className="pb-4 text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

