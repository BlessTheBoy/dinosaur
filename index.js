const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  express.static("public");
});

app.get("/api/dinoname", async (req, res) => {
  var options = {
    method: "GET",
    url: "https://alexnormand-dino-ipsum.p.rapidapi.com/",
    params: { paragraphs: "1", words: "2", format: "json" },
    headers: {
      "x-rapidapi-key": "f43897b1b3msh44fd0bd3f56e039p143928jsn180068690a71",
      "x-rapidapi-host": "alexnormand-dino-ipsum.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// server route for getting dinoImage
app.get("/api/dinoimage", (req, res) => {
  const { q } = req.query;
  var options = {
    method: "GET",
    url: "https://bing-image-search1.p.rapidapi.com/images/search",
    params: { q: q + " dinosaur", count: "10" },
    headers: {
      "x-rapidapi-key": "f43897b1b3msh44fd0bd3f56e039p143928jsn180068690a71",
      "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let images = response.data.value;
      let resImage = images[Math.floor(Math.random() * images.length)];
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      });
      res.status(200).json(resImage);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
