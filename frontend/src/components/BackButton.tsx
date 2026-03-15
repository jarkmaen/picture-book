import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    return (
        <button
            className="absolute active:scale-95 backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:text-white left-6 p-4 rounded-full text-white/80 top-6 transition z-10"
            onClick={() => window.history.back()}
            title="Go back"
        >
            <ArrowLeft size={32} />
        </button>
    );
};

export default BackButton;
