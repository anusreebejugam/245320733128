const express = require('express');
const router = express.Router();
const getJWT = require('../util/getJWT');

router.get('/', async function (req, res, next) {
  const token = await getJWT()
  const response = await fetch('http://20.244.56.144/train/trains', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.body)
  for await (const chunk of response) {
    res.write(chunk)
  }
  res.end()
});

module.exports = router;