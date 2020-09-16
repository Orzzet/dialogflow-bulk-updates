const express = require('express');
const dialogflow = require('../utils/dialogflow');
const router = express.Router();

router.get('/intents', async (req, res) => {
  const languageCode = req.query.languageCode;
  res.json({ success: true, intents: await dialogflow.getIntents(languageCode), languageCode });
});

router.put('/intents', async (req, res) => {
  dialogflow.updateIntents(req.body.languageCode, req.body.intents)
      .then(() => res.send({ success: true }))
      .catch((reason) => {
        console.log(reason);
        res.send({ success: false, reason });
      })
});


module.exports = router;
