import { useState } from "react";
import {
  Col,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export function ColorPicker({ label, id, onChange, lg, md }) {
  const colProps = {};
  if (lg) colProps.lg = lg;
  if (md) colProps.md = md;

  const [selectedInternalColor, setSelectedInternalColor] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const colors = [
    { name: "Red", hex: "#dc3545" },
    { name: "Blue", hex: "#007bff" },
    { name: "Green", hex: "#28a745" },
    { name: "Yellow", hex: "#ffc107" },
    { name: "Cyan", hex: "#17a2b8" },
    { name: "Purple", hex: "#6f42c1" },
    { name: "Orange", hex: "#fd7e14" },
    { name: "Pink", hex: "#e83e8c" },
    { name: "Gray", hex: "#6c757d" },
     { name: "Lilac", hex: "#c8a2c8" },
    { name: "Indigo", hex: "#6610f2" }, 
    { name: "Brown", hex: "#795548" }, 
    { name: "Olive", hex: "#6c7e10" }, 
    { name: "Gold", hex: "#FFD700" }, 
    { name: "Silver", hex: "#C0C0C0" },
  ];

  const selectedColorName =
    colors.find((color) => color.hex === selectedInternalColor)?.name ||
    "Select a color for this unit";

  const handleColorChange = (hexValue) => {
    setSelectedInternalColor(hexValue);
    if (onChange) {
      onChange({ target: { id: id, value: hexValue } });
    }
  };

  return (
    <Col {...colProps}>
      <FormGroup>
        <Label className="form-control-label" htmlFor={id}>
          {label}
        </Label>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="w-100">
          <DropdownToggle
            caret
            className="form-control-alternative d-flex justify-content-between align-items-center w-100 font-weight-normal"
          >
            <div className="d-flex align-items-center">
              <span
                className="border border-1 border-black mr-2 d-inline-block"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: selectedInternalColor || "transparent",
                }}
              ></span>
              {selectedColorName}
            </div>
          </DropdownToggle>
          <DropdownMenu className="w-100">
            {colors.map((color) => (
              <DropdownItem
                key={color.hex}
                onClick={() => handleColorChange(color.hex)}
                className="d-flex align-items-center"
              >
                <span
                  className="border border-1 border-black mr-2 d-inline-block"
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.hex,
                  }}
                ></span>
                {color.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Input type="hidden" id={id} value={selectedInternalColor || ""} />
      </FormGroup>
    </Col>
  );
}
