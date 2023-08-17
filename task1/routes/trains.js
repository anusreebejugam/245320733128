const express = require('express');
const router = express.Router();
const getJWT = require('../util/getJWT')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const token = getJWT()
  console.log(token);
  const getResponse = await fetch('http://20.244.56.144/train/trains', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  res.send(getResponse)
});

module.exports = router;
