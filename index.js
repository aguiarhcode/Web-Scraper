const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const prompt = require('prompt-sync')();


const PORT = 8000

const app = express();

// var url = prompt("Insert the website you want to scrape from: ") // dynamic prompt

var url = "https://www.theguardian.com/international" // choose the website you want to scrape from

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];

    $('.fc-item__title', html).each(function() { // choose what you want to scrape from the website
      const title = $(this).text()
      const url = $(this).find('a').attr('href')

      articles.push({
        title,
        url
      })
    })
    console.log(articles)
  }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
