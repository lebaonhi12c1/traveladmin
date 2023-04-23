import React from "react";
import { memo } from "react";
function FormUpdate({ inputs, init, type }) {
  const getDestination = (value) => {
    switch (value) {
      case "Name":
        return init.name;
      case "OpeningDate":
        // console.log(String().split("T")[0])
        const date = Date(String(init.openingDate))
        return new Date(date).toISOString().split('T')[0];
      default:
        break;
    }
  };
  const getValue = (value) => {
    switch (type) {
      case "destination":
        return getDestination(value);
      default:
        break;
    }
  };
//   console.log(init)
  return (
    <div className="flex flex-col gap-4">
      {inputs.map((item, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <label htmlFor={item.label} className=" font-bold">{item.label}</label>
          <input
            defaultValue={getValue(item.label)}
            type={item.type}
            placeholder={item.placeholder}
            onChange={(e) => item.handler(e)}
            className={`border border-slate-200 rounded-sm p-2 focus-within:border-none focus-visible:outline focus-visible:outline-blue-500 ${item.label === "OpeningDate"?"cursor-pointer":""}`}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(FormUpdate);