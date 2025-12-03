import jwt from 'jsonwebtoken';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJfaWQiOiI2OTJkOTBhMjVkNzgwZDAxZTk4ZjA4OTMiLCJpYXQiOjE3NjQ1OTM4MjYsImV4cCI6MTc2NDU5NDcyNn0.VuVk9zsp24vqDCFDO8evWq0W5ELELKPYchJZf5Hl09w';
const secret = 'myaccesssecretkey';

try {
  const decoded = jwt.verify(token, secret);
  console.log('Token is valid:', decoded);
} catch (error) {
  console.log('Token is invalid:', error.message);
}