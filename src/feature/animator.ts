export function animate(arg: { act?: () => void; onAnimate: () => void }) {
  arg.act?.();
  requestAnimationFrame(arg.onAnimate);
}

export function animateRepeat(arg: {
  act: () => void;
  repeat: number;
  onAnimate: () => void;
}) {
  let iter = 0;

  function act() {
    arg.act();
    iter++;
    arg.onAnimate();
    if (iter < arg.repeat) {
      requestAnimationFrame(act);
    }
  }

  act();
}

export async function waitAnimation() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}
