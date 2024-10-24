const express = require('express');
const { createOrder } = require('./service.order');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const resp = await createOrder(req.body);

    return res.status(201).send(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
