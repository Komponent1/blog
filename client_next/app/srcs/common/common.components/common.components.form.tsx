import React from 'react';

/**
 * design copy below
 * https://github.com/tailwindtoolbox/Rainblur-Landing-Page/blob/main/index.html
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
      <label className="block text-blue-300 py-2 font-bold mb-2" htmlFor={labelId}>
        {labelText}
      </label>
      <input
        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        id={labelId}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>

    <div className="flex items-center justify-between pt-4">
      <button
        onClick={() => onSubmit && onSubmit(value)}
        className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        type="button"
      >
        {buttonText}
      </button>
    </div>
  </form>
);

export default Form;