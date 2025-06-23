import React, { useState } from "react";
import {
  Col,
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
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
  p,
  md,
  pattern,
  options,
  icon,
  readOnly=false
}) {
  const colProps = {};
  if (lg) colProps.lg = lg;
  if (md) colProps.md = md;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const selectedOption =
    type === "select" && options?.find((opt) => opt.value === value);

  const renderInput = () => {
    if (type === "select") {
      return (
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
          className="w-100"
        >
          <DropdownToggle
            caret
            className="form-control form-control-alternative d-flex align-items-center justify-content-between w-100 font-weight-normal"
            style={{
              backgroundColor: "#fff",
              borderColor: "#cad1d7",
              color: "#525f7f",
              height: "40px",
              width: "100%",
            }}
          >
            <div className="d-flex align-items-center">
              {selectedOption?.icon && (
                <span className="mr-2">{selectedOption.icon}</span>
              )}
              <span>{selectedOption?.label || placeholder || "Select"}</span>
            </div>
          </DropdownToggle>
          <DropdownMenu style={{ width: "100%" }}>
            {options.map((opt) => (
              <DropdownItem
                key={opt.value}
                onClick={() => onChange({ target: { id, value: opt.value } })}
                className="d-flex align-items-center"
              >
                {opt.icon && <span className="mr-2">{opt.icon}</span>}
                {opt.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }

    const inputElement = (
      <Input
        id={id}
        type={type}
        className="form-control-alternative"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        readOnly={readOnly}
      />
    );

    return icon ? (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-white border-0">{icon}</InputGroupText>
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
      <FormGroup className="d-flex flex-column align-items-start">
        <Label className="form-control-label" htmlFor={id}>
          {label}
        </Label>
        {renderInput()}
      </FormGroup>
    </Col>
  );
}
