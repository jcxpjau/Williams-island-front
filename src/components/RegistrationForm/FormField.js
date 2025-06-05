import React from "react";
import {
  Col,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";

export function Field({
  label,
  id,
  value,
  placeholder,
  type = "text",
  onChange,
  lg,
  md,
  pattern,
  options,
  icon,
}) {
  const colProps = {};
  if (lg) colProps.lg = lg;
  if (md) colProps.md = md;

  const renderInput = () => {
    const inputElement =
      type === "select" ? (
        <Input
          type="select"
          id={id}
          value={value}
          onChange={onChange}
          className="form-control-alternative"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Input>
      ) : (
        <Input
          id={id}
          type={type}
          className="form-control-alternative"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          pattern={pattern}
        />
      );

    return icon && type !== "select" ? (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white border-0">
            {icon}
          </InputGroupText>
        </InputGroupAddon>
        {React.cloneElement(inputElement, {
          className: `${inputElement.props.className} border-left-0`,
        })}
      </InputGroup>
    ) : (
      inputElement
    );
  };

  return (
    <Col {...colProps}>
      <FormGroup>
        <Label className="form-control-label" htmlFor={id}>
          {label}
        </Label>
        {renderInput()}
      </FormGroup>
    </Col>
  );
}
