type Props = {
    percentage: number;
};

const LoadingScreen = ({ percentage }: Props) => {
    return (
        <div className="flex flex-col h-screen items-center justify-center w-screen">
            <div className="font-thin mb-4 text-6xl text-white tracking-tighter">
                {percentage}%
            </div>
            <div className="bg-white/10 h-0.5 overflow-hidden relative w-64">
                <div
                    className="bg-white duration-500 ease-out h-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="mt-4 text-[10px] text-white/30 tracking-[0.2em]">
                LADEN...
            </p>
        </div>
    );
};

export default LoadingScreen;
