import type { TodoListType } from '../app/App'
import type { RootState } from '../app/store'

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists