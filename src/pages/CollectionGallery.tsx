import { Navigate } from "react-router-dom";

const CollectionGallery = () => {
  // Collections have been merged into the main projects grid
  return <Navigate to="/projects" replace />;
};

export default CollectionGallery;
