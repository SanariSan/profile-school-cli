const ProgressBar = require('progress');

class ProgressTracker {
  bar;
  spinSymbols;
  currentSpinAnnotation;
  currentDownloadedAnnotation;
  currentDownloadedAmount;

  constructor({ total }) {
    this.currentSpinAnnotation = 'spin';
    this.currentDownloadedAnnotation = 'dl';
    this.spinSymbols = ['|', '/', '-', '\\'];
    this.spinState = 0;
    this.currentDownloadedAmount = 0;

    this.bar = new ProgressBar(
      `[:${this.currentSpinAnnotation}] Downloaded [:${this.currentDownloadedAnnotation}/${total}] # [:bar] :percent :etas`,
      {
        complete: '=',
        incomplete: '.',
        width: 20,
        curr: this.currentDownloadedAmount,
        total,
      },
    );

    const spin = () => {
      if (this.bar.complete) return;

      if (this.spinState + 1 >= this.spinSymbols.length) {
        this.spinState = 0;
      } else {
        this.spinState += 1;
      }

      this.tick({ step: 0 });
      spinId = setTimeout(spin, 200);
    };

    let spinId = setTimeout(spin, 200);
  }

  updateDownloaded() {
    this.currentDownloadedAmount += 1;
    this.tick({ step: 1 });
  }

  tick({ step }) {
    this.bar.tick(step, {
      [this.currentSpinAnnotation]: this.spinSymbols[this.spinState],
      [this.currentDownloadedAnnotation]: this.currentDownloadedAmount,
    });
  }
}

module.exports = {
  ProgressTracker,
};
