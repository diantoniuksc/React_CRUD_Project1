const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();

const mongoUri = "mongodb+srv://ommetsynskaya:Sheridan2024@cluster0.kto5g.mongodb.net/WorldCityUser?retryWrites=true&w=majority";   // - connection string for cloud-based DB

mongoose.connect(mongoUri, {                                                                                          
//mongoose.connect('mongodb://127.0.0.1:27017/WorldCityUser', {                                                                        - connection string for local DB
//mongoose.connect('mongodb://mongo:27017/WorldCityUser', {                                                                            - connection string for Docker-containerized DB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());//to allow access to data

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
