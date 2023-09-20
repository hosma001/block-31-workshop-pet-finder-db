const pg = require('pg');
const client = new pg.Client('postgres://localhost/B31W_pet_finder_db');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

app.get('/api/v1/pets', async(req, res, next)=> {
    try {
        const SQL = `
            SELECT *
            FROM pets        
        `;
        const response = await client.query(SQL);
        res.send(response.rows);        
    } catch (ex) {
        next(ex);        
    }
});

const setup = async()=> {
    await client.connect();
    console.log('connected to the database');
    const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            is_favorite BOOLEAN
        );
        INSERT INTO pets (name, is_favorite) VALUES ('Bella', true);
        INSERT INTO pets (name, is_favorite) VALUES ('Max', false);
        INSERT INTO pets (name, is_favorite) VALUES ('Charlie', true);
        INSERT INTO pets (name, is_favorite) VALUES ('Daisy', false);
        INSERT INTO pets (name, is_favorite) VALUES ('Rocky', false);
        INSERT INTO pets (name, is_favorite) VALUES ('Lucy', false);
        INSERT INTO pets (name, is_favorite) VALUES ('Buddy', false);
        INSERT INTO pets (name, is_favorite) VALUES ('Coco', true);
        INSERT INTO pets (name, is_favorite) VALUES ('Oliver', true);
        INSERT INTO pets (name, is_favorite) VALUES ('Luna', false);
    `;
    await client.query(SQL);
    console.log('tables created and data seeded!');
    
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> {
        console.log(`listening on port ${ port }`);
    }); 
};

setup();