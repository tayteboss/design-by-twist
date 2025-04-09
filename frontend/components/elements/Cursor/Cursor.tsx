import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMousePosition } from "../../../hooks/useMousePosition";
import pxToRem from "../../../utils/pxToRem";

type Props = {
  cursorRefresh: () => void;
  appCursorRefresh: number;
};

type StyledProps = {
  $isActive?: boolean;
  $isOnDevice?: boolean;
  $rotation?: number;
};

const CursorWrapper = styled.div<StyledProps>`
  z-index: 1000;
  position: fixed;
  display: ${(props) => (props.$isOnDevice ? "none" : "block")};

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    display: none;
  }
`;

const CursorFloatingButton = styled(motion.div)<StyledProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 24px;
  left: 75px;
  height: 48px;
  width: 150px;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--colour-foreground);
  border-radius: 100px;
  color: var(--colour-black);
  opacity: ${(props) => (props.$isActive ? "1" : "0")};
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(30)};
  line-height: 1;
  white-space: nowrap;
  transform-origin: center left;

  transition:
    top 500ms ease,
    left 500ms ease,
    height 500ms ease,
    width 500ms ease,
    opacity 300ms ease;

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(
      135deg,
      rgba(255, 105, 180, 0.5) 0%,
      rgba(255, 0, 110, 0.5) 100%
    );
    filter: blur(50px);
    border-radius: 100px;
    opacity: 1;
    z-index: -1;
  }
`;

const CursorGalleryButton = styled(motion.div)<StyledProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 16px;
  left: 60px;
  height: 32px;
  width: 120px;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--colour-foreground);
  border-radius: 100px;
  color: var(--colour-black);
  opacity: ${(props) => (props.$isActive ? "1" : "0")};
  font-family: var(--font-holise-extra-light);
  font-size: ${pxToRem(22)};
  line-height: 1;
  white-space: nowrap;
  transform-origin: center left;

  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(
      135deg,
      rgba(255, 105, 180, 0.5) 0%,
      rgba(255, 0, 110, 0.5) 100%
    );
    filter: blur(20px);
    border-radius: 100px;
    opacity: 1;
    z-index: -1;
  }

  transition:
    top 500ms ease,
    left 500ms ease,
    height 500ms ease,
    width 500ms ease,
    opacity 300ms ease;
`;

