import { useEffect, useRef, useState } from 'react'
import './PeerVideo.css'
import Peer from 'peerjs'

export default function Peervideo() {


    const [initalView, setinitialView] = useState('initial')
    const meetId = useRef(null)
    const incommingVideo = useRef(null)
    const outgoingVideo = useRef(null)
    const [peerId,setPeerId] = useState(null)


    useEffect(() => {
        


    }, [])

    const onInputSubmitOrButtonClick = () => {
        console.log(meetId?.current?.value, "  jjjs")
        setinitialView('startCall')
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        var peer = new Peer();
        
        peer.on('open', (peerid)=>{
            setPeerId(peerId)
        })

        
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
            outgoingVideo.current.srcObject = mediaStream;
            outgoingVideo.current.play();
            peer.on('call',(call)=>{
                call.answer(mediaStream)
                call.on('stream', function(remoteStream) {
                incommingVideo.current.srcObject = remoteStream
                incommingVideo.current.play();
                });
    
    
            })
            
        });
    }


    return (

        <>
            {initalView == 'initial' ? <div className=''>
                <div className='MeetHeading'>
                    <h1>Welcome to ATT Meets</h1>
                </div>

                <div className='contianerMain'><p>Have a Meeting ID Use it to enter a meet</p>
                    <form onSubmit={() => onInputSubmitOrButtonClick()}>
                        <label style={{ marginRight: '8px' }}>Please Enter the meeting id</label>
                        <input ref={meetId} style={{ marginRight: '8px' }}></input>
                        <button onClick={() => { onInputSubmitOrButtonClick() }}>Submit</button>  </form></div>
            </div> :
                initalView == 'startCall' ? <div >
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "24px" }}> Welcome to Call Meet Id<b>{meetId?.current?.value}</b></div>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <div className='incomingVideo'>
                            <video className='videoContainer' ref={incommingVideo}></video>
                        </div>


                    </div>
                    <div >
                        <div className='outgoingVideo'>
                            <video className="videoContainer" ref={outgoingVideo}></video>
                        </div>
                    </div>

                </div>

                    : " hekko"

            }


        </>
    )
}