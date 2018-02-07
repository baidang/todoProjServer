var express = require('express');
var router = express.Router();
var Todo = require('../models/todo2');

// 测试Item
router.get('/first', function (req, res, next) {
    res.json({ name: 'aaa', pwd: '123' });
});

// 获取所有Todo列表
router.get('/todos', (req, res, next) => {
    Todo.find({}).then(todos => {
        // res.json(todos);
        res.json({
            code: '0',
            msg: '获取Todos成功！',
            results: todos
        });
    }).catch( err => {
        res.json({
            code: 505,
            msg: '获取Todos失败！',
            err: err
        });
        next();
    });
});

// 获取单个 Todo Item 信息
router.get('/todo/:id', (req, res, next) => {
    var id = req.params.id;
    Todo.findById({ _id: id }).then(todo => {
        res.json({
            code: '0',
            msg:'获取单条Todo成功！',
            results: todo
        });
    }).catch(err => {
        res.json({
            code: 505,
            msg: '获取单条Todo失败！',
            err: err
        });
        next();
    });
});

// 添加一个 Todo Item
router.post('/todos', (req, res, next) => {
    console.log('请求成功');
    var todo = {
        title: req.body.title,
        completed: false
    };
    console.log(todo);
    Todo.create(todo).then(todo => {
        res.json({
            code: 0,
            msg: '添加成功！',
            result: todo
        });
    }).catch(err => {
        res.json({
            code: 505,
            msg: '添加失败',
            err: err
        });
        next();
    });
});

// 修改 Todo Item
router.post('/todos/:id', (req, res, next) => {
    var id = req.params.id;
    var status = req.body.status;
    var completed = req.body.completed;
    var title = req.body.title;

    if( status == 1 ) {
        Todo.update({ _id: id }, { title: title, completed: completed }).then(todo => {
            res.json({
                code: 0,
                msg: '修改成功！',
                result: todo
            });
        }).catch(err => {
            res.json({
                code: 505,
                msg: '修改失败',
                err: err
            });
            next();
        });
    }
    
    if(status == 2) {
        
        Todo.update({ _id: id }, { title: title }).then(todo => {
            res.json({
                code: 0,
                msg: '修改成功！',
                result: todo
            });
        }).catch(err => {
            res.json({
                code: 505,
                msg: '修改失败',
                err: err
            });
            next();
        });
    }
    
});

// 删除 Todo
router.get('/delete/:id', (req, res, next) => {
    var id = req.params.id;
    console.log("delete" + id);
    Todo.remove({ _id: id}).then( res => {
        res.json({
            code: 0,
            msg: '修改成功！'
        });
    }).catch( err => {
        // res.json({
        //     code: 505,
        //     msg: '删除失败',
        //     err: err
        // });
        // next();
    });
    res.send('ok');
});

// 删除 Todo
router.get('/deletedone', (req, res, next) => {
    Todo.remove({ completed: true }).then(res => {
        res.json({
            code: 0,
            msg: '删除所有'
        });
    }).catch(err => {
        // res.json({
        //     code: 505,
        //     msg: '删除失败',
        //     err: err
        // });
        // next();
    });
    res.send('ok');
});

module.exports = router;
