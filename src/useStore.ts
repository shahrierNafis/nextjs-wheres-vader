import { create } from "zustand";

type Coordinates = {
  XY: [x: number, y: number];
  setXY: ([x, y]: [number, number]) => void;

  XYpercent: [x: number, y: number];
  setXYpercent: ([x, y]: [number, number]) => void;

  clientXY: [x: number, y: number]; // relative to the viewport XY
  setClientXY: ([x, y]: [number, number]) => void;
};

export const useCoordinatesStore = create<Coordinates>((set) => ({
  XY: [0, 0],
  setXY: ([x, y]) => set({ XY: [x, y] }),

  XYpercent: [0, 0],
  setXYpercent: ([x, y]) => set({ XYpercent: [x, y] }),

  clientXY: [0, 0],
  setClientXY: ([x, y]) => set({ clientXY: [x, y] }),
}));

type magnifierState = {
  showMagnifier: boolean;
  setShowMagnifier: (showMagnifier: boolean) => void;

  imageSize: [Width: number, Height: number];
  setImageSize: ([w, h]: [number, number]) => void;

  magnifierIsUsed: boolean;
  setMagnifierIsUsed: (magnifierIsUsed: boolean) => void;

  magnifierSize: number;
  setMagnifierSize: (magnifierSize: number) => void;

  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
};

export const useMagnifierStore = create<magnifierState>((set) => ({
  showMagnifier: false,
  setShowMagnifier: (showMagnifier) => set({ showMagnifier }),
  imageSize: [0, 0],
  setImageSize: ([w, h]) => set({ imageSize: [w, h] }),
  magnifierIsUsed: true,
  setMagnifierIsUsed: (magnifierIsUsed) => set({ magnifierIsUsed }),
  magnifierSize: innerWidth / 3,
  setMagnifierSize: (magnifierSize) => set({ magnifierSize }),
  zoomLevel: 1.5,
  setZoomLevel: (zoomLevel) => set({ zoomLevel }),
}));

type DropdownState = {
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
};

export const useDropdownStore = create<DropdownState>((set) => ({
  showDropdown: false,
  setShowDropdown: (showDropdown) => set({ showDropdown }),
}));
