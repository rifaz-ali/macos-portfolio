import { dockApps } from "#constants";
import useWindowStore from "#store/window";

// Apps that live on the home screen (the 2 that don't fit in the dock).
const HOME_APP_IDS = ["terminal", "trash"];
// Apps that stay in the bottom dock on mobile.
const DOCK_APP_IDS = ["finder", "safari", "photos", "contact"];

const pickApps = (ids) =>
  ids.map((id) => dockApps.find((app) => app.id === id)).filter(Boolean);

const MobileHome = () => {
  const { openWindow } = useWindowStore();

  const launch = (app) => {
    if (!app) return;

    // "Archive" (trash) opens the file browser straight into the Trash folder.
    if (app.id === "trash") {
      openWindow("finder", { initialLocationType: "trash" });
      return;
    }

    if (app.canOpen) openWindow(app.id);
  };

  const homeApps = pickApps(HOME_APP_IDS);
  const dockMobileApps = pickApps(DOCK_APP_IDS);

  return (
    <section id="mobile-home">
      <div className="home-apps">
        {homeApps.map((app) => (
          <button key={app.id} type="button" onClick={() => launch(app)}>
            <img src={`/images/${app.icon}`} alt={app.name} />
            <span>{app.name}</span>
          </button>
        ))}
      </div>

      <div className="home-welcome">
        <p>Hey, I'm Rifaz! welcome to my</p>
        <h1>portfolio.</h1>
      </div>

      <nav className="mobile-dock">
        {dockMobileApps.map((app) => (
          <button
            key={app.id}
            type="button"
            aria-label={app.name}
            onClick={() => launch(app)}
          >
            <img src={`/images/${app.icon}`} alt={app.name} />
          </button>
        ))}
      </nav>
    </section>
  );
};

export default MobileHome;
