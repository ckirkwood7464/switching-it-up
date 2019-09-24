function calculatePassingScore(player) {
  var yards = player.stats.passing.yards / 25
  var touchdowns = player.stats.passing.touchdowns * 6
  var interceptions = player.stats.passing.interceptions * -3

  return parseFloat((yards + touchdowns + interceptions).toFixed(2))
}

function calculateRushingScore(player) {
  var yards = player.stats.rushing.yards / 10
  var touchdowns = player.stats.rushing.touchdowns * 6
  var fumbles = player.stats.rushing.fumbles * -3

  return parseFloat((yards + touchdowns + fumbles).toFixed(2))
}

function calculateReceivingScore(player) {
  var receptions = player.stats.receiving.receptions
  var yards = player.stats.receiving.yards / 10
  var touchdowns = player.stats.receiving.touchdowns * 6
  var fumbles = player.stats.receiving.fumbles * -3

  return parseFloat((receptions + yards + touchdowns + fumbles).toFixed(2))
}

function calculateReturnScore(player) {
  var kickYards = player.stats.return.kickreturn.yards / 15
  var kickTouchdowns = player.stats.return.kickreturn.touchdowns * 6
  var kickFumbles = player.stats.return.kickreturn.fumbles * -3

  var puntYards = player.stats.return.puntreturn.yards / 15
  var puntTouchdowns = player.stats.return.puntreturn.touchdowns * 6
  var puntFumbles = player.stats.return.puntreturn.fumbles * -3

  return parseFloat((kickYards + kickTouchdowns + kickFumbles + puntYards + puntTouchdowns + puntFumbles).toFixed(2))
}

module.exports.calculateScore = function(player) {
  switch (player.position) {
      case 'QB':
          return calculatePassingScore(player) + calculateRushingScore(player);
          break;
      case 'RB':
          return calculateRushingScore(player) + calculateReceivingScore(player) + calculateReturnScore(player);
          break;
      case 'WR':
          return calculateRushingScore(player) + calculateReceivingScore(player) + calculateReturnScore(player);
          break;
      case 'TE':
          return calculateReceivingScore(player);
          break;
      default:
          return 0;
          break;
  }
};
