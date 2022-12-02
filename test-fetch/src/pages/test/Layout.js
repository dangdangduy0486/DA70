import { Player } from "video-react";
import ReactHlsPlayer from "react-hls-player";
import { useRef } from "react";

const Layout = () => {
  const playerRef = useRef();
  function playVideo() {
    console.log("clicked");
    playerRef.current.play();
  }
  let html = [];
  for (let i = 0; i < 10; i++) {
    // html.push(`<div class="row bg-primary">`);
    for (let j = 0; j < 20; j++) {
      //   html += `<div class="col bg-secondary mt-2 mb-2">`;
      //   html += "</div>";
      html.push(
        // <div class="col bg-secondary mt-2 mb-2">
        <ReactHlsPlayer
          src="https://cloudcam.svtech.com.vn:8069/V8FZGKsHxrvMwJLNZX9FORVwvzNncVgX/finelife_rivi_cam41/playlist.m3u8"
          autoPlay={true}
          controls={true}
          width="20%"
          height="auto"
          // playerRef={playerRef}
          hlsConfig={{
            autoStartLoad: true,
          }}
        />
        // </div>
      );
    }
    // html.push("</div>");
  }
  return (
    <>
      {/* <div
        className="container-fluid"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div> */}
      <div>
        <button onClick={() => playVideo}>Click me</button>
      </div>
      <div className="container">{html}</div>
    </>
  );
};

export default Layout;
