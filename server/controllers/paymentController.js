// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import pool from '../config/db.js';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // Razorpay expects amount in paise
//       currency: 'INR',
//       receipt: `order_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);

//     // Store order in database
//     await pool.query(
//       'INSERT INTO orders (user_id, razorpay_order_id, amount) VALUES (?, ?, ?)',
//       [req.user.userId, order.id, amount]
//     );

//     res.json(order);
//   } catch (error) {
//     console.error('Create order error:', error);
//     res.status(500).json({ message: 'Error creating order' });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sign = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest('hex');

//     if (razorpay_signature !== expectedSign) {
//       return res.status(400).json({ message: 'Invalid payment signature' });
//     }

//     // Update order status
//     await pool.query(
//       'UPDATE orders SET status = ?, payment_id = ? WHERE razorpay_order_id = ?',
//       ['completed', razorpay_payment_id, razorpay_order_id]
//     );

//     res.json({ message: 'Payment verified successfully' });
//   } catch (error) {
//     console.error('Verify payment error:', error);
//     res.status(500).json({ message: 'Error verifying payment' });
//   }
// };

import Razorpay from 'razorpay';
import crypto from 'crypto';
import pool from '../config/db.js';

// Initialize Razorpay
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay key ID and secret must be set in environment variables');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // Store order in database
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, razorpay_order_id, amount) VALUES (?, ?, ?)',
      [req.user.userId, order.id, amount]
    );

    if (!result.affectedRows) {
      return res.status(500).json({ message: 'Failed to store order in database' });
    }

    res.json(order);
  } catch (error) {
    console.error('Create order error:', error.message);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing required payment details' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update order status
    const [result] = await pool.query(
      'UPDATE orders SET status = ?, payment_id = ? WHERE razorpay_order_id = ?',
      ['completed', razorpay_payment_id, razorpay_order_id]
    );

    if (!result.affectedRows) {
      return res.status(500).json({ message: 'Failed to update order status in database' });
    }

    res.json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Verify payment error:', error.message);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};