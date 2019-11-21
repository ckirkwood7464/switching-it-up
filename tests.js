var mocha = require('mocha')
var calculateScore = require('./scoring').calculateScore
var expect = require('chai').expect
var { describe, it } = mocha
var calculateInterceptionScore = require('./scoring').calculateInterceptionScore
var calculatePassingScore = require('./scoring').calculatePassingScore
var calculateRushingScore = require('./scoring').calculateRushingScore

describe('Scoring', function () {
  it('calculates the rushing score', () => {
    var player = {
      name: 'LeSean McCoy',
      position: 'RB',
      team: 'Buffalo',
      stats: {
        rushing: { attempts: 18, yards: 103, touchdowns: 2, fumbles: 1 },
      }
    }
    let points = calculateRushingScore(player)
    expect(points).to.equal(19.3)
    console.log(points)
  })
  
  it('calculates the interception score by taking away 3 points per interception', () => {
    //given 1 interception
    let player = {
      stats: {
        passing: {
          interceptions: 1
        }
      }
    }

    let points = calculateInterceptionScore(player.stats.passing.interceptions)
    //We expect 3 points to be taken away aka "-3"
    expect(points).to.equal(-3)

    //given we have 5 interceptions
    points = calculateInterceptionScore(5)

    //We expect 15 points taken away
    expect(points).to.equal(-15)
    expect(points).not.to.equal(10)
  })


  it('returns the score for a quarterback', function () {
    var player = {
      name: 'Patrick Mahomes',
      position: 'QB',
      team: 'Kansas City',
      stats: {
        passing: {
          attempts: 25,
          completions: 18,
          yards: 363,
          touchdowns: 3,
          interceptions: 0
        },
        rushing: { attempts: 3, yards: 22, touchdowns: 1, fumbles: 0 }
      }
    }

    var rushingScore = calculateRushingScore(player)

    console.log(rushingScore)


    var passingScore = calculatePassingScore(player)

    expect(passingScore).to.equal(32.52)
    console.log(passingScore)

    var score = calculateScore(player)

    expect(score).to.equal(40.72)
  })

  it('returns the score for a running back', function () {
    var player = {
      name: 'LeSean McCoy',
      position: 'RB',
      team: 'Buffalo',
      stats: {
        rushing: { attempts: 18, yards: 103, touchdowns: 2, fumbles: 0 },
        receiving: { receptions: 6, yards: 37, touchdowns: 0, fumbles: 0 },
        return: {
          kickreturn: { returns: 0, yards: 0, touchdowns: 0, fumbles: 0 },
          puntreturn: { returns: 0, yards: 0, touchdowns: 0, fumbles: 0 },
        },
      }
    }

    var score = calculateScore(player)

    expect(score).to.equal(32)
  })

  it('returns the score for a receiver', function () {
    var player = {
      name: 'Tyler Lockett',
      position: 'WR',
      team: 'Seattle',
      stats: {
        rushing: { attempts: 0, yards: 0, touchdowns: 0, fumbles: 0 },
        receiving: { receptions: 6, yards: 91, touchdowns: 1, fumbles: 0 },
        return: {
          kickreturn: { returns: 2, yards: 16, touchdowns: 0, fumbles: 1 },
          puntreturn: { returns: 3, yards: 107, touchdowns: 1, fumbles: 0 },
        },
      }
    }

    var score = calculateScore(player)

    expect(score).to.equal(32.3)
  })

  it('returns the score for a tightend', function () {
    var player = {
      name: 'Rob Gronkowski',
      position: 'TE',
      team: 'New England',
      stats: {
        receiving: { receptions: 8, yards: 137, touchdowns: 2, fumbles: 0 },
      }
    }

    var score = calculateScore(player)

    expect(score).to.equal(33.7)
  })

  it('returns 0 when position is unknown', function () {
    var player = {
      name: 'Robbie Gould',
      position: 'K',
      team: 'San Francisco',
      stats: {
        fieldgoals: { attempts: 3, made: 2 },
        xp: { attempts: 2, made: 2 }
      }
    }

    var score = calculateScore(player)

    expect(score).to.equal(0)
  })
})
