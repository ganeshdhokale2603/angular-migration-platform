export interface SubscriptionReport {
  subscriptions: number;

  unmanagedSubscriptions: number;

  takeUntilUsage: number;

  ngOnDestroyImplemented: boolean;

  memoryLeakRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}
