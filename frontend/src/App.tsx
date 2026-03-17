import BackButton from "./components/BackButton";
import FullscreenButton from "./components/FullscreenButton";
import HTMLFlipBook from "react-pageflip";
import Page from "./components/Page";
import { useEffect, useRef, useState } from "react";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { walvis } from "./data/walvisInDeTuin";

const App = () => {
    const [containerWidth, setContainerWidth] = useState<string>("100%");
    const [isFullscreen, setIsFullscreen] = useState(false);

    const bookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesLoaded = useImagePreloader(walvis);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width % 2 === 0) {
                setContainerWidth("100vw");
            } else {
                setContainerWidth(`${width - 1}px`);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleChange);

        return () =>
            document.removeEventListener("fullscreenchange", handleChange);
    }, []);

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
            <div style={{ width: containerWidth }}>
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
