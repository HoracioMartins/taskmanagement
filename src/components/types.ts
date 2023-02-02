
export interface IBatch {
    id: number;
    numBoxes: number;
    product: string;
    variety: string;
    arrivalTimestamp: string;
    latestInspectionTimestamp: string;
    latestQualityScore: string;
}
  
export  interface ITask {
    id: number;
    inspectorId: number;
    inspectorName: string;
    batchId: number;
    numBoxes: number;
    product: string;
    variety: string;
    arrivalTimestamp: string;
    latestInspectionTimestamp: string;
    latestQualityScore: string;
    status: string;
}
  
export  interface IInspector {
    id: number;
    type: string;
    name: string;
}