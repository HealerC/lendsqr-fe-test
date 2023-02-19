import Button from "@mui/material/Button";
import "./ButtonShowPassword.scss";

type Props = {
  handleClick: () => void;
  children: React.ReactNode;
};

export default function ButtonShowPassword({ handleClick, children }: Props) {
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Button
      className="button-password"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      aria-label="toggle password visibility"
    >
      {children}
    </Button>
  );
}
