"use client";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import ThemeSwitch from "./components/ThemeSwitch";
import { useEffect } from "react";
import { Slider } from "./components/Input/Slider";
import { Select } from "./components/Input/Select";
import { algorithmOptions, generateAnimationArray } from "@/lib/utils";
import { SortingAlforithmType } from "@/lib/types";
import { RxReset } from "react-icons/rx";
import { FaPlayCircle } from "react-icons/fa";

// getting the const from visulizer
export default function Home() {
  const {
    arrayToSort,
    isSorting,
    setAnimaionSpeed,
    animationspeed,
    setSelectedAlgorithm,
    selectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }

    //  generateAnimation array
    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlforithmType);
  };

  useEffect(() => {
    console.log("Selectd algos", selectedAlgorithm);
  }, [selectedAlgorithm]);
  return (
    <main className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="mt-5 lg:mx-72 mx-10  flex justify-between">
        <p className="text-gray-600  dark:text-violet-300 px-4 lg:px-14 text-[13px]">
          <a
            href="http://instagram.com/mb_viswanadh"
            className="border-b-2  border-green-500">
            @mb_viswanadh
          </a>
        </p>
        <ThemeSwitch />
      </div>
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4">
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-violet-800 lg:text-xl font-semibold lg:font-semibold dark:text-gray-300">
              Algo Sorting Visulizer
              <span className=" dark:text-violet-800 text-gray-500">/.</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              {/* --------------------------------------SLIDER----------------------- */}
              <Slider
                isDisabled={isSorting}
                value={animationspeed}
                handleChange={(e) => setAnimaionSpeed(Number(e.target.value))}
              />
              {/* -----------------------------------SELECTION------------------------- */}
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />

              {/* -------------------------------------BUTTON TO RESET-------------------- */}
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}>
                {requiresReset ? (
                  <RxReset className="text-gray-400 h-8 w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-8 w-8" />
                )}
              </button>
            </div>
          </div>
          {/* -----------------------------------------BARS------------------ */}
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute lg:bottom-[90px] bottom-[60px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
