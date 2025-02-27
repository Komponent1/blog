import React from 'react';
import Tooltip from "../../steam/components/steam.components.tooltip";
/**
 * design copy below
 * https://github.com/tailwindtoolbox/Rainblur-Landing-Page/blob/main/index.html
 */
/**
 * Form Component
 * @param placeholder
 * @param buttonText
 * @param labelText
 * @param value
 * @param setValue
 * @param onSubmit
 * @param labelId
 */
type Props = {
  placeholder: string;
  buttonText: string;
  labelText: string;
  value: string;
  setValue: (value: string) => void;
  onSubmit: (value: string) => any | void;
  labelId: string;
};
const Form: React.FC<Props> = ({
  placeholder, buttonText, labelText, labelId = 'defaultId', onSubmit = () => {}, value, setValue,
}) => (
  <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <div className="flex align-center items-center mb-2">
        <label className="block text-blue-300 py-2 font-bold mr-2" htmlFor={labelId}>
          {labelText}
        </label>
        <Tooltip tooltipText="스팀 > 우측 상단 계정 > 계정정보 > 좌 상단 ID 확인" />
      </div>
      <input
        className="shadow-sm appearance-none border rounded-sm w-full p-3 text-gray-700 leading-tight focus:ring-3 transform transition hover:scale-105 duration-300 ease-in-out"
        id={labelId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (onSubmit) onSubmit(value);
          }
        }}
      />
    </div>

    <div className="flex items-center justify-between pt-4">
      <button
        onClick={() => onSubmit && onSubmit(value)}
        className="bg-linear-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded-sm focus:ring-3 transform transition hover:scale-105 duration-300 ease-in-out"
        type="button"
      >
        {buttonText}
      </button>
    </div>
  </form>
);

export default Form;
