namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Wall = SpriteKind.create()
    export const ScoreArea = SpriteKind.create()
}
function Gameplayloop () {
    if (Ball.vx == 0 && Ball.vy == 0) {
        Ball.setVelocity(randint(-1, 1) * 100, randint(-15, 15) * 10)
        while (Ball.vx == 0) {
            Ball.vx = randint(-1, 1) * 100
        }
    }
    Ball.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Player, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 500, 500, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    if (sprite.overlapsWith(Player_2)) {
        sprite.setVelocity(-100, randint(-15, -1) * 10)
    } else {
        sprite.setVelocity(100, randint(1, 15) * 10)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Gameplayloop()
})
sprites.onOverlap(SpriteKind.Ball, SpriteKind.Wall, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 200, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Ball, SpriteKind.ScoreArea, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 200, 255, 255, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    if (sprite.overlapsWith(Player1ScoreArea)) {
        Player_1_Score.count += 1
    } else {
        Player_2_Score.count += 1
    }
    sprite.destroy()
    pause(2000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.ScoreArea)
    Wall.destroy()
    if (Player_1_Score.count == 11 || Player_2_Score.count == 11) {
        game.reset()
    } else {
        Setup()
    }
})
function Setup () {
    music.setVolume(255)
    Wall = sprites.create(assets.image`Boundaries`, SpriteKind.Wall)
    Player1ScoreArea = sprites.create(assets.image`Player1ScoreArea`, SpriteKind.ScoreArea)
    Player2ScoreArea = sprites.create(assets.image`Player2ScoreArea`, SpriteKind.ScoreArea)
    Player_1 = sprites.create(assets.image`Paddle1`, SpriteKind.Player)
    Player_2 = sprites.create(assets.image`Paddle2`, SpriteKind.Player)
    Ball = sprites.create(assets.image`Ball`, SpriteKind.Ball)
    Player_1_Score.setDigitColor(1)
    Player_1_Score.x = 65
    Player_1_Score.y = 12
    Player_2_Score.setDigitColor(1)
    Player_2_Score.x = 95
    Player_2_Score.y = 12
    Player_1.x = 25
    Player_2.x = 136
    controller.moveSprite(Player_1, 0, 100)
    controller.player2.moveSprite(Player_2, 0, 100)
    Player_1.setStayInScreen(true)
    Player_2.setStayInScreen(true)
}
let Player_1: Sprite = null
let Player2ScoreArea: Sprite = null
let Wall: Sprite = null
let Player1ScoreArea: Sprite = null
let Player_2: Sprite = null
let Ball: Sprite = null
let Player_2_Score: DigitCounter = null
let Player_1_Score: DigitCounter = null
Player_1_Score = sevenseg.createCounter(SegmentStyle.Thin, SegmentScale.Half, 2)
Player_2_Score = sevenseg.createCounter(SegmentStyle.Thin, SegmentScale.Half, 2)
Setup()
