const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        maxLength: [25, 'Category name cannot exceed 25 characters']
    },
    gender: {
        type: String,
        required: true,
        enum: [
            'Male',
            'Female',
            'male',
            'female'
        ]
    }
}, {
    timestamps: true
})

CategorySchema.pre('save', function(next) {
    this.categoryName = this.categoryName.toUpperCase()

    next()
})

CategorySchema.post('save', function(next) {
    this.gender = this.gender.toLowerCase()
})

module.exports = mongoose.model('Category', CategorySchema)