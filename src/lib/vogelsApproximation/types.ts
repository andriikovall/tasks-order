import { Worker } from '../../types';

type BaseCellRowOrColumn = Pick<Worker, 'id' | 'name'>;

export type TransportationProblemInput<
  TSuppliers extends BaseCellRowOrColumn = BaseCellRowOrColumn,
  TDestinations extends BaseCellRowOrColumn = BaseCellRowOrColumn,
> = {
  suppliers: (TSuppliers & { supply: number })[];
  demands: (TDestinations & { demand: number })[];
  costs: number[][];
};

export type TransportationProblemOutput<
  TSuppliers extends BaseCellRowOrColumn = BaseCellRowOrColumn,
  TDestinations extends BaseCellRowOrColumn = BaseCellRowOrColumn,
> = {
  allocations: Array<{
    supplier: TSuppliers;
    destination: TDestinations;
    allocatedAmount: number; 
  }>;
};
