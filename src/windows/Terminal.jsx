import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants";
import { Check, Flag, ChevronRight } from "lucide-react";
import { WindowControls } from "#components";

const Terminal = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className="mobile-terminal">
        <p className="prompt">
          <span>@rifaz % </span>show tech stack
        </p>

        {techStack.map(({ category, items }) => (
          <div key={category} className="cat">
            <p className="cat-title">
              <ChevronRight size={16} />
              {category}
            </p>
            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  - {item}
                  {i < items.length - 1 ? "," : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal"/>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@rifaz % </span>
          show tech stack
        </p>

        <div className="label">
            <p className="w-32">Category</p>
            <p>Technologies</p>
        </div>

        <ul className="content">
            {techStack.map(({category, items}) => (
                <li key={category} className="flex item-center">
                    <Check className="check" size={20} />
                    <h3>{category}</h3>
                    <ul>
                        {
                            items.map((item,i) => (
                                <li key={i}>{item}{i<items.length - 1 ? "," : ""}</li>
                            ))
                        }
                    </ul>
                </li>
            ))}
        </ul>
        <div className="footnote">
            <p>
                <Check size={20}/> All stacks loaded successfully (100%)
            </p>

            <p className="text-black">
                <Flag size={15} fill="black"/>
                Render time: 6ms
            </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal", {
  mobileTitle: "Terminal",
});

export default TerminalWindow;
