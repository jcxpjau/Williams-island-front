import React from "react";
import { Button } from "reactstrap";

export function SubmitBtn({ onClick }) {
  return (
    <div className="text-center mt-4">
      <Button color="info" onClick={onClick}>
        Save changes
      </Button>
    </div>
  );
}
