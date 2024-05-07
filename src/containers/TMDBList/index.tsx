import React, { useEffect } from "react";
import styles from "./TMDBList.module.css"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Tabs } from "../../components/Tabs";
import { Tab } from "../../components/Tab";
import { TabPanel } from "../../components/TabPanel";
import { List } from "./components/List";
import { Search } from "../../components/Search";

import { selectTMDBData, selectSelectedTab, selectQuery } from "./store/selectors";
import { fetchData, setQuery, resetVideo, fetchSearchedData } from "./store/actions";
import useDebounce from "../../utilities/useDebounce";
import { useLocation } from "react-router-dom";

type TMDBListProps = {
  tmdbData: any[];
  fetchData: (selectedTab: number) => void;
  fetchSearchedData: (selectedTab: number, query: string) => void
  selectedTab: any;
  query: string;
  setQuery: (query: string) => void;
  resetVideo: () => void;
};

const TMDBList = (props: TMDBListProps) => {
  const { tmdbData, fetchData, selectedTab, setQuery, query, resetVideo, fetchSearchedData } = props
  const { state } = useLocation();
  
  const handleChangeTab = (newValue: number) => {
    fetchData(newValue);
  };

  const handleChangeQuery = (e: any) => {
    setQuery(e.target.value)
  }

  useDebounce(
    () => {
      
      if(query?.length >= 3) {
        fetchSearchedData(selectedTab, query);
      }

      if(state?.resetVideo) {
        resetVideo();
      }

    },
    [selectedTab, query],
    1000
  );

  useEffect(() => {

    if(tmdbData.length === 0 || query?.length < 3) {
      fetchData(selectedTab);
    }

  }, [selectedTab, query, tmdbData.length, fetchData])
    
  return (
    <div className={styles.TMDBListContainer}>
        <Tabs handleTab={handleChangeTab}>
            <Tab index={0} label="TV Shows" color={selectedTab === 0 ? "#3e70ff" : "#121419"} />
            <Tab index={1} label="Movies" color={selectedTab === 1 ? "#3e70ff" : "#121419"} />
        </Tabs>
        <Search onChange={handleChangeQuery} value={query} />
        <TabPanel value={selectedTab} index={0}>
          <List dataSource={tmdbData} value={selectedTab} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <List dataSource={tmdbData} value={selectedTab} />
        </TabPanel>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
    tmdbData: selectTMDBData(),
    selectedTab: selectSelectedTab(),
    query: selectQuery()
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchData: (selectedTab: number) => {
            dispatch(fetchData(selectedTab))
        },
        setQuery: (query: string) => {
          dispatch(setQuery(query))
        },
        resetVideo: () => {
          dispatch(resetVideo())
        },
        fetchSearchedData: (selectedTab: number, query: string) => {
          dispatch(fetchSearchedData(selectedTab, query))
        }
    }
  }

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default (withConnect)(TMDBList)