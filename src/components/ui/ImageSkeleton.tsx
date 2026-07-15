'use client';

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps;

export default function ImageWithSkeleton(props: Props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && (
                <div className="absolute inset-0 overflow-hidden rounded-md bg-primary/80 dark:bg-gray-800">
                    <div className="h-full w-full animate-pulse bg-linear-to-r from-primary via-gray-100 to-secondary dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
                </div>
            )}

            <Image
                {...props}
                alt=""
                className={`${props.className ?? ""} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
                    }`}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
}