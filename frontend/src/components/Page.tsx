import React from "react";

type Props = {
    src: string;
};

const Page = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div className="bg-black flex h-full w-full" ref={ref}>
            <img
                className="h-full object-fill pointer-events-none w-full"
                src={props.src}
            />
        </div>
    );
});

export default Page;
