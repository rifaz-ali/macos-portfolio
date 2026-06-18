import { useEffect, useState } from "react";
import { Wifi } from "lucide-react";
import dayjs from "dayjs";

// Faux phone status bar: time on the left, a "notch" pill in the center,
// and wifi + battery icons on the right.
const MobileStatusBar = () => {
  const [time, setTime] = useState(() => dayjs().format("h:mm A"));

  useEffect(() => {
    const id = setInterval(() => setTime(dayjs().format("h:mm A")), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mobile-statusbar">
      <span className="status-left">{time}</span>

      <span className="status-notch" />

      <span className="status-right">
        <Wifi className="wifi" />
        <span className="battery">
          <span className="battery-level" />
          <span className="battery-pin" />
        </span>
      </span>
    </div>
  );
};

export default MobileStatusBar;
