const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let quotes = [
  { id: 1, text: 'Quote 1', author: 'Author 1' },
  { id: 2, text: 'Quote 2', author: 'Author 2' },
];

app.get('/quotes', (req, res) => {
  res.json(quotes);
});

app.post('/quotes', (req, res) => {
  const quote = {
    id: quotes.length + 1,
    text: req.body.text,
    author: req.body.author,
  };
  quotes.push(quote);
  res.status(201).json(quote);
});

app.put('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quoteIndex = quotes.findIndex(q => q.id === id);

  if (quoteIndex !== -1) {
    quotes[quoteIndex].text = req.body.text;
    quotes[quoteIndex].author = req.body.author;
    res.json(quotes[quoteIndex]);
  } else {
    res.status(404).send('Quote not found');
  }
});

app.delete('/quotes/:id', (req, res) => {
  const id = req.params.id;
  const quoteIndex = quotes.findIndex(quote => quote.id === parseInt(id));

  if (quoteIndex !== -1) {
    quotes.splice(quoteIndex, 1);
    res.status(204).json({ message: `Quote with ID ${id} was deleted successfully.` });
  } else {
    res.status(404).json({ message: `Quote with ID ${id} not found.` });
  }
});


app.listen(port, () => {
  console.log(`Quotes API listening at http://localhost:${port}`);
});

module.exports = app;
