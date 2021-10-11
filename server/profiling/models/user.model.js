var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var userSchema = new Schema({
    uid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    workplace: {
        type: String,
        require: true
    },
    sector: {
        type: String,
        require: true
    },
    industry: {
        type: String,
        require: true
    },
    occupation: {
        type: String,
        require: true
    },
    education: {
        type: String,
        require: true
    },
    income: {
        type: Number,
        require: true
    },
    supportdoc: {
        type: String,
        require: false
    },
    music: {
        type: String,
        require: true
    },
    pets: {
        type: String,
        require: true
    },
    smoke: {
        type: String,
        require: true
    },
    luggage: {
        type: String,
        require: true
    },
    vmake: {
        type: String,
        require: true
    },
    vtype: {
        type: String,
        require: true
    },
    vmodel: {
        type: String,
        require: true
    },
    myear: {
        type: String,
        require: true
    },
    ryear: {
        type: String,
        require: true
    },
    cylinders: {
        type: Number,
        require: true
    },
    fuel: {
        type: String,
        require: true
    },
    enginecc: {
        type: Number,
        require: true
    },
    enginep: {
        type: Number,
        require: true
    },
    mileage: {
        type: Number,
        require: true
    },
    interests: {
        type: String,
        require: false
    },
    clusterid: {
        type: String,
        require: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    logged: {
        type: Boolean,
        require: false
    }
})

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)