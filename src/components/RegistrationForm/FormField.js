import React from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";

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
  icon 
}) {
  const colProps = {};
  if (lg) colProps.lg = lg;
  if (md) colProps.md = md;

  return (
    <Col {...colProps}>
      <FormGroup>
        <Label className="form-control-label d-flex align-items-center gap-1" htmlFor={id}>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </Label>

        {type === "select" ? (
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
        )}
      </FormGroup>
    </Col>
  );
}
