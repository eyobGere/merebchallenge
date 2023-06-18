const express = require('express');
const app = express();

const people = [];

app.get('/people', (req, res) => {
  res.json(people);
});

app.get('/people/:id', (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  if (!person) {
    res.status(404).send('Person not found');
    return;
  }

  res.json(person);
});

app.post('/people', (req, res) => {
  const person_id = str(uuid.uuid4());
  const name = req.body.name;
  const age = req.body.age;
  const hobbies = req.body.hobbies;

  const person = {
    id: person_id,
    name: name,
    age: age,
    hobbies: hobbies,
  };

  people.push(person);

  res.json(person);
});

app.put('/people/:id', (req, res) => {
  const person_id = parseInt(req.params.id);
  const person = people.find(p => p.id === person_id);
  if (!person) {
    res.status(404).send('Person not found');
    return;
  }

  const name = req.body.name;
  const age = req.body.age;
  const hobbies = req.body.hobbies;

  person.name = name;
  person.age = age;
  person.hobbies = hobbies;

  res.json(person);
});

app.delete('/people/:id', (req, res) => {
  const person_id = parseInt(req.params.id);
  const person = people.find(p => p.id === person_id);
  if (!person) {
    res.status(404).send('Person not found');
    return;
  }

  people.remove(person);

  res.send('Person deleted');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});