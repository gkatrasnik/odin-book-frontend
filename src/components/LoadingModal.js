import { Spinner } from "react-bootstrap";
import "../App.scss";
function LoadingModal() {
  return <Spinner animation="grow" className="spinner" />;
}

export default LoadingModal;
