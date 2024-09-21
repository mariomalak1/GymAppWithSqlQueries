import {db} from "../../DB/db.connection.js";

export async function getAllTrainers(){
    const [records] = await db.query("SELECT * FROM trainer");
    return records;
}

export async function getAllTrainerMembers(trainerID){
    const [membersOfTrainer] = await db.query("SELECT * FROM member where trainer_id = ?", [trainerID]);
    return membersOfTrainer;
}

export  async function updateTrainer(trainerID, trainerData){
    if(!trainerData){
        return null;
    }

    let trainerDataArray = [];
    
    let sqlQuery = "update trainer set ";
    
    if(trainerData.name){
        sqlQuery += "name = ? ";
        trainerDataArray.push(trainerData.name);
    }
    if(trainerData.from){
        sqlQuery += ", `from` = ? ";
        trainerDataArray.push(trainerData.from);
    }
    if(trainerData.to){
        sqlQuery += ", `to` = ? ";
        trainerDataArray.push(trainerData.to);
    }

    if(trainerDataArray.length === 0){
        return null;
    }

    // add id to array and to sql query
    sqlQuery += "where id = ?;";
    trainerDataArray.push(trainerID);

    const [result] = await db.query(sqlQuery, trainerDataArray);
    return result.affectedRows;
}


export async function deleteTrainer(trainerID){
    let sqlQuery = "delete from trainer where id = ?";
    const [result] = await db.query(sqlQuery, [trainerID]);
    return result.affectedRows;
}

export async function getSpecificTrainer(trainerID) {
    const [records] = await db.query("SELECT * FROM trainer where id = ?", [trainerID]);
    return records;
}


export async function insertTrainer(trainerData) {
    if(!trainerData.name){
        return null;
    }

    let sqlQuery = "insert into trainer (name ";
    let values = " VALUES (?";
    let trainerDataArray = [trainerData.name];

    if (trainerData.from){
        sqlQuery += ", `from`";
        values += ", ?";
        trainerDataArray.push(trainerData.from);
    }
    
    if (trainerData.to){
        sqlQuery += ", `to`";
        values += ", ?";
        trainerDataArray.push(trainerData.to);
    }
    values += ")"; 
    sqlQuery += `) ${values};`;
    const [result] = await db.query(sqlQuery, trainerDataArray);
    return result.affectedRows;
}


export async function getRevenuesOfTrainer(trainerID){
    let sqlQuery = "select sum(ms.cost) revenue from trainer t, `member` m, `membership` ms where t.id = ? and m.trainer_id = t.id and ms.id = m.membership_id;"
    const [result] = await db.query(sqlQuery, [trainerID]);
    return result;
}

