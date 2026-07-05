import { Injectable } from '@nestjs/common';
import { UpgradeStep } from '../models/upgrade-step';

@Injectable()
export class UpgradeEngineService {

  /**
   * Generates the complete upgrade plan.
   *
   * Example
   *
   * 8 -> 16
   *
   * returns
   *
   * [
   * 8->9,
   * 9->10,
   * 10->11,
   * ...
   * 15->16
   * ]
   */
  generateUpgradePlan(
    currentVersion: number,
    targetVersion: number
  ): UpgradeStep[] {

    console.log("Current =", currentVersion);
    console.log("Target =", targetVersion);

    const plan: UpgradeStep[] = [];

    if (currentVersion >= targetVersion) {
      return plan;
    }

    let current = currentVersion;

    while (current < targetVersion) {

      plan.push({

        fromVersion: current,

        toVersion: current + 1,

        status: 'PENDING'

      });

      current++;

    }
console.log(plan);
    return plan;

  }

}