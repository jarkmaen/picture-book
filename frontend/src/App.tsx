import HTMLFlipBook from "react-pageflip";
import React, { useRef } from "react";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { walvis } from "./data/walvisInDeTuin";

const Page = React.forwardRef<HTMLDivElement, { src: string }>((props, ref) => {
    return (
        <div className="bg-black flex h-full w-full" ref={ref}>
            <img
                className="h-full object-fill pointer-events-none w-full"
                src={props.src}
            />
        </div>
    );
});

const App = () => {
    const bookRef = useRef<any>(null);
    const imagesLoaded = useImagePreloader(walvis);

    if (!imagesLoaded) {
        return (
            <div className="bg-black flex h-screen items-center justify-center w-screen">
                <div className="animate-spin border-[3px] border-t-white/80 border-white/10 h-24 rounded-full w-24" />
            </div>
        );
    }

    return (
        <div className="bg-black flex flex-col h-screen items-center justify-center overflow-hidden w-screen">
            {/* @ts-ignore */}
            <HTMLFlipBook
                height={3661}
                ref={bookRef}
                showCover={false}
                size="stretch"
                width={3012}
            >
                {walvis.map((src, i) => (
                    <Page key={i} src={src} />
                ))}
            </HTMLFlipBook>
        </div>
    );
};

export default App;
