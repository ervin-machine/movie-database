import styles from "./Tab.module.css"

type TabProps = {
    label: string;
    color: string;
    index: number;
  }

export const Tab = (props: TabProps) => {
  const { label, color, index } = props;
  return (
    <div id={`tab-${index}`} className={styles.tab} style={{ backgroundColor: color }}>
        <p>{label}</p>
    </div>
  );
};