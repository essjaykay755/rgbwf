'use client';

import { useEffect } from 'react';
import Script from 'next/script';

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
          onSuccess(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#F37254',
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Donate Now
      </button>
    </>
  );
};

export default RazorpayPayment; 