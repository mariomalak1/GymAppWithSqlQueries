import {db} from "../../DB/db.connection.js";

async function getAllMembers(){
    const [members] = await db.query("SELECT * FROM member");
    return members;
}


