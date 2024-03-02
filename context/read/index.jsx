import {useContext, createContext, useReducer} from 'react'
import initialState from './state'
import reducer from './reducer'

export const readContext = createContext()

export const useReadContext = () => {
    const context = useContext(readContext)
    if (context === undefined)
        throw new Error('useReadContext must be used within ReadProvider')
    return context
}

export const ReadProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <readContext.Provider {...props} value={[state, dispatch]} />
}