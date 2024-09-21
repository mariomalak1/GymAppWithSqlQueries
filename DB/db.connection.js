import {createPool} from "mysql2/promise";

export const db = await createPool(
    {
        host: "localhost",
        user: "root",
        password: "mario@mysql123",
        database: 'gym_app_pure_sql',
    }
);


db.query("SELECT 1")
    .then(() => {
        console.log("connection done");
    })
    .catch(err => {console.error(err)});
