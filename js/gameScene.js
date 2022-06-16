/* global Phaser */

// Copyright (c) 2022 Joanne Santhosh All rights reserved
//
// Created by: Joanne Santhosh
// Created on: June 2022
// This is the Game Scene

/**
 * This class is the Game Scene.
 */
class GameScene extends Phaser.Scene {
  // create a cookie
  createACookie() {
    const cookieXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920
    let cookieXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
    cookieXVelocity *= Math.round(Math.random()) ? 1 : -1 // thiis will add minus sign in 50% of cases
    const aCookie = this.physics.add.sprite(cookieXLocation, -100, "cookie")
    aCookie.body.velocity.y = 200
    aCookie.body.velocity.x = cookieXVelocity
    this.cookieGroup.add(aCookie)
  }

  // create a rock
  createARock() {
    const rockXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920
    let rockXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50
    rockXVelocity *= Math.round(Math.random()) ? 1 : -1 // thiis will add minus sign in 50% of cases
    const aRock = this.physics.add.sprite(rockXLocation, -100, "rock")
    aRock.body.velocity.y = 200
    aRock.body.velocity.x = rockXVelocity
    this.rockGroup.add(aRock)
    }

  /**
   * This method is the construtor.
   */
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.cookieMonster = null
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = {font: "65px Ariel", fill: "#0000FF", align: "center",}

    this.gameOverText = null
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }

  }

  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  preload() {
    console.log("Game Scene")

    // images
    this.load.image("gameBackground", "assets/20500766.jpeg")
    this.load.image("cookieMonster", "assets/image (1).png")
    this.load.image(
      "cookie",
      "assets/rsz_998110-middle-removebg-preview_2_24.png");
    this.load.image("rock", "assets/download_1_2_25-removebg-preview.png")
    

    // sound
    this.load.audio(
      "crunch",
      "assets/crack-and-crunch-14891-[AudioTrimmer.com].mp3"
    )
    this.load.audio("explosion", "assets/76H365G-explosion-[AudioTrimmer.com].mp3")
  }

  create(data) {
    this.background = this.add.image(0, 0, "gameBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.cookieMonster = this.physics.add.sprite(
      1920 / 2,
      1080 - 100,
      "cookieMonster"
    )
    // create cookies
    this.cookieGroup = this.add.group()
    this.createACookie()

    // create cookies
    this.rockGroup = this.add.group()
    this.createARock()

    // Collissions between cookie monster and cookies
    this.physics.add.collider(
      this.cookieMonster,
      this.cookieGroup,
      function (cookieCollide, cookieMonsterCollide) {
        cookieMonsterCollide.destroy()
        this.sound.play("crunch")
        this.score = this.score + 1
        this.scoreText.setText('Score: ' + this.score.toString())
        this.createACookie()
        this.createACookie()
      }.bind(this)
    )

    // Collissions between cookie monster and rocks
    this.physics.add.collider(
      this.cookieMonster,
      this.rockGroup,
      function (rockCollide, cookieMonsterCollide) {
        this.sound.play("explosion")
        this.physics.pause()
        rockCollide.destroy()
        cookieMonsterCollide.destroy()
        this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.',       this.gameOverTextStyle).setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
      }.bind(this)
    )

    // Create more rocks
    this.physics.add.collider(
      this.cookieMonster,
      this.cookieGroup,
      function (cookieCollide, cookieMonsterCollide) {
        cookieMonsterCollide.destroy()
        this.createARock()
        this.createARock()
      }.bind(this)
    )
  }

  update(time, delta) {
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keyUpObj = this.input.keyboard.addKey("UP")
    const keyDownObj = this.input.keyboard.addKey("DOWN")

    if (keyLeftObj.isDown === true) {
      this.cookieMonster.x -= 15
      if (this.cookieMonster.x < 0) {
        this.cookieMonster.x = 0
      }
    }

    if (keyRightObj.isDown === true) {
      this.cookieMonster.x += 15
      if (this.cookieMonster.x > 1920) {
        this.cookieMonster.x = 1920
      }
    }

    if (keyUpObj.isDown === true) {
      this.cookieMonster.y -= 15
      if (this.cookieMonster.y > 1920) {
        this.cookieMonster.y = 1920
      }
    }

    if (keyDownObj.isDown === true) {
      this.cookieMonster.y += 15
      if (this.cookieMonster.y > 1920) {
        this.cookieMonster.y = 1920
      }
    }
  }
}

export default GameScene
