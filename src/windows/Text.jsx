import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="bg-white flex flex-col h-full overflow-y-auto p-6 gap-4">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-cover rounded-lg"
          />
        )}

        {subtitle && <h3 className="text-lg font-semibold text-gray-700">{subtitle}</h3>}

        {description && Array.isArray(description) && (
          <div className="space-y-3 text-gray-600 text-sm">
            {description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
