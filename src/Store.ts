import create from "zustand";
import {
  ObjectHexa,
  ObjectHsla,
  ObjectRgba,
} from "./colorHelpers/colorObjectsInterfaces";
import { rgbaObjectToHexaString } from "./colorHelpers/rgbaObjectToHexaString";
import { rgbaObjectToHslaObject } from "./colorHelpers/rgbaObjectToHslaObject";
import { ColorModeType } from "./appLibrary";

interface UseStore {
  actualRGBAColorValue: ObjectRgba;
  actualHSLAColorValue?: ObjectHsla;
  actualHexAColorValue?: string;
  setActualRGBAColorValue: (newColorValue: ObjectRgba) => void;
  setActualHSLAColorValue: (newColorValue: ObjectRgba) => void;
  setActualHexAColorValue: (newColorValue: ObjectRgba) => void;
}

export const useStore = create<UseStore>((set) => ({
  actualRGBAColorValue: { r: 0, g: 0, b: 0, a: 100 },
  actualHSLAColorValue: undefined,
  actualHexAColorValue: undefined,
  setActualRGBAColorValue: (newColorValue: ObjectRgba) =>
    set((state) => ({ actualRGBAColorValue: newColorValue })),
  setActualHSLAColorValue: () =>
    set((state) => ({
      actualHSLAColorValue: rgbaObjectToHslaObject(state.actualRGBAColorValue),
    })),
  setActualHexAColorValue: () =>
    set((state) => ({
      actualHexAColorValue: rgbaObjectToHexaString(state.actualRGBAColorValue),
    })),
}));
