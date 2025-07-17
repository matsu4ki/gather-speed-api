const { API_KEY, SPACE, ID } = require('./api-key');
const { Game } = require('@gathertown/gather-game-client');
global.WebSocket = require('isomorphic-ws');

const game = new Game(SPACE, () => Promise.resolve({ apiKey: API_KEY }));
game.connect();

// argsをconsoleで表示
console.log('Arguments:', process.argv.slice(2));

// 引数の一つ目で速度を設定
const speed = Number(process.argv[2]) || 1; // デフォルトは1.0
// 引数が正しくない場合のエラーハンドリング
if (isNaN(speed) || speed <= 0) {
  console.error('Invalid speed value. Please provide a positive number.');
  process.exit(1);
}
console.log(`Setting speed to: ${speed}`);

// 接続が確立されたら一度だけ実行されるように、フラグを設ける
let hasExecuted = false;

game.subscribeToConnection(async (connected) => {
  // 接続され、かつまだ処理を実行していない場合
  if (connected && !hasExecuted) {
    hasExecuted = true;
    console.log('Successfully connected to Gather.');

    try {
      console.log(`Setting speed for player: ${ID}`);
      // setSpeedModifierの完了を待つ
      await game.setSpeedModifier(speed, ID);
      console.log('Speed has been successfully modified.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to set speed:', error);
    } finally {
      // 処理が成功しても失敗しても、最終的に接続を終了する
      console.log('Disconnecting from Gather...');
      await game.disconnect();
      console.log('Disconnected.');
    }
  }
});
