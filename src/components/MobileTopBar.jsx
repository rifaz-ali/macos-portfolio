import { ChevronLeft } from "lucide-react";
import MobileStatusBar from "#components/MobileStatusBar.jsx";

// Full-width header used on top of every mobile "app" page.
// Renders the faux status bar, then a blue "Go Back" action + centered title.
const MobileTopBar = ({ title, onBack }) => {
  return (
    <div className="mobile-topbar">
      <MobileStatusBar />

      <div className="topbar-row">
        <button type="button" className="back" onClick={onBack}>
          <ChevronLeft size={20} />
          <span>Go Back</span>
        </button>
        <h2 className="title">{title}</h2>
        <span className="spacer" />
      </div>
    </div>
  );
};

export default MobileTopBar;
