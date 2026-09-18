const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^[6-9]\d{9}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

module.exports = { emailRegex, phoneRegex, passwordRegex };
