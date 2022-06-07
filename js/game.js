/* global Phaser */

// Copyright (c) 2022 Joanne Santhosh All rights reserved
//
// Created by: Joanne Santhosh
// Created on: June 2022
// This is the Cookie Monster configuration file

// scene import
import SplashScene from './splashScene.js'

// create new scene
const splashScene = new splashScene

/**
 * Start Cookie Monster Game
 */
const config = {
  type: Phaser.AUTO, 
  width: 1920,
  height: 1080,
   physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  // set background color
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
game.scene.add("splashScene", splashScene)

// start scene
game.scene.start("splashScene")
console.log(game)
