import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { imageUrl, name } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="bg-white flex flex-col h-full overflow-auto p-4 items-center justify-center gap-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile", { mobileTitle: "Preview" });

export default ImageWindow;
