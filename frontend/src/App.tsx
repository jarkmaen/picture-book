import BackButton from "./components/BackButton";
import FullscreenButton from "./components/FullscreenButton";
import HTMLFlipBook from "react-pageflip";
import LoadingScreen from "./components/LoadingScreen";
import Page from "./components/Page";
import { useEvenWidth } from "./hooks/useEvenWidth";
import { useFullscreenState } from "./hooks/useFullscreenState";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useRef } from "react";
import { walvis } from "./data/walvisInDeTuin";

const App = () => {
    const bookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isFullscreen = useFullscreenState();
    const width = useEvenWidth();
    const { isLoading, percentage } = useImagePreloader(walvis);

    if (isLoading) {
        return <LoadingScreen percentage={percentage} />;
    }

    return (
        <div
            className="flex flex-col h-screen items-center justify-center overflow-hidden w-screen"
            ref={containerRef}
        >
            <BackButton />
            <FullscreenButton
                containerRef={containerRef}
                isFullscreen={isFullscreen}
            />
            {/* @ts-ignore */}
            <HTMLFlipBook
                height={1600}
                ref={bookRef}
                showCover={false}
                size="stretch"
                style={{ width: width }}
                width={1316}
            >
                {walvis.map((src, i) => (
                    <Page key={i} src={src} />
                ))}
            </HTMLFlipBook>
        </div>
    );
};

export default App;
