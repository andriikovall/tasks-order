import { BaseItemMeta, Worker } from '../../types';

export type TransportationProblemInput<
  TSupplier extends BaseItemMeta = BaseItemMeta,
  TDestination extends BaseItemMeta = BaseItemMeta,
> = {
  suppliers: (TSupplier & { supply: number })[];
  demands: (TDestination & { demand: number })[];
  costs: number[][];
};

export type TransportationProblemOutput<
  TSupplier extends BaseItemMeta = BaseItemMeta,
  TDestination extends BaseItemMeta = BaseItemMeta,
> = {
  allocations: Array<{
    supplier: TSupplier;
    destination: TDestination;
    allocatedAmount: number;
  }>;
};
