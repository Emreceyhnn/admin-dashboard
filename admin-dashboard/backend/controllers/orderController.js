import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
  try {
    const { name } = req.query; // Filter by user name
    let query = {};
    if (name) {
      query.userInfo = { $regex: name, $options: 'i' };
    }
    const orders = await Order.find(query);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
