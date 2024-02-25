import { MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED } from "@/lib/utils";

// export const Slider = ({
//   min = MIN_ANIMATION_SPEED,
//   max = MAX_ANIMATION_SPEED,
//   step = 10,
//   value,
//   handleChange,
//   isDisabled = false,
// }: {
//   min?: number;
//   max?: number;
//   step?: number;
//   value: number;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   isDisabled?: boolean;
// }) => {
//   return (
//     <div className="flex gap-2 items-center justify-center">
//       <span className="text-violet-800 lg:text-xl lg:font-semibold dark:text-gray-300">
//         Slow
//       </span>
//       <input
//         disabled={isDisabled}
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => handleChange(e)}
//         className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
//       />
//       <span className="text-violet-800 lg:text-xl lg:font-semibold dark:text-gray-300">
//         Fast
//       </span>
//     </div>
//   );
// };

export const Slider = ({
  min = MIN_ANIMATION_SPEED,
  max = MAX_ANIMATION_SPEED,
  step = 10,
  value,
  handleChange,
  isDisabled = false,
}: {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start sm:justify-start gap-2">
      <span className="text-violet-800 lg:text-xl lg:font-semibold font-semibold dark:text-gray-300 sm:mb-0">
        Slow
      </span>
      <input
        disabled={isDisabled}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(e)}
        className="w-full h-2 rounded-lg lg:mt-3 appearance-none cursor-pointer bg-gray-700"
      />
      <span className="text-violet-800 lg:text-xl font-semibold lg:font-semibold dark:text-gray-300 sm:mt-0">
        Fast
      </span>
    </div>
  );
};
