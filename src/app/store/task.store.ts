import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";
import { v4 } from "uuid";

export interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
}

const initialState: ITask[] = [
    {
        id: v4(),
        title: "Example task",
        isCompleted: true
    }
];

export const addTask = createAction("[TASK] addTask", props<ITask>());
export const markTaskAsCompleted = createAction("[TASK] markTaskAsCompleted", props<{ task: ITask, completed: boolean }>());
export const removeTask = createAction("[TASK] removeTask", props<ITask>());

export const taskReducer = createReducer(initialState,
    on(addTask, (state, task: ITask): ITask[] => {
        return [...state, task];
    }),
    on(markTaskAsCompleted, (state, item: { task: ITask, completed: boolean }): ITask[] => {
        return state.map(iTask => {
            if (iTask.id === item.task.id) {
                return {
                    ...iTask,
                    isCompleted: item.completed
                };
            }
            return iTask;
        });
    }),
    on(removeTask, (state, task: ITask): ITask[] => {
        return state.filter(iTask => iTask.id !== task.id);
    })
);

const selectTaskFeature = createFeatureSelector<ITask[]>("taskList");
export const selectTaskList = createSelector(selectTaskFeature, (state: ITask[]) => state);