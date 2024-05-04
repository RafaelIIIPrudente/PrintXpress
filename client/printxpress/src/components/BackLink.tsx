import React from "react";
import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  imageSource: string;
  alt: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, imageSource, alt }) => {
  return (
    <Link to={to}>
      <img src={imageSource} alt={alt} className="h-16 w-16 ml-4" />
    </Link>
  );
};

export default BackLink;
