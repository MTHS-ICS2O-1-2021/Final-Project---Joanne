/* global Phaser */

// Copyright (c) 2022 Joanne Santhosh All rights reserved
//
// Created by: Joanne Santhosh
// Created on: June 2022
// This is the Title Scene

/**
 * This class is the Title Scene.
 */
class TitleScene extends Phaser.Scene {
  /**
   * This method is the construtor.
   */
  constructor() {
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = {
      font: "200px Times",
      fill: "#fde4b9",
      align: "center",
    }
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
    console.log("Title Scene")
    this.load.image("titleSceneBackground", "assets/Screen Shot 2022-06-08 at 6.22.32 PM.png")
  }

  /**
   * Can be defined on your own Scenes.
   * Use it to create your game objects.
   * @param {object} data - Any data passed via ScenePlugin.add() or ScenePlugin.start().
   */
  create(data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

     this.titleSceneText = this.add.text(1920 / 2, 1080 / 2 + 350, "Cookie Monster", this.titleSceneTextStyle).setOrigin(0.5)
  }

  /**
   * Should be overridden by your own Scenes.
   * This method is called once per game step while the scene is running.
   *  @param {number} time - The current time.
   *  @param {number} delta - The delta time in ms since the last frame.
   */
   update(time, delta) {
    if (time > 6000) this.scene.switch("menuScene")
    }
}

export default TitleScene