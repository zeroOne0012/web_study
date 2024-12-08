import React, { useEffect, useRef } from 'react';

const getWebcam = () => {
  return new Promise((resolve, reject) => {
    const constraints = {
      video: true,
      audio: false
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => resolve(stream))
      .catch(err => reject(err));
  });
};

const Styles = {
  Video: { width: "80%", height: "50%", background: 'rgba(245, 240, 215, 0.5)' },
  None: { display: 'none' }
};

function Webcam() {
  const videoRef = useRef(null);

  useEffect(() => {
    const initializeWebcam = async () => {
      try {
        const stream = await getWebcam();
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        alert('웹캠에 액세스할 수 없습니다');
      }
    };

    initializeWebcam();

    // 언마운트 시 스트림 해제
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '3em' }}>
    <video ref={videoRef} autoPlay style={Styles.Video} />
    </div>
  );
}

export default Webcam;
