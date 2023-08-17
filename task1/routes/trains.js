const express = require('express');
const router = express.Router();
const getJWT = require('../util/getJWT');

router.get('/', async function (req, res, next) {
  const token = await getJWT()
  const response = await fetch('http://20.244.56.144/train/trains', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(response);
  res.send(response)
});

module.exports = router;