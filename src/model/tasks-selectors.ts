import type { TasksObjPropsType } from '../app/App'
import type { RootState } from '../app/store'

export const selectTasks = (state: RootState): TasksObjPropsType => state.tasks