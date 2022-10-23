const { where } = require("sequelize");
const { connect } = require("./connectDB.js");
const Todo = require("./todoModel.js");

// Create Todo
const createTodo = async () => {
    try {
        await connect();
        const todo = await Todo.addTask({
            // title: "First Item",
            // title: "Second Item",
            title: "Third Item",
            dueDate: new Date(),
            completed: false,
        });
        console.log(`Created todo with ID : ${todo.id}`);
    } catch (error) {
        console.error(error);
    }
};

// Count how many todos are there
const countItems = async () => {
    try {
        const totalCount = await Todo.count();
        console.log(`Found ${totalCount} items in the table`);
    } catch (error) {
        console.error(error);
    }
}

// Get all todos
const getAllTodos = async () => {
    try {
        // const todos = await Todo.findAll({
        //     // condition based if you want then
        //     where: {
        //         completed: false
        //     },

        //     // in which order you want to see ASC (default: 1,2,3...)
        //     order: [
        //         ['id', 'DESC']  // DESC ...,3,2,1
        //     ]
        // });
        const todos = await Todo.findAll();
        const todoList = todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList);
    } catch (error) {
        console.error(error);
    }
}

// Get single todos
const getSingleTodo  = async () => {
    try {
        const todo = await Todo.findOne({
            // condition based if you want then
            where: {
                completed: false
            },

            // in which order you want to see ASC (default: 1,2,3...)
            order: [
                ['id', 'DESC']  // DESC ...,3,2,1
            ]
        });
        
        console.log(todo.displayableString());
    } catch (error) {
        console.error(error);
    }
}

// Update Item
const updateItem = async (id) => {
    try {
        // await Todo.update({completed: true}, {
        //     where: {
        //         id: id
        //     }
        // });
        await Todo.update({title: "Third Item"}, {
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(error);
    }
}

// Delete item
const deleteItem = async (id) => {
    try {
        const deleteRowCount = await Todo.destroy({
            where: {
                id: id
            }
        });
        console.log(`Deleted ${deleteRowCount} rows!`);
    } catch (error) {
        console.error(error);
    }
}

// Immediately Invoked Function Expression (IIFE) 👇
(async () => {
    await getAllTodos();
    await countItems();
})();

// (async () => {
//     // await createTodo();
//     // await countItems();
//     // await getSingleTodo();
//     await getAllTodos();
//     // await updateItem(3);
//     await deleteItem(3);
//     await getAllTodos();
// })();