const Cursor = ({ cursorRefresh, appCursorRefresh }: Props) => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isHoveringFloatingButton, setIsHoveringFloatingButton] =
    useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isOnDevice, setIsOnDevice] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isCursorGallery, setIsCursorGallery] = useState(false);
  const [isHoveringGallerySlide, setIsHoveringGallerySlide] = useState(false);

  const previousPosition = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const rotationTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastMoveTime = useRef<number>(Date.now());
  const resetDelay = 2000; // 0.2 seconds

  const router = useRouter();
  const position = useMousePosition();

  let mouseXPosition = position.x;
  let mouseYPosition = position.y;

  const ROTATION_SENSITIVITY = 0.2; // Adjust this value to control the tilt amount
  const RETURN_SPEED = 5; // Adjust this value to control how quickly it returns to level
  const STOP_DELAY = 500; // Adjust the delay (in milliseconds) before resetting rotation

  const calculateRotation = () => {
    const deltaX = mouseXPosition - previousPosition.current.x;
    const deltaY = mouseYPosition - previousPosition.current.y;

    // Check if there's any significant movement
    if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
      isMoving.current = true;
      clearTimeout(rotationTimeout.current as NodeJS.Timeout); // Clear any pending reset

      let targetRotation = 0;

      if (deltaY < 0) {
        // Moving up, tilt right
        targetRotation = deltaX * ROTATION_SENSITIVITY + 15;
      } else if (deltaY > 0) {
        // Moving down, tilt left
        targetRotation = deltaX * ROTATION_SENSITIVITY - 15;
      } else {
        // No vertical movement, base rotation on horizontal movement
        targetRotation = deltaX * ROTATION_SENSITIVITY;
      }

      // Smoothly return to level
      setRotation((prevRotation) => {
        const diff = targetRotation - prevRotation;
        return prevRotation + diff / RETURN_SPEED;
      });
    } else {
      // Cursor has stopped (or very little movement)
      // Set a timeout to reset the rotation after a short delay
      clearTimeout(rotationTimeout.current as NodeJS.Timeout);
      rotationTimeout.current = setTimeout(() => {
        setRotation(0);
        isMoving.current = false;
      }, STOP_DELAY);
    }

    previousPosition.current = { x: mouseXPosition, y: mouseYPosition };
  };

  const variantsWrapper = {
    visible: {
      x: mouseXPosition,
      y: mouseYPosition,
      rotate: rotation,
      transition: {
        type: "spring",
        mass: 0.01,
        stiffness: 200,
        damping: 10,
        overshootClamping: false,
        restDelta: 0.01,
        ease: "linear",
      },
    },
    hidden: {
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.01,
        stiffness: 200,
        damping: 10,
        overshootClamping: false,
        restDelta: 0.01,
        ease: "linear",
      },
    },
  };

  const clearCursor = () => {
    setIsHoveringLink(false);
    setIsOnDevice(false);
  };

  const findActions = () => {
    const aLinks = document.querySelectorAll("a");
    const cursorLinks = document.querySelectorAll(".cursor-link");
    const cursorGallery = document.querySelectorAll(".cursor-gallery");
    const floatingButtons = document.querySelectorAll(
      ".cursor-floating-button"
    );

    floatingButtons.forEach((button) => {
      const buttonCursorTitle = button.getAttribute("data-cursor-title");

      button.addEventListener("mouseenter", () => {
        setIsHoveringFloatingButton(true);
        if (buttonCursorTitle) {
          setCursorText(buttonCursorTitle);
        }
      });
      button.addEventListener("mouseleave", () => {
        setIsHoveringFloatingButton(false);
        setCursorText("");
        setRotation(0); // Reset rotation on leave
      });
      button.addEventListener("mouseup", () => {
        setIsHoveringFloatingButton(false);
        setCursorText("");
        setRotation(0); // Reset rotation on mouse up
      });
    });

    cursorGallery.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsCursorGallery(true);
      });
      link.addEventListener("mouseleave", () => {
        setIsCursorGallery(false);
      });
      link.addEventListener("mouseDown", () => {
        setIsCursorGallery(false);
      });
      link.addEventListener("mouseup", () => {
        setIsCursorGallery(false);
      });
    });

    cursorLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringLink(true);
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringLink(false);
      });
      link.addEventListener("mouseup", () => {
        setIsHoveringLink(false);
      });
    });

    aLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        setIsHoveringLink(true);
      });
      link.addEventListener("mouseleave", () => {
        setIsHoveringLink(false);
      });
      link.addEventListener("mouseup", () => {
        setIsHoveringLink(false);
      });
    });

    // checking if on a device
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setIsOnDevice(true);
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      setIsOnDevice(true);
    }
  };

  useEffect(() => {
    findActions();

    const timer = setTimeout(() => {
      findActions();
    }, 1000);

    return function cleanUp() {
      clearCursor();
      clearTimeout(timer);
    };
  }, [cursorRefresh, appCursorRefresh]);

  useEffect(() => {
    calculateRotation();
  }, [mouseXPosition, mouseYPosition]);

  // reset cursor on page change
  useEffect(() => {
    clearCursor();
    setRotation(0); // Reset rotation on page change
  }, [router.pathname, router.asPath, router.query.slug, cursorRefresh]);

  return (
    <>
      <CursorWrapper $isOnDevice={isOnDevice} className="cursor-wrapper">
        <CursorFloatingButton
          $isActive={isHoveringFloatingButton}
          variants={variantsWrapper}
          animate="visible"
          layout
        >
          {cursorText || ""}
        </CursorFloatingButton>
        <CursorGalleryButton
          $isActive={isCursorGallery}
          variants={variantsWrapper}
          animate={isCursorGallery ? "visible" : "hidden"}
          initial="hidden"
          exit="hidden"
          layout
        >
          {isGrabbing
            ? ""
            : isHoveringGallerySlide
              ? "See project"
              : "Drag to scroll"}
        </CursorGalleryButton>
      </CursorWrapper>
    </>
  );
};

export default Cursor;
