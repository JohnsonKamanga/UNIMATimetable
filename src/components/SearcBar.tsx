import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

type TSearchBar = {
  placeholder: string;
  handleSearch: (event: FormEvent<HTMLFormElement>, query: string) => any;
};

export default function SearchBar(props: TSearchBar) {
  const { placeholder, handleSearch } = props;
  const [query, setQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="bg-white w-full p-3 flex items-center">
      <form
        onSubmit={(event) => {
          handleSearch(event, query);
          setQuery("");
        }}
      >
        <div className="bg-[#F8F7F7] flex flex-row items-center gap-x-2 p-2 border-[2px] border-black border-opacity-5 rounded-[3px]">
          <button type="submit">
            <Search className="opacity-50" color="black" />
          </button>
          <input
            type="search"
            placeholder={placeholder}
            value={query}
            className="outline-none bg-transparent w-[470px]"
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
