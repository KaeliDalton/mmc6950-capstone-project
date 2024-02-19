import { Schema, model, models} from 'mongoose'

const BookSchema = new Schema({
    title:  String,
    author: [String],
    description: String,
    imageLink:  String,
    pubYear:  Number,
    googleId: String,
})
export default models.Book || model('Book', BookSchema)