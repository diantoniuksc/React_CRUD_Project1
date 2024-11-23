db.createCollection('users', { capped: false });
db.users.insert({
  name: 'Test',
  lastName: 'User',
  pass: 'password123',
  city: 'Toronto',
  country: 'Canada',
  thoughts: 'The Sun is shining.'
});
