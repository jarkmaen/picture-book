import BackButton from "./components/BackButton";
import FullscreenButton from "./components/FullscreenButton";
import HTMLFlipBook from "react-pageflip";
import Page from "./components/Page";
import { useEvenWidth } from "./hooks/useEvenWidth";
import { useFullscreenState } from "./hooks/useFullscreenState";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useRef } from "react";
import { walvis } from "./data/walvisInDeTuin";

const App = () => {
    const bookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesLoaded = useImagePreloader(walvis);
    const isFullscreen = useFullscreenState();
    const width = useEvenWidth();

    if (!imagesLoaded) {
        return (
            <div className="bg-black flex h-screen items-center justify-center w-screen">
                <div className="animate-spin border-[3px] border-t-white/80 border-white/10 h-24 rounded-full w-24" />
            </div>
        );
    }

    return (
        <div
            className="bg-black flex flex-col h-screen items-center justify-center overflow-hidden w-screen"
            ref={containerRef}
        >
            <BackButton />
            <FullscreenButton
                containerRef={containerRef}
                isFullscreen={isFullscreen}
            />
            <div style={{ width: width }}>
                {/* @ts-ignore */}
                <HTMLFlipBook
                    height={1600}
                    ref={bookRef}
                    showCover={false}
                    size="stretch"
                    width={1316}
                >
                    {walvis.map((src, i) => (
                        <Page key={i} src={src} />
                    ))}
                </HTMLFlipBook>
            </div>
        </div>
    );
};

export default App;
