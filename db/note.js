//I think this should create a note and add it to the user's profile but this controller possibly needs more work for proper implementation

import Note from './models/note'
import User from './models/user'
import dbConnect from './util/connection'

export async function create(title, author, dateStarted, dateFinished, noteBody, userId){
    if(!(title && author && noteBody))
        throw new Error('Must include title, author and note content')
    await dbConnect()

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
