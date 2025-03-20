const mysql = require('mysql2');

// Create a MySQL connection without specifying a database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to the MySQL server');
  
  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS student_management', (err) => {
    if (err) {
      console.error('Error creating database:', err.message);
      return;
    }
    console.log('Database created or already exists');
    
    // Use the database
    db.query('USE student_management', (err) => {
      if (err) {
        console.error('Error using database:', err.message);
        return;
      }
      console.log('Using student_management database');
      
      // Create tables
      createTables();
    });
  });
});

// Function to create necessary tables
function createTables() {
  // Create Admins table
  const createAdminsTable = `
    CREATE TABLE IF NOT EXISTS Admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'superadmin') NOT NULL
    )
  `;
  
  // Create Students table
  const createStudentsTable = `
    CREATE TABLE IF NOT EXISTS Students (
      registration_number INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      gender VARCHAR(10) NOT NULL,
      date_of_birth DATE NOT NULL,
      contact_number VARCHAR(20) NOT NULL,
      email VARCHAR(100) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      registration_fee DECIMAL(10,2) NOT NULL
    )
  `;
  
  // Create Payments table
  const createPaymentsTable = `
    CREATE TABLE IF NOT EXISTS Payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      registration_number INT NOT NULL,
      month VARCHAR(20) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      status ENUM('paid', 'pending') NOT NULL,
      FOREIGN KEY (registration_number) REFERENCES Students(registration_number)
    )
  `;
  
  // Execute table creation queries
  db.query(createAdminsTable, (err) => {
    if (err) console.error('Error creating Admins table:', err.message);
    else console.log('Admins table created or already exists');
  });
  
  db.query(createStudentsTable, (err) => {
    if (err) console.error('Error creating Students table:', err.message);
    else console.log('Students table created or already exists');
  });
  
  db.query(createPaymentsTable, (err) => {
    if (err) console.error('Error creating Payments table:', err.message);
    else console.log('Payments table created or already exists');
    
    // Create a default super admin user if none exists
    createDefaultSuperAdmin();
  });
}

// Function to create default users (super admin and admin)
function createDefaultSuperAdmin() {
  const bcrypt = require('bcryptjs');
  const superAdminPassword = bcrypt.hashSync('superadmin123', 10);
  const adminPassword = bcrypt.hashSync('admin123', 10);
  
  // Check if super admin exists
  const checkSuperAdmin = `SELECT * FROM Admins WHERE role = 'superadmin' LIMIT 1`;
  db.query(checkSuperAdmin, (err, results) => {
    if (err) {
      console.error('Error checking for super admin:', err.message);
      return;
    }
    
    if (results.length === 0) {
      const createSuperAdmin = `
        INSERT INTO Admins (full_name, email, password, role) 
        VALUES ('Super Admin', 'superadmin@example.com', ?, 'superadmin')
      `;
      db.query(createSuperAdmin, [superAdminPassword], (err) => {
        if (err) console.error('Error creating default super admin:', err.message);
        else console.log('Default super admin created successfully');
      });
    }
  });
  
  // Check if regular admin exists
  const checkAdmin = `SELECT * FROM Admins WHERE role = 'admin' LIMIT 1`;
  db.query(checkAdmin, (err, results) => {
    if (err) {
      console.error('Error checking for admin:', err.message);
      return;
    }
    
    if (results.length === 0) {
      const createAdmin = `
        INSERT INTO Admins (full_name, email, password, role) 
        VALUES ('Admin User', 'admin@example.com', ?, 'admin')
      `;
      db.query(createAdmin, [adminPassword], (err) => {
        if (err) console.error('Error creating default admin:', err.message);
        else console.log('Default admin created successfully');
      });
    }
  });
}

module.exports = db;
