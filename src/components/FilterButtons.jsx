import { useSearchParams } from "react-router";
import styles from "./FilterButtons.module.css";

function FilterButtons() {
  const filterOptions = ["All", "Expiring", "Expired"];
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";
  console.log(activeFilter);
  return (
    <div className={styles.row}>
      {filterOptions.map((option) => {
        return (
          <button
            className={activeFilter === option.toLocaleLowerCase() ? styles.active : styles.button}
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
