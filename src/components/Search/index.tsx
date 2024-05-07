import styles from "./Search.module.css"

type SearchProps = {
  value: any;
  onChange: (e: any) => void
}

export const Search = (props: SearchProps) => {
  const { value, onChange } = props;
  return (
        <input placeholder="Search tv/movie ..." className={styles.search} onChange={onChange} value={value} />
  );
};