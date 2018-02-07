const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
mongoose.connect(config.mongodb);

const Schema = mongoose.Schema;

const TodoScheme = new Schema({
    title: {
        type: String,
        required: [true, 'Todo Item is required']
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    modified_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    uid: String
}, { 
    collection: 'todos' 
}, {
    versionKey: false
});

var TodoModel = mongoose.model("Todo", TodoScheme);

// // 函数
// function Todo(title, completed) {
//     this.title = title;
//     this.completed = completed;
// };

// Todo.prototype.save = function (todo, callback) {
//     var todo = {
//         title: todo.title,
//         completed: todo.completed
//     };

//     var newTodo = new TodoModel(todo);

//     newTodo.save(function (err, todo) {
//         console.log('saved');
//         if (err) {
//             // return callback(err);
//         }
//         // callback(null, todo);
//     });
// };

// Todo.prototype.get = function (callback) {
//     TodoModel.find({ 'completed': false }, function (err, todos) {
//         if (err) {
//             // return callback(err);
//         }
//         // callback(null, todos);
//     });
// };

// Todo.prototype.getAll = function (callback) {
//     TodoModel.find(function (err, todos) {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, todos);
//     });
// };

// Todo.prototype.delete = function (id, callback) {
//     TodoModel.update({ '_id': id }, { 'completed': true }, function (err) {
//         if (err) {
//             return callback(err);
//         }
//         callback(null);
//     });
// };

module.exports = TodoModel;