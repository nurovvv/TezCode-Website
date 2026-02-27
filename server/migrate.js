const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data/tezcode.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log('Adding starter_code column to challenges table...');
    db.run("ALTER TABLE challenges ADD COLUMN starter_code TEXT;", (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) {
                console.log('Column already exists.');
            } else {
                console.error('Error:', err.message);
            }
        } else {
            console.log('Column added successfully.');
        }
    });
});

db.close();
