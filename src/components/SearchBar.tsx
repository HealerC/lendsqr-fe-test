import Button from "@mui/material/Button";
import "./SearchBar.scss";
import SearchIcon from "../assets/icons/search.svg";

type Props = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function SearchBar({ value, handleChange }: Props) {
  return (
    <div className="search-bar">
      <input
        type="search"
        autoComplete="search"
        placeholder="Search for anything"
        value={value}
        onChange={handleChange}
        className="search-text-field"
      />

      <Button className="search-button" variant="contained">
        <img src={SearchIcon} />
      </Button>
    </div>
  );
}
