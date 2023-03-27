import {useEffect,useState} from 'react'
import { baseUrl, getRequest } from '../utils/service'

export const useFetchReciptUser =(chat,user) => {
    const [recipientUser, setRecipentUser] = useState(null)
    const [error,setError] = useState(null)

    const recipientId = chat?.members.find((id) => id !==user?._id)
   
    useEffect(() =>{
    const getUsers = async() =>{
        if(!recipientId) return null
        const response = await getRequest(`${baseUrl}/users/${recipientId})`)

        if(response.error)
        {
            return setError(error)
        }

        setRecipentUser(response)
    } 

    getUsers()
  },[])
  return {recipientUser}
}