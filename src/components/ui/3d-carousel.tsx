"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import AvatarCard from "@/components/avatar/AvatarCard";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1] };
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] };

const Carousel = memo(
  ({
    handleClick,
    controls,
    avatars,
    isCarouselActive,
  }: {
    handleClick: (avatar: any, index: number) => void;
    controls: any;
    avatars: any[];
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = avatars.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);
    const rotation = useMotionValue(0);
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`,
    );

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {avatars.map((avatar, i) => (
            <motion.div
              key={`key-${avatar.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(avatar, i)}
            >
              <motion.div
                layoutId={`avatar-${avatar.id}`}
                className="w-full h-full"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              >
                <AvatarCard
                  name={avatar.name}
                  description={avatar.description}
                  imageUrl={avatar.imageUrl}
                  niche={avatar.niche}
                  isNsfw={avatar.isNsfw}
                  subscriberCount={avatar.subscriberCount}
                  messageCount={avatar.messageCount}
                  likeCount={avatar.likeCount}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  },
);

export function ThreeDPhotoCarousel({ avatars }: { avatars: any[] }) {
  const [activeAvatar, setActiveAvatar] = useState<any | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();

  const handleClick = (avatar: any) => {
    setActiveAvatar(avatar);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveAvatar(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeAvatar && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`avatar-container-${activeAvatar.id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`avatar-${activeAvatar.id}`}
              className="w-full max-w-md"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: "transform" }}
            >
              <AvatarCard
                name={activeAvatar.name}
                description={activeAvatar.description}
                imageUrl={activeAvatar.imageUrl}
                niche={activeAvatar.niche}
                isNsfw={activeAvatar.isNsfw}
                subscriberCount={activeAvatar.subscriberCount}
                messageCount={activeAvatar.messageCount}
                likeCount={activeAvatar.likeCount}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[600px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          avatars={avatars}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}
