import React, { ReactElement } from "react";
import "./select.scss";

interface Props {
  id: string;
  name: string;
  inputs: {
    id: string;
    svg: () => ReactElement;
    text: string;
  }[];

  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const Select = (props: Props): ReactElement => {
  const getInputs = (): ReactElement[] => {
    return props.inputs.map((input) => (
      <input
        type="radio"
        name={props.name}
        id={input.id}
        onChange={() => props.setValue(input.id)}
        key={input.text}
      />
    ));
  };

  const getSVG = (value: string): ReactElement => {
    const input = props.inputs.find((input) => input.id === value);
    if (input?.svg) return <span className="wh">{input.svg()}</span>;
    return <></>; //сюда добавить что-то при ошибке
  };

  const getLabel = (): ReactElement[] => {
    return props.inputs.map((input) => (
      <li key={input.text}>
        <label htmlFor={input.id}>
          <span className="theme-popup__icons wh">{input.svg()}</span>
          <span>{input.text}</span>
        </label>
      </li>
    ));
  };

  return (
    <div className="theme-popup">
      {getInputs()}
      <input type="checkbox" id={props.id} />
      <label htmlFor={props.id} className="theme-popup__button">
        {getSVG(props.value)}
        {props.name}
      </label>

      <div className="theme-popup__list-container">
        <ul className="theme-popup__list" defaultValue={props.value}>
          {getLabel()}
        </ul>
      </div>
    </div>
  );
};

export default Select;
