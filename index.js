const pg = require('pg');
const client = new pg.Client('postgres://localhost/B31W_pet_finder_db');
const express = require('express');
const app = express();

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
            name VARCHAR(20)
        );
        INSERT INTO pets (name) VALUES ('Bella');
        INSERT INTO pets (name) VALUES ('Max');
        INSERT INTO pets (name) VALUES ('Charlie');
        INSERT INTO pets (name) VALUES ('Daisy');
        INSERT INTO pets (name) VALUES ('Rocky');
        INSERT INTO pets (name) VALUES ('Lucy');
        INSERT INTO pets (name) VALUES ('Buddy');
        INSERT INTO pets (name) VALUES ('Coco');
        INSERT INTO pets (name) VALUES ('Oliver');
        INSERT INTO pets (name) VALUES ('Luna');
    `;
    await client.query(SQL);
    console.log('tables created and data seeded!');
    
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> {
        console.log(`listening on port ${ port }`);
    }); 
};

setup();