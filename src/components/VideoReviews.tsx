'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoReview {
  id: string;
  title: string;
  thumbnail?: string;
  videoUrl: string;
}

interface VideoReviewsProps {
  videos: VideoReview[];
}

export default function VideoReviews({ videos }: VideoReviewsProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});

  useEffect(() => {
    const cleanupFns: (() => void)[] = [];

    videos.forEach((video) => {
      if (!video.thumbnail) {
        const videoEl = document.createElement('video');
        videoEl.src = video.videoUrl;
        videoEl.crossOrigin = 'anonymous';
        videoEl.muted = true;
        videoEl.preload = 'metadata';

        const handleLoadedMetadata = () => {
          videoEl.currentTime = 0;
        };

        const handleSeeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = videoEl.videoWidth;
          canvas.height = videoEl.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(videoEl, 0, 0);
            setThumbnails((prev) => ({
              ...prev,
              [video.id]: canvas.toDataURL('image/jpeg', 0.8),
            }));
          }
        };

        const handleCanPlay = () => {
          if (videoEl.currentTime === 0) {
            const canvas = document.createElement('canvas');
            canvas.width = videoEl.videoWidth;
            canvas.height = videoEl.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(videoEl, 0, 0);
              setThumbnails((prev) => ({
                ...prev,
                [video.id]: canvas.toDataURL('image/jpeg', 0.8),
              }));
            }
          }
        };

        videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);
        videoEl.addEventListener('seeked', handleSeeked);
        videoEl.addEventListener('canplay', handleCanPlay);

        const cleanup = () => {
          videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
          videoEl.removeEventListener('seeked', handleSeeked);
          videoEl.removeEventListener('canplay', handleCanPlay);
        };
        cleanupFns.push(cleanup);
      }
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [videos]);

  if (!videos || videos.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-slate-800 text-white text-xs font-black px-3 py-1 rounded-full shadow-md whitespace-nowrap">
              Incluido en el kit
            </div>
            <button
              onClick={() => setSelectedVideo(video.id)}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full"
            >
            {(video.thumbnail || thumbnails[video.id]) && (
              <img
                src={video.thumbnail || thumbnails[video.id]}
                alt={video.title}
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </div>
          </button>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video player */}
            <div style={{ paddingBottom: '56.25%', position: 'relative', height: 0 }}>
              <video
                autoPlay
                controls
                muted
                controlsList="nofullscreen novolume"
                ref={(el) => { if (el) el.volume = 0; }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                src={videos.find((v) => v.id === selectedVideo)?.videoUrl}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
