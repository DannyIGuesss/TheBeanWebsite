const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')






const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },

    lastName: {
        type: String,
        required: [true, 'last name is required']
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        validate:[isEmail, 'Invalid Email']
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Password must be 8 characters or longer"]
    }
},{timestamps: true})

//middleware

// add this after UserSchema is defined
CustomerSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

CustomerSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

//bcrypt
CustomerSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
    next();
    });
});



module.exports = mongoose.model("Customer", CustomerSchema)