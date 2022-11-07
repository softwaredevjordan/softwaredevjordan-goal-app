import React from "react";

import { useNavigate, Link } from "react-router-dom";
//text is what the button will display
//too is where the button will link too
//bootStrapClass is for styling the button
function LinkButton({ text, too, bootStrapClass }) {
  const navigate = useNavigate();

  return (
    <Link className={bootStrapClass} to={too}>
      {text}
    </Link>
  );
}

export default LinkButton;
