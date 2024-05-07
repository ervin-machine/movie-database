import React from "react";
import YouTube from "react-youtube";

type youtubePlayerProps = {
    videoID: any;
  }

const YoutubePlayer = (props: youtubePlayerProps) => {
  const { videoID } = props;

  const opts = {
    width: "100%",
    borderRadius: "2rem",
    playerVars: { autoplay: 1 },
  };

  const videoReady = (event: any) => {
    event.target.pauseVideo();
  };

  return (
    <>
      <div>
        <div
          style={{
            maxWidth: "500px",
            margin: "auto",
            marginTop: "12px",
            minHeight: "30vh",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <YouTube
            videoId={videoID}
            opts={opts}
            onReady={videoReady}
          />
        </div>
      </div>
    </>
  );
};

export default YoutubePlayer;