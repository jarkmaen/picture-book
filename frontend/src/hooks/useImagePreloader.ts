import { useEffect, useState } from "react";

export const useImagePreloader = (images: string[]) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const promises = images.map((src) => {
            return new Promise((resolve) => {
                const img = new Image();

                img.src = src;

                img.decode()
                    .then(() => resolve(src))
                    .catch(() => {
                        img.onerror = resolve;
                        img.onload = resolve;
                    });
            });
        });

        Promise.all(promises).then(() => setImagesLoaded(true));
    }, [images]);

    return imagesLoaded;
};
