import { AIBInterstitial } from "../libs/AIBAds";
export function showInter(num, callback) {
  const check = Math.floor(Math.random() * 100);
  if (check <= num) {
    const clearCallback = () => {
      callback();
      AIBInterstitial.removeAllListeners();
    };
    AIBInterstitial.addEventListener("adFailedToLoad", clearCallback);
    AIBInterstitial.addEventListener("adClosed", clearCallback);
    AIBInterstitial.showInterstitial(() => {});
  } else {
    callback();
  }
}
