import '@fontsource/noto-sans-kr/korean-500.css';
import '@fontsource/noto-sans-kr/korean-700.css';
import '@fontsource/noto-sans-kr/korean-900.css';
import './style.css';
import { Game } from './game/game';

function showError(msg: string): void {
  const box = document.getElementById('error-box');
  if (!box) return;
  box.textContent = msg;
  box.classList.remove('hidden');
}

function hasWebGL2(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
if (!hasWebGL2()) {
  showError('이 브라우저는 WebGL2를 지원하지 않아 게임을 실행할 수 없습니다.\n최신 Chrome / Edge / Firefox / Safari에서 다시 시도해 주세요.');
} else {
  try {
    const game = new Game(canvas);
    // let the loading text paint before the (synchronous) city generation
    setTimeout(() => game.start(), 30);
  } catch (e) {
    console.error(e);
    showError(`실행에 실패했습니다: ${(e as Error).message}`);
  }
}
