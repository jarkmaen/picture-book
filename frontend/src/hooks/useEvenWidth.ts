import { useEffect, useState } from "react";

export const useEvenWidth = () => {
    const [width, setWidth] = useState<string>("100vw");

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;

            setWidth(w % 2 === 0 ? "100vw" : `${w - 1}px`);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};
