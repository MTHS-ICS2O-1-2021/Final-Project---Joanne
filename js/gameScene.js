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

  /**
   * This method is the construtor.
   */
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.cookieMonster = null
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
      "assets/rsz_998110-middle-removebg-preview_2_24.png"
    )

    // sound
    this.load.audio(
      "crunch",
      "assets/crack-and-crunch-14891-[AudioTrimmer.com].mp3"
    )
  }

  create(data) {
    this.background = this.add.image(0, 0, "gameBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    this.cookieMonster = this.physics.add.sprite(
      1920 / 2,
      1080 - 100,
      "cookieMonster"
    )
    // create cookies
    this.cookieGroup = this.add.group()
    this.createACookie()

    // Collissions between cookie monster and cookies
    this.physics.add.collider(
      this.cookieMonster,
      this.cookieGroup,
      function (cookieCollide, cookieMonsterCollide) {
        cookieMonsterCollide.destroy()
        this.sound.play("crunch")
        this.createACookie()
        this.createACookie()
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
