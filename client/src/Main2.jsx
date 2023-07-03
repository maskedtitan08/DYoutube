import React from 'react';

const Main = ({
  latestHash,
  latestTitle,
  uploadVideo,
  captureFile,
  videos,
  changeVideo
}) => {
  return (
    <div className="container-fluid text-monospace">
      <br></br>
      &nbsp;
      <br></br>
      <div className="row">
        <div className="col-md-10">
          <div
            className="embed-responsive embed-responsive-16by9"
            style={{ maxHeight: '768px' }}
          >
            <video src={`https://gateway.pinata.cloud/ipfs/${latestHash}`} controls></video>
          </div>
          <h3>
            <b>
              <i>{latestTitle}</i>
            </b>
          </h3>
        </div>
        <div
          className="col-md-2 border border-danger overflow-auto text-center"
          style={{ maxHeight: '768px', minWidth: '175px' }}
        >
          <h5>
            <b>Share Video</b>
          </h5>
          <form
            onSubmit={event => {
              event.preventDefault();
              const title = event.target.videoTitle.value;
              uploadVideo(title);
            }}
          >
            &nbsp;
            <input
              type="file"
              accept=".mp4, .mkv .ogg .wmv"
              onChange={captureFile}
              style={{ width: '250px' }}
            />
            <div className="form-group mr-sm-2">
              <input
                id="videoTitle"
                type="text"
                className="form-control-sm"
                placeholder="Title..."
                required
              />
            </div>
            <button type="submit" className="btn btn-danger btn-block btn-sm">
              Upload!
            </button>
            &nbsp;
          </form>
          {videos.map((video, key) => {
            return (
              <div
                className="card mb-4 text-center bg-secondary mx-auto"
                style={{ width: '175px' }}
                key={key}
              >
                <div className="card-title bg-dark">
                  <small className="text-white">
                    <b>{video.title}</b>
                  </small>
                </div>
                <div>
                  <p onClick={() => changeVideo(video.cid, video.title)}>
                    {/* <video src={`https://ipfs.infura.io/ipfs/${video.cid}`} style={{ width: '150px' }} /> */}
                    <video src={`https://gateway.pinata.cloud/ipfs/${video.cid}`} style={{ width: '150px' }} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
