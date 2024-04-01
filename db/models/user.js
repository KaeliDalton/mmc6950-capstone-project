import { Schema, model, models} from 'mongoose'
import NoteSchema from './note'
import BookSchema from './book'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 200
    },
    notes: [NoteSchema],
    
    readBooks: [BookSchema],
})

UserSchema.pre('save', async function(next){
    if (this.isNew)
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default models.User || model('User', UserSchema)