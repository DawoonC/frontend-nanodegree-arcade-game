var Engine = (function(global) {
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    patterns = {},
    lastTime;

  canvas.width = 909;
  canvas.height = 650;
  doc.body.appendChild(canvas);

  function main() {
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    win.requestAnimationFrame(main);
  };

  function init() {

    reset();
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    updateEntities(dt);
    // checkCollisions();
  }

  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
    gem.update();
  }

  function render() {
    var rowImages = [
        'images/water-block.png',
        'images/stone-block.png',
        'images/stone-block.png',
        'images/stone-block.png',
        'images/grass-block.png',
        'images/grass-block.png'
      ],
      numRows = 6,
      numCols = 9,
      row, col;

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
    ctx.drawImage(Resources.get('images/background.png'), 0, 590);

    renderEntities();
  }

  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
    gem.render();
    gameScore.render();
    gameLife.render();
  }

  function reset() {
    // noop
  }

  Resources.load([
    'images/background.png',
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
    'images/Gem_Orange_s.png',
    'images/Gem_Orange.png',
    'images/Gem_Blue.png',
    'images/Gem_Green.png',
    'images/Heart_s.png',
    'images/gameover.png'
  ]);
  Resources.onReady(init);

  global.ctx = ctx;
})(this);
