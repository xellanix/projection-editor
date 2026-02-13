import { ContentResizer } from "@/components/core/content-resizer";
import { RemapperContainer } from "@/components/core/screen-remapper";
import { VideoPlayer } from "@/components/core/video-player";
import { Backcover } from "@/components/viewer";
import { useRetain } from "@/hooks/use-retain";
import { isTransparent } from "@/lib/background";
import { cn } from "@/lib/utils";
import { useProjectionStore } from "@/stores/projection.store";
import { bgTransitionVariants, useTransitionStore } from "@/stores/transition.store";
import type { ProjectionItem } from "@/types";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { memo, useMemo } from "react";

const BackcoverSwitcher = memo(function BackcoverSwitcher({ isShowBg }: { isShowBg: boolean }) {
    return (
        isShowBg && (
            <div className="animate-in fade-in absolute size-full duration-1000">
                <ContentResizer className="size-full">
                    <Backcover />
                </ContentResizer>
            </div>
        )
    );
});

const BackgroundAnimator = memo(function BackgroundAnimator({
    transition,
    isShowBg,
    background,
}: {
    transition: string;
    isShowBg: boolean;
    background: string;
}) {
    return (
        <AnimatePresence custom={transition}>
            <motion.div
                key={background}
                className="absolute h-full w-full"
                initial="enter"
                animate="center"
                exit="exit"
                custom={transition}
                variants={bgTransitionVariants}
                data-slot="background"
            >
                <ContentResizer className="h-full w-full">
                    <RemapperContainer>
                        {isShowBg && (
                            <VideoPlayer
                                src={background}
                                muted
                                autoPlay
                                loop
                                className="object-cover"
                            />
                        )}
                    </RemapperContainer>
                </ContentResizer>
            </motion.div>
        </AnimatePresence>
    );
});

interface SlideComposerProps {
    currentProjection: number;
    currentIndex: number;
}
export const SlideBackgroundComposer = memo(function SlideBackgroundComposer({
    currentProjection,
    currentIndex,
}: SlideComposerProps) {
    const background = useRetain(
        () => {
            if (currentProjection < 0 || currentIndex < 0) return;

            return useProjectionStore.getState().getBackground(currentProjection, currentIndex)[0];
        },
        [currentProjection, currentIndex],
        "",
    );
    // @ts-expect-error
    const isShowBg = true /* !isTransparent(background) */;

    const transition = useMemo(() => {
        return useTransitionStore.getState().getTransition(currentProjection, currentIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [background]);

    return (
        <>
            <BackcoverSwitcher isShowBg={isShowBg} />

            <BackgroundAnimator
                transition={transition}
                isShowBg={isShowBg}
                background={background}
            />
        </>
    );
});

export const SlideComposer = memo(function SlideComposer({
    currentProjection,
    currentIndex,
}: SlideComposerProps) {
    const getContents = useProjectionStore((s) => s.getContents);
    const content = useMemo(
        () => getContents(currentProjection)[currentIndex] ?? null,
        [currentIndex, getContents, currentProjection],
    );

    return (
        <RemapperContainer>
            <div
                className="relative flex size-full flex-col items-center justify-center gap-4"
                data-slot="composer-container"
            >
                {content && <SlideComposerContent content={content} />}
            </div>
        </RemapperContainer>
    );
});

const SlideComposerContent = memo(function SlideComposerContent({
    content,
}: {
    content: ProjectionItem;
}) {
    switch (content.type) {
        case "Video":
            return <VideoPlayer src={content.content} autoPlay loop muted />;
        case "Image":
            return (
                <img
                    src={content.content}
                    alt="Content Image"
                    className="size-full object-contain"
                />
            );
        case "Text":
            return (
                <span
                    className={cn("text-8xl font-bold text-white", content.options?.className)}
                    style={{ ...content.options?.style }}
                >
                    {content.content}
                </span>
            );
        case "Component":
            return content.content;
        default:
            return null;
    }
});
