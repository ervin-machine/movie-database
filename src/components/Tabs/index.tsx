import { ReactNode } from 'react'
import styles from "./Tabs.module.css"

type TabsProps = {
  handleTab: (newValue: number) => void
  children: ReactNode[]
}

export const Tabs = (props: TabsProps) => {
  const { handleTab, children } = props;

  return (
    <div className={styles.tabs}>
      { [...children].map((item, index) => 
          <div key={index} onClick={() => handleTab(index)}>
            {item}
          </div>)}
    </div>
  );
};