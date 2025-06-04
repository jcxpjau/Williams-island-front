import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Col,
} from "reactstrap";

const COLORS = [
  { name: "Red", value: "#e74c3c" },
  { name: "Orange", value: "#e67e22" },
  { name: "Yellow", value: "#f1c40f" },
  { name: "Green", value: "#2ecc71" },
  { name: "Blue", value: "#3498db" },
  { name: "Purple", value: "#9b59b6" },
  { name: "Pink", value: "#fd79a8" },
  { name: "Teal", value: "#1abc9c" },
  { name: "Gray", value: "#95a5a6" },
];

export function ColorPicker({
  label,
  id,
  value,
  onChange,
  lg,
  md,
  icon,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prev) => !prev);

  const selected = COLORS.find((c) => c.value === value);

  const colProps = {};
  if (lg) colProps.lg = lg;
  if (md) colProps.md = md;

  return (
    <Col {...colProps}>
      <Label className="form-control-label d-flex align-items-center gap-1" htmlFor={id}>
        {icon && <span className="me-1">{icon}</span>}
        {label}
      </Label>

      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          caret
          className="form-control form-control-alternative d-flex align-items-center justify-content-between"
          style={{
            backgroundColor: "#fff",
            borderColor: "#cad1d7",
            color: "#525f7f",
            height: "40px",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <span
              style={{
                backgroundColor: selected?.value,
                width: "16px",
                height: "16px",
                display: "inline-block",
                borderRadius: "3px",
                border: "1px solid #ccc",
              }}
            />
            {selected ? selected.name : "Select a color"}
          </div>
        </DropdownToggle>

        <DropdownMenu>
          {COLORS.map((color) => (
            <DropdownItem
              key={color.value}
              onClick={() =>
                onChange({ target: { id, value: color.value } })
              }
              className="d-flex align-items-center gap-2"
            >
              <span
                style={{
                  backgroundColor: color.value,
                  width: "16px",
                  height: "16px",
                  display: "inline-block",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
              {color.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Col>
  );
}
