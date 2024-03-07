import User from '../models/user'
import { normalizeId, dbConnect } from './util/connection'

export async function create(username, password){
    if(!(username && password))
        throw new Error('Must include username and password')
    await dbConnect()

    const user = await User.create({username, password})

    if (!user)
        throw new Error ('Error creating user')
    
        return normalizeId(user)
}