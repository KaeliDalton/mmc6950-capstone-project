import User from '../models/user'
import * as databaseActions from './util'

export async function create(username, password){
    if(!(username && password))
        throw new Error('Must include username and password')
    await databaseActions.dbConnect()

    const user = await User.create({username, password})

    if (!user)
        throw new Error ('Error creating user')
    
        return databaseActions.normalizeId(user)
}