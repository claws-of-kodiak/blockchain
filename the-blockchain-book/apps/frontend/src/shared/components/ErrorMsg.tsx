import "../../styles/errors.css";
interface ErrorMsgProps {
  msg?: string;
}

export default function ErrorMsg({ msg }: ErrorMsgProps) {
  return <span className="error-message">{msg ?? "Error occured"}</span>;
}
