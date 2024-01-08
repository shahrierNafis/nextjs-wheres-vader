import { create } from "zustand";

type MagnifierState = {
  XY: [x: number, y: number];
  setXY: ([x, y]: [number, number]) => void;

  XYpercent: [x: number, y: number];
  setXYpercent: ([x, y]: [number, number]) => void;

  clientXY: [x: number, y: number]; // relative to the viewport XY
  setClientXY: ([x, y]: [number, number]) => void;

  pageXY: [x: number, y: number]; // relative to the document
  setPageXY: ([x, y]: [number, number]) => void;

  imageSize: [Width: number, Height: number];
  setImageSize: ([w, h]: [number, number]) => void;

  image: React.RefObject<HTMLImageElement> | null;
  setImage: (image: React.RefObject<HTMLImageElement> | null) => void;
};

export const useMagnifierStore = create<MagnifierState>((set) => ({
  XY: [0, 0],
  setXY: ([x, y]) => set({ XY: [x, y] }),

  XYpercent: [0, 0],
  setXYpercent: ([x, y]) => set({ XYpercent: [x, y] }),

  clientXY: [0, 0],
  setClientXY: ([x, y]) => set({ clientXY: [x, y] }),

  pageXY: [0, 0],
  setPageXY: ([x, y]) => set({ pageXY: [x, y] }),

  imageSize: [0, 0],
  setImageSize: ([w, h]) => set({ imageSize: [w, h] }),

  image: null,
  setImage: (image) => set({ image }),
}));

type magnifierControllerState = {
  showMagnifier: boolean;
  setShowMagnifier: (showMagnifier: boolean) => void;

  magnifierIsUsed: boolean;
  setMagnifierIsUsed: (magnifierIsUsed: boolean) => void;

  magnifierSize: number;
  setMagnifierSize: (magnifierSize: number) => void;

  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
};

export const useMagnifierControllerStore = create<magnifierControllerState>(
  (set) => {
    return {
      showMagnifier: false,
      setShowMagnifier: (showMagnifier) => set({ showMagnifier }),

      magnifierIsUsed: true,
      setMagnifierIsUsed: (magnifierIsUsed) => set({ magnifierIsUsed }),
      magnifierSize: 0,
      setMagnifierSize: (magnifierSize) => set({ magnifierSize }),
      zoomLevel: 1.5,
      setZoomLevel: (zoomLevel) => set({ zoomLevel }),
    };
  }
);

type DropdownState = {
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
};

export const useDropdownStore = create<DropdownState>((set) => ({
  showDropdown: false,
  setShowDropdown: (showDropdown) => set({ showDropdown }),
}));
