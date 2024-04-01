import { Schema} from 'mongoose'

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    dateStarted: {
        type: Date,
    },
    dateFinished: {
        type: Date,
    },
    noteBody: {
        type: String,
        required: true,
    }
})
export default NoteSchema