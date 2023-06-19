const path = require('path');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const singleUserRoutes = require('./routes/singleUser');
const scheduleRoutes = require('./routes/schedules');

const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoutes);
app.use('/users', singleUserRoutes);
app.use('/schedules', scheduleRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.render('index', {
    pageTitle: 'Mr. Coffee',
    path: '/',
  });
});

app.use((_, res) => {
  res
    .status(404)
    .render('404', { message: '', pageTitle: 'Page not found', path: '' });
});

app.listen(3000, () => {
  console.log(`http://127.0.0.1:3000`);
});
