const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const KLAVIYO_API_KEY = 'pk_55a23396fb127f7bdc0bf61427bb772870';

app.use(bodyParser.json());

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  const profileData = {
    data: {
      type: 'profile',
      attributes: {
        email: email
      }
    }
  };
  
  try {
    const response = await axios.post('https://a.klaviyo.com/api/profiles/', profileData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'revision': '2024-07-15'
      }
    });

    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
