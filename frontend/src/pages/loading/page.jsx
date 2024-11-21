import "./loading.css";
import { CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <div className="loadingContainer">
      <CircularProgress />
    </div>
  );
}
