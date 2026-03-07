import { useState } from "react";
import { walvis } from "./data/walvisInDeTuin";

const App = () => {
    const [currentSpread, setCurrentSpread] = useState(0);

    const nextSpread = () => {
        if (currentSpread < walvis.length - 1) {
            setCurrentSpread((prev) => prev + 1);
        }
    };

    const previousSpread = () => {
        if (currentSpread > 0) {
            setCurrentSpread((prev) => prev - 1);
        }
    };

    return (
        <div className="bg-black flex h-screen items-center justify-center w-screen">
            <img
                className="max-h-full object-contain"
                key={currentSpread}
                src={walvis[currentSpread]}
            />
            <div className="-translate-x-1/2 absolute bg-linear-to-r from-transparent inset-y-0 left-1/2 pointer-events-none to-transparent via-black/20 w-15 z-10" />

            <div className="absolute flex inset-0">
                <button className="h-full w-1/2" onClick={previousSpread} />
                <button className="h-full w-1/2" onClick={nextSpread} />
            </div>
        </div>
    );
};

export default App;
