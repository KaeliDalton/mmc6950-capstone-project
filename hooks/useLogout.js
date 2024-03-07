import user from '@/db/models/user'
import {useRouter} from 'next/router'

export default function useLogout(){
    const router = useRouter()
    return async function handleLogout(){
        try {
            const res = await fetch('/api/auth/logout', {method: 'POST'})
            if (res.status === 200)
            router.replace(router.asPath)
        } catch(err){
            console.log(err)
        }
    }
}