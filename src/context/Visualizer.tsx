"use client";
import { AnimationArrayType, SortingAlforithmType } from "@/lib/types";
import {
  MAX_ANIMATION_SPEED,
  generateRandomNumberFromInterval,
} from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithm: SortingAlforithmType;
  setSelectedAlgorithm: (algorithm: SortingAlforithmType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationspeed: number;
  setAnimaionSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: (animation: AnimationArrayType) => void;
  requiresReset: boolean;
}

const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // -----------------------------------soting consts--------
  // getting the lines-bars
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlforithmType>("bubble");

  const [isSorting, setIsSorting] = useState<boolean>(false);

  // ----------------------------------------------------------
  //   the consts are in utils file, here we are initilisng with max_ani_speed
  const [animationspeed, setAnimaionSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const requiresReset = isAnimationComplete || isSorting;
  // -----------------------------------------BARS--------------------
  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);

    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) return;
    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 8;

    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++) {
      tempArray.push(
        generateRandomNumberFromInterval(100, maxLineHeight - 100)
      );
    }

    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);
    setTimeout(() => {
      const arrLines = document.getElementsByClassName("array-line");
      for (let i = 0; i < arrLines.length; i++) {
        arrLines[i].classList.remove("change-line-color");
        arrLines[i].classList.add("default-line-color");
      }
    }, 0);
  };

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationspeed) * 200;

    const arrayLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      });
    };

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined
    ) => {
      if (newHeight == undefined) return;
      arrayLines[lineIndex].style.height = `${newHeight}px`;
    };
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, "change-line-color", "default-line-color");
          setTimeout(() => {
            updateClassList(values, "default-line-color", "change-line-color");
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = values;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });
  };

  const value = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationspeed,
    setAnimaionSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requiresReset,
  };
  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);

  if (!context) {
    throw new Error(
      "useSrtingAlgorithmContext must be used within a SortingALgorithmProvider"
    );
  }
  return context;
};
