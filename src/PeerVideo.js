import { useEffect, useRef, useState } from 'react'
import './PeerVideo.css'
import Peer from 'peerjs'

export default function Peervideo() {


    const [initalView, setinitialView] = useState('initial')
    const meetId = useRef(null)
    const incommingVideo = useRef(null)
    const outgoingVideo = useRef(null)
    const [peerId,setPeerId] = useState(null)
    const currentPeer = useRef(null)
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');


    useEffect(() => {
        var peer = new Peer();
        
        peer.on('open', (id)=>{
            console.log(id)
            setPeerId(id)
        })
        

        peer.on('call',(call)=>{

            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            setinitialView('startCall')
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                outgoingVideo.current.srcObject = mediaStream;
                outgoingVideo.current.play();
                call.answer(mediaStream)
                console.log("call meta data",call.metadata," /n ",call)
                setRemotePeerIdValue(call.peer)
                call.on('stream',(remoteStream)=>{
                    incommingVideo.current.srcObject = remoteStream
                    incommingVideo.current.play();
                })
            });

        })

        currentPeer.current = peer;
        

    }, [])

    const onInputSubmitOrButtonClick = () => {
        console.log(remotePeerIdValue, "  jjjs")
        setinitialView('startCall')

        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        console.log("hello")
        getUserMedia({ video: true, audio: true},(mediaStream)=>{
            outgoingVideo.current.srcObject = mediaStream;
            outgoingVideo.current.play();
            
            const call = currentPeer.current.call(remotePeerIdValue,mediaStream)

            call.on('stream',(remoteStream)=>{
                incommingVideo.current.srcObject = remoteStream;
                incommingVideo.current.play();
            })

        })
        
        

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
                        <input onChange={e => setRemotePeerIdValue(e.target.value)} style={{ marginRight: '8px' }}></input>
                        <button onClick={() => { onInputSubmitOrButtonClick() }}>Submit</button>  </form></div>
            </div> :
                initalView == 'startCall' ? <div >
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "24px" }}> Welcome to Call Meet Id<b style={{marginLeft: "4px"}}>{remotePeerIdValue}</b></div>
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