import {
    insertTrainer,
    getAllTrainers,
    getSpecificTrainer,
    getAllTrainerMembers,
    getRevenuesOfTrainer,
    deleteTrainer,
    updateTrainer
} from "../Services/Trainer.services.js";

import {responseOfMissedData, requiredData} from "../Utils/filterRequestData.js"; 


export async function addTrainerController(req, res){
    const recordsAffected = await insertTrainer(req.body);
    if(recordsAffected === 0 || recordsAffected === null){
        return res.status(400).send({"msg":"please enter valid data"});
    }
    else{
        return res.status(201).send({msg:"created successfully"});
    }
}

export async function getAllTrainersController(req, res){
    const trainers = await getAllTrainers();
    return res.status(200).send(trainers);
}


export async function getSpecificTrainerController(req, res){
    const {id} = req.params;
    
    if(!id){
        return res.status(400).send("must provide an id");
    }

    const [trainer] = await getSpecificTrainer(id);

    if(!trainer){
        return res.status(404).send("no data found for this id");
    }

    return res.status(200).send(trainer);
}

export async function updateTrainerController(req, res){
    const {id} = req.params;
    
    if(!id){
        return res.status(400).send("must provide an id");
    }

    let trainer = await getSpecificTrainer(id);

    if(!trainer){
        return res.status(404).send("no data found for this id");
    }

    let arr = responseOfMissedData(requiredData(req.body, ["name"]));

    if(arr){
        if(arr.length > 0)
            return res.status(400).send({msg: arr});
    }

    const rowsAffected = await updateTrainer(id, req.body);
    if(rowsAffected === 0 || rowsAffected === null){
        return res.status(400).send("there's error in data");
    }
    trainer = await getSpecificTrainer(id);
    return res.status(200).send(trainer);
}

export async function deleteTrainerController(req, res){
    const {id} = req.params;
    
    if(!id){
        return res.status(400).send("must provide an id");
    }

    const trainer = await getSpecificTrainer(id);

    if(!trainer){
        return res.status(404).send("no data found for this id");
    }

    const rowsAffected = await deleteTrainer(id);

    if(rowsAffected === 0 || rowsAffected === null){
        return res.status(400).send("there's error in data");
    }

    return res.status(200).send("deleted successfully");
}

export async function getAllTrainerMembersController(req, res){
    let arr = responseOfMissedData(requiredData(req.body, ["trainerId"]));

    if(arr){
        if(arr.length > 0)
            return res.status(400).send({msg: arr});
    }

    const {trainerId} = req.body;

    const [trainer] = await getSpecificTrainer(trainerId);

    if (!trainer){
        return res.status(404).send({"msg":"trainer not found"});
    }

    const members = await getAllTrainerMembers(trainerId);
    return res.status(200).send({"msg": "done", "data": members});
}

export async function getAllRevenuesOfTrainerController(req, res){
    let arr = responseOfMissedData(requiredData(req.body, ["trainerId"]));

    if(arr){
        if(arr.length > 0)
            return res.status(400).send({msg: arr});
    }

    const {trainerId} = req.body;

    const [trainer] = await getSpecificTrainer(trainerId);

    if (!trainer){
        return res.status(404).send({"msg":"trainer not found"});
    }
    const [revenue] = await getRevenuesOfTrainer(trainerId);
    return res.status(200).send({"msg": revenue});
}

