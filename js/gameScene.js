/* global Phaser */

// Copyright (c) 2022 Joanne Santhosh All rights reserved
//
// Created by: Joanne Santhosh
// Created on: June 2022
// This is the Menu Scene

/**
 * This class is the Game Scene.
 */
class GameScene extends Phaser.Scene {
  /**
   * This method is the construtor.
   */
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.cookieMonster = null
  }

  /**
   * Can be defined on your own Scenes.
   * This method is called by the Scene Manager when the scene starts,
   *   before preload() and create().
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  init(data) {
    this.cameras.main.setBackgroundColor("ffffff")
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to load assets.
   */
  preload() {
    console.log("Game Scene")

    // images
    this.load.image("gameBackground", "assets/20500766.jpeg")
    this.load.image("cookieMonster", "assets/image (1).png")
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    this.background = this.add.image(0, 0, "gameBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    this.cookieMonster = this.physics.add.sprite(
      1920 / 2,
      1080 - 100,
      "cookieMonster"
    )
  }

  /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running.
   *  @param {number} time - The current time.
   *  @param {number} delta - The delta time in ms since the last frame.
   */
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
        this.cookieMonster.x = 1920
      }
    }

    if (keyDownObj.isDown === true) {
      this.cookieMonster.y += 15
      if (this.cookieMonster.y > 1920) {
        this.cookieMonster.y = 1920
      }
    }

    if (keyUpObj.isDown === true) {
      if (this.eatCookie === true) {
        const aNewCookie = this.physics.add.sprite(
          this.cookieMonster.x,
          this.cookieMonster.y,
          "cookie"
        )
        this.cookieGroup.add(aNewCookie)
      }
    }

    if (keyLeftObj.isUp === true) {
      this.eatCookie = false
    }
    if (keyRightObj.isUp === true) {
      this.eatCookie = false
    }
    if (keyUpObj.isUp === true) {
      this.eatCookie = false
    }
    if (keyDownObj.isUp === true) {
      this.eatCookie = false
    }
  }
}

export default GameScene
