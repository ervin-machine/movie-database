import { ReactNode } from 'react'

type tabPanelProps = {
    index: number,
    value: number,
    children: ReactNode
}

export const TabPanel = (props: tabPanelProps) => {
  const { index, value, children } = props;
  return (
    <div>
        { value === index && (
            <div>{ children }</div>
        )}
    </div>
  );
};