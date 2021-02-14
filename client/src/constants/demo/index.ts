import { Dispatch } from "@reduxjs/toolkit";
import { setDemo } from "../../flux/slices/authSlice";
import { seedData } from "../../flux/slices/contextSlice";
import { initDemoSlice } from "../../flux/slices/demoSlice";
import { setRecentActivity } from "../../flux/slices/homeSlice";
import { DataSet, generateDataSet } from "../../seed";

// find largest id in set and add 1 to it to get nextId
export const getNextId = (keys: string[]): number =>
  (keys
    .map((v: string) => (v as unknown) as number)
    .reduce((acc, current) => (current > acc ? current : acc), -1) as number) +
  1;

// initialization logic for demo mode
export const startDemo = (dispatch: Dispatch<any>): (() => void) => () => {
  const dataSet: DataSet = generateDataSet();
  dispatch(setDemo(dataSet));
  dispatch(setRecentActivity(dataSet.activity.map((a) => a.id)));
  dispatch(seedData(dataSet));
  dispatch(initDemoSlice(dataSet));
};
