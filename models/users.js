const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

var users = new Schema({
    // _id: {
    //     type: Number
    // },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    birthdate: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        //required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true
    }
});

// users.plugin(autoIncrement.plugin, {
//     model: 'users',
//     startAt: 1
// });

mongoose.model('users', users);

let usersModel = {};

usersModel.model = mongoose.model('users');

// usersModel.isMailTaken = (email, callbackFn)=> {
//     usersModel.model.count({email: email}, (err, count)=>{
//        callbackFn(err, count);
//     });
// }

usersModel.isEmailTaken = (email)=>{
    return new Promise((resolve, reject)=>{
        usersModel.model.count({email: email}, (err, count)=>{
            if(!err){
                resolve(count);
            } else {
                reject("error");
            }
        });
    });
}

usersModel.isPhoneNumberTaken = (phone_number, callbackFn)=> {
    usersModel.model.count({phone_number: phone_number}, (err, count)=>{
       callbackFn(err, count); 
    });
}

usersModel.createNewUser = (userData, callbackFn)=> {
    let user = new usersModel.model(userData);
    user.save((err, doc)=> {
        callbackFn(err, doc);
    });
}

usersModel.findUserByPhoneNumber = (phone_number)=> {
    return new Promise((resolve, reject)=>{
        usersModel.model.findOne({phone_number: phone_number}, (err, result)=>{
            if(!err && result) {
                resolve(result);
            } else {
                reject(new Error('user is not found'));
            }
        });
    });
}

// users.pre('save', (next)=>{
//     usersModel.isEmailTaken(request.body.email).then((count)=>{
//         if(count > 0) {
//            throw new Error("duplicate email")
//         } else {
//             next(new Error("duplicate email"))
//         }
//     });
// })


module.exports = usersModel;
