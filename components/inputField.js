//libraries imports
import styled from "styled-components";
//local imports

//types

export default function InputField({
  id,
  label,
  type,
  name,
  value,
  placeholder,
  defaultValue,
  required,
  disabled,
  success,
  error,
  errorMessage,
  helperText,
  adormentLeft,
  adormentRight,
  fullWidth,
  style,
  className,
  onChange,
}) {
  return (
    <InputContainer
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      adormentLeft={adormentLeft ? true : false}
      adormentRight={adormentRight ? true : false}
      style={style}
      className={className}
      aria-label="input"
    >
      <label htmlFor={id || ""} className="input-label">
        {label}
      </label>
      <div
        className={`input-container input-container__default ${
          error ? "input-container__error" : ""
        } ${success ? "input-container__success" : ""}`}
      >
        {adormentLeft && (
          <div className="adorment adorment__left">{adormentLeft}</div>
        )}
        <input
          id={id}
          type={type}
          name={name}
          role="textbox"
          aria-label={id || "input"}
          value={value}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          required={required && required === true ? true : false}
        />
        {adormentRight && (
          <div className="adorment adorment__right">{adormentRight}</div>
        )}
      </div>
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && errorMessage && <p className="error-message">{errorMessage}</p>}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  max-width: ${(props) =>
    props.fullWidth && props.fullWidth === true ? "100%" : "300px"};
  position: relative;
  margin-bottom: 10px;
  ${(props) =>
    props.disabled &&
    props.disabled === true &&
    `filter: grayscale(1);
    opacity: 0.5;`}
  .input-container {
    min-height: 48px;
    display: grid;
    ${(props) => props.adormentLeft && "grid-template-columns:auto 1fr;"}
    ${(props) => props.adormentRight && "grid-template-columns:1fr auto;"}
    ${(props) =>
      props.adormentRight &&
      props.adormentLeft &&
      "grid-template-columns:auto 1fr auto;"}
    background: ${(props) =>
      props.disabled && props.disabled === true
        ? "background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3));"
        : "#ffffff"};
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
  }
  .adorment {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    > img,
    svg,
    p,
    label {
      max-width: 50px;
    }
  }
  .adorment__left {
    padding: 0px 20px 0px 10px;
  }
  .adorment__right {
    padding: 0px 20px;
  }
  .input-container__default {
    border: 1px solid rgb(200 200 200 / 60%);
  }
  .input-container__success {
    border: 1px solid rgb(55 202 1 / 60%);
  }
  .input-container__error {
    border: 1px solid rgb(255 110 110 / 60%);
  }
  .input-label {
    margin-bottom: 6px;
    font-size: 0.875rem;
    display: inline-block;
  }
  .helper-text {
    margin: 5px 0 0 10px;
    font-size: 12px;
    color: #9e9e9e;
  }
  .error-message {
    margin: 5px 0 0 10px;
    font-size: 12px;
    font-style: oblique;
    color: #ff6e6e;
  }
  input[type="text"],
  input[type="password"],
  input[type="number"],
  input[type="email"] {
    border: 0;
    width: 100%;
    padding: 5px 0;
  }
`;
