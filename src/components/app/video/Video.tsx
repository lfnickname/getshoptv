import ReactPlayer from "react-player";
import React from "react";

interface VideoProps {
    status: boolean
}

const Video: React.FC<VideoProps> = ({status}) => {
    return (
        <ReactPlayer
        className='video'
        url={'https://www.youtube.com/embed/M7FIvfx5J10'}
        playing={status}
        width={1280}
        height={720}
        muted={true}
        controls={false}
      />
    )
}

export default Video