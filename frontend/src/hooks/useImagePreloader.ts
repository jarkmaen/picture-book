import { useEffect, useState } from "react";

export const useImagePreloader = (images: string[]) => {
    const [loadedCount, setLoadedCount] = useState(0);

    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();

            img.src = src;

            img.decode()
                .then(() => setLoadedCount((prev) => prev + 1))
                .catch(() => setLoadedCount((prev) => prev + 1));
        });
    }, [images]);

    const isLoading = loadedCount < images.length;
    const percentage = Math.round((loadedCount / images.length) * 100);

    return { isLoading, percentage };
};
