import useWindowStore from "#store/window";
import { MobileTopBar } from "#components";
import useIsMobile from "#hooks/useIsMobile";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey, options = {}) => {
  const { mobileTitle, customMobileHeader = false } = options;

  const Wrapped = (props) => {
    const isMobile = useIsMobile();
    const { focusWindow, closeWindow, windows } = useWindowStore();
    const { isOpen, zIndex, data } = windows[windowKey];
    const ref = useRef(null);

    // Open animation (different feel for mobile vs desktop).
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      if (isMobile) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      } else {
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      }
    }, [isOpen, isMobile]);

    // Dragging is desktop-only. On mobile windows are full-screen pages.
    useGSAP(() => {
      const el = ref.current;
      if (!el || isMobile) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, [isMobile]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    const wrapperStyle = { zIndex };
    if (!isMobile && windowKey === "terminal") wrapperStyle.width = "800px";

    const resolvedTitle =
      typeof mobileTitle === "function" ? mobileTitle(data) : mobileTitle;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={wrapperStyle}
        className={clsx("absolute", isMobile && "mobile-window")}
      >
        {isMobile && !customMobileHeader && (
          <MobileTopBar
            title={resolvedTitle}
            onBack={() => closeWindow(windowKey)}
          />
        )}
        <Component {...props} isMobile={isMobile} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"}`;
  return Wrapped;
};

export default WindowWrapper;
