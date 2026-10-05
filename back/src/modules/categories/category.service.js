const repository = require("./category.repository");


const allowedTypes = [
    "INCOME",
    "EXPENSE",
    "BOTH"
];



async function getCategories(filters){

    return repository.findAll(filters);

}



async function getCategory(id){

    const category = await repository.findById(id);


    if(!category){

        throw new Error(
            "Category not found"
        );
    }


    return category;

}



async function createCategory(data){


    if(!data.name){

        throw new Error(
            "Category name is required"
        );
    }



    if(!allowedTypes.includes(data.type)){

        throw new Error(
            "Invalid category type"
        );
    }


    return repository.create(data);

}



async function updateCategory(id,data){

    return repository.update(
        id,
        data
    );

}



async function updateStatus(id,status){

    return repository.changeStatus(
        id,
        status
    );

}



module.exports = {

    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    updateStatus

};