import { createSelector } from 'reselect'
import { get } from 'lodash'

const selectData = (state: any) => state.tmdbData

const selectTMDBData = () => createSelector(selectData, selectData => get(selectData, 'TMDBData'))
const selectSelectedTab = () => createSelector(selectData, selectData => get(selectData, 'selectedTab'))
const selectQuery = () => createSelector(selectData, selectData => get(selectData, 'query'))
const selectVideo = () => createSelector(selectData, selectData => get(selectData, 'video'))
const selectIsLoading = () => createSelector(selectData, selectData => get(selectData, 'isLoading'))

export { selectTMDBData, selectSelectedTab, selectQuery, selectVideo, selectIsLoading }