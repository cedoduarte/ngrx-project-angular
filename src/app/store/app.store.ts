import { ActionReducerMap } from "@ngrx/store";
import { ITask, taskReducer } from "./task.store";

export interface IAppState {
    taskList: ITask[]
}

export const appReducers: ActionReducerMap<IAppState> = {
    taskList: taskReducer
}