import {useRouteError} from 'react-router-dom'

export default function Error(){

    const error=useRouteError()

  return  (<p>{JSON.stringify(error)} hii</p>)
}