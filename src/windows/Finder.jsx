import { useEffect, useRef, useState } from "react";
import { WindowControls, MobileTopBar } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants";
import useLocationStore from "#store/location";
import { Search, ChevronRight } from "lucide-react";
import clsx from "clsx";
import useWindowStore from "#store/window";

// Virtual root that holds all top-level folders, shown as "Portfolio".
const ROOT = { name: "Portfolio", isRoot: true, children: Object.values(locations) };

const iconFor = (item) =>
  item.kind === "folder" ? "/images/folder.png" : item.icon;

const MobileFinder = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const finderState = windows.finder;
  const [stack, setStack] = useState([ROOT]);
  const wasOpen = useRef(false);

  // Reset / seed navigation whenever the Finder is (re)opened.
  useEffect(() => {
    if (finderState.isOpen && !wasOpen.current) {
      const type = finderState.data?.initialLocationType;
      if (type && locations[type]) setStack([ROOT, locations[type]]);
      else setStack([ROOT]);
    }
    wasOpen.current = finderState.isOpen;
  }, [finderState.isOpen, finderState.data]);

  const current = stack[stack.length - 1];

  const goBack = () => {
    if (stack.length > 1) setStack((s) => s.slice(0, -1));
    else closeWindow("finder");
  };

  const navTo = (index) => setStack((s) => s.slice(0, index + 1));

  const openItem = (item) => {
    if (item.kind === "folder") return setStack((s) => [...s, item]);
    if (item.fileType === "pdf") return openWindow("resume");
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <>
      <MobileTopBar title={current.name} onBack={goBack} />

      {stack.length > 1 && (
        <div className="finder-breadcrumb">
          {stack.map((loc, i) => (
            <span key={`${loc.name}-${i}`} className="crumb">
              {i > 0 && <ChevronRight size={14} />}
              <button type="button" onClick={() => navTo(i)}>
                {loc.name}
              </button>
            </span>
          ))}
        </div>
      )}

      <ul className="mobile-finder-grid">
        {current.children?.map((item) => (
          <li key={item.id} onClick={() => openItem(item)}>
            <img src={iconFor(item)} alt={item.name} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

const Finder = ({ isMobile }) => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  if (isMobile) return <MobileFinder />;

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>
              {Object.values(locations).map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveLocation(item)}
                  className={clsx(
                    item.id === activeLocation.id ? "active" : "not-active",
                  )}
                >
                  <img src={item.icon} alt={item.name} className="w-4" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>My Projects</h3>
            <ul>
              {locations.work.children.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveLocation(item)}
                  className={clsx(
                    item.id === activeLocation.id ? "active" : "not-active",
                  )}
                >
                  <img src={item.icon} alt={item.name} className="w-4" />
                  <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder", {
  customMobileHeader: true,
});

export default FinderWindow;
