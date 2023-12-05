let intervalID: any;

onmessage = (e: MessageEvent) => {
  if (e.data.type === "start") {
    clearInterval(intervalID);
    let t: number = e.data.t || 0;

    intervalID = setInterval(() => {
      t++;

      if (t > e.data.maxDuration) {
        postMessage({
          t: t - 1,
          running: false
        });
        clearInterval(intervalID);
      } else {
        postMessage({
          t: t,
          running: true
        });
      }
    }, 1000);
  } else {
    clearInterval(intervalID);
  }
};
