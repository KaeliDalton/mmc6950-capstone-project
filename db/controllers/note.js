import Note from '../models/note'
import User from '../models/user'
import * as databaseActions from './util'

export async function create(title, author, dateStarted, dateFinished, noteBody, userId){
    if(!(title && author && noteBody))
        throw new Error('Must include title, author and note content')
    await databaseActions.dbConnect()

    const note = await Note.create({title, author, dateStarted, dateFinished, noteBody})

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $addToSet: {notes: note}
        },
        {new: true}
    )

    if (!user)
        throw new Error ('Error creating note')
        return note
}
