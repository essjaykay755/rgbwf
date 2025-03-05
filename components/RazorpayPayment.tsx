'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Heart } from 'lucide-react';
import { ThankYouModal } from './ThankYouModal';

interface RazorpayPaymentProps {
  amount: number;
  onSuccess: (paymentId: string, orderId: string, signature: string) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment = ({ amount, onSuccess, onError }: RazorpayPaymentProps) => {
  const [showThankYou, setShowThankYou] = useState(false);

  const initializeRazorpay = async () => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'RGBWF',
        description: 'Donation to RGBWF',
        order_id: data.orderId,
        handler: function (response: any) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          setShowThankYou(true);
          setTimeout(() => {
            onSuccess(razorpay_payment_id, razorpay_order_id, razorpay_signature);
          }, 100);
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#16A34A',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      onError(error);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <button
        onClick={initializeRazorpay}
        className="w-full bg-primary text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2 group shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none"
      >
        Donate Now
        <Heart 
          className="w-6 h-6 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" 
        />
      </button>

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        donationAmount={amount}
      />
    </>
  );
};

export default RazorpayPayment; 