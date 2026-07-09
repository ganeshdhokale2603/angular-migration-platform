export class SignalTransformer {
  transform(source: string): {
    source: string;

    report: {
      behaviorSubjects: number;

      signals: number;

      computed: number;

      effects: number;
    };
  } {
    const report = {
      behaviorSubjects: 0,

      signals: 0,

      computed: 0,

      effects: 0,
    };

    let updated = source;

    //-----------------------------------
    // Detect BehaviorSubject
    //-----------------------------------

    const matches = updated.match(/BehaviorSubject/g);

    if (matches) {
      report.behaviorSubjects = matches.length;
    }

    //-----------------------------------
    // Suggest signal import
    //-----------------------------------

    if (report.behaviorSubjects > 0 && !updated.includes('signal')) {
      updated = updated.replace(
        /from '@angular\/core';/,

        `, signal from '@angular/core';`,
      );

      report.signals++;
    }

    //-----------------------------------
    // Detect computed opportunity
    //-----------------------------------

    if (updated.includes('.filter(')) {
      report.computed++;
    }

    //-----------------------------------
    // Detect effect opportunity
    //-----------------------------------

    if (updated.includes('.subscribe(')) {
      report.effects++;
    }

    return {
      source: updated,

      report,
    };
  }
}
