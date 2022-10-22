import React from "react";

import { useNavigate, Link } from "react-router-dom";

function Button({ text, to, bsc }) {
  const navigate = useNavigate();

  return (
    <Link className={bsc} to={to}>
      {text}
    </Link>
  );
}

export default Button;
