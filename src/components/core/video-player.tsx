import { cn } from "@/lib/utils";
import { memo, type DetailedHTMLProps } from "react";

type VideoPlayerProps = DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
>;

const VideoPlayer = memo(function VideoPlayer({ className, ...props }: VideoPlayerProps) {
    return <video {...props} className={cn("size-full", className)} />;
});
export { VideoPlayer };
