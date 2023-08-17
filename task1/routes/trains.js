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
  const data = await response.getReader().read()
  console.log(data);
  res.send(data)
});

module.exports = router;