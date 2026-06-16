import { ChevronLeft } from "lucide-react";

// Full-width header used on top of every mobile "app" page.
// Shows a blue "Go Back" action on the left and a centered title.
const MobileTopBar = ({ title, onBack }) => {
  return (
    <div className="mobile-topbar">
      <button type="button" className="back" onClick={onBack}>
        <ChevronLeft size={20} />
        <span>Go Back</span>
      </button>
      <h2 className="title">{title}</h2>
      <span className="spacer" />
    </div>
  );
};

export default MobileTopBar;
