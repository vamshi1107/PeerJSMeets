import { createContext, useEffect, useMemo, useState } from "react";
import Peer from 'peerjs'
import {v4 as uuidv4} from 'uuid'
export const PeerContext = createContext({})



export const PeerProvider = (props)=>{
    const [data,setData] = useState({})
    
    const userId = useMemo(()=>{
        if(sessionStorage?.getItem('userId'))
            return sessionStorage.getItem('userId')
        else{
            let randomId = uuidv4();
            sessionStorage.setItem('userId',randomId);
            return randomId;
        }
    })
    const peer =  useMemo(()=>new Peer(userId),[])
    const [userData,setUserData] = useState()

    useEffect(()=>{
        peer.on('open',(id)=>{
           console.log("id contenct ",id) 
           setData({currentId:id})
        })

        peer.on('call',(call)=>{
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia(({video}))
        })
    },[])
    

    return <PeerContext.Provider value={{peer,data,setData,userData,setUserData,userId}}>{props.children}</PeerContext.Provider>
}
