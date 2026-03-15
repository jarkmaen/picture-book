import { Maximize, Minimize } from "lucide-react";

type Props = {
    containerRef: React.RefObject<HTMLDivElement | null>;
    isFullscreen: boolean;
};

const FullscreenButton = ({ containerRef, isFullscreen }: Props) => {
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <button
            className="absolute active:scale-95 backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:text-white p-4 right-6 rounded-full text-white/80 top-6 transition z-10"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
            {isFullscreen ? <Minimize size={32} /> : <Maximize size={32} />}
        </button>
    );
};

export default FullscreenButton;
