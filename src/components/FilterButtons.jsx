import { useSearchParams } from "react-router";

function FilterButtons() {
  const filterOptions = ["All", "Expiring", "Expired"];
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";
  console.log(activeFilter);
  return (
    <div>
      {filterOptions.map((option) => {
        return (
          <button
            key={option}
            onClick={() => setSearchParams({ filter: option.toLocaleLowerCase() })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;
