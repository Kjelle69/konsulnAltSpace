"use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MRE = __importStar(require("@microsoft/mixed-reality-extension-sdk"));
/**
 * The main class of this app. All the logic goes here.
 */
class KonsulnAnim {
    constructor(context) {
        this.context = context;
        this.text = null;
        this.cube = null;
        this.context.onStarted(() => this.started());
    }
    /**
     * Once the context is "started", initialize the app.
     */
    async started() {
        // set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
        this.assets = new MRE.AssetContainer(this.context);
        // Create a new actor with no mesh, but some text.
        this.text = MRE.Actor.Create(this.context, {
            actor: {
                name: 'Text',
                transform: {
                    app: { position: { x: 0, y: 0.5, z: 0 } }
                },
                text: {
                    contents: ".",
                    anchor: MRE.TextAnchorLocation.MiddleCenter,
                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                    height: 0.3
                }
            }
        });
        /*
        // Here we create an animation for our text actor. First we create animation data, which can be used on any
        // actor. We'll reference that actor with the placeholder "text".
        const spinAnimData = this.assets.createAnimationData(
            // The name is a unique identifier for this data. You can use it to find the data in the asset container,
            // but it's merely descriptive in this sample.
            "Spin",
            {
                // Animation data is defined by a list of animation "tracks": a particular property you want to change,
                // and the values you want to change it to.
                tracks: [{
                    // This animation targets the rotation of an actor named "text"
                    target: MRE.ActorPath("text").transform.local.rotation,
                    // And the rotation will be set to spin over 20 seconds
                    keyframes: this.generateSpinKeyframes(20, MRE.Vector3.Up()),
                    // And it will move smoothly from one frame to the next
                    easing: MRE.AnimationEaseCurves.Linear
                }]
            });
        // Once the animation data is created, we can create a real animation from it.
        spinAnimData.bind(
            // We assign our text actor to the actor placeholder "text"
            { text: this.text },
            // And set it to play immediately, and bounce back and forth from start to end
            { isPlaying: true, wrapMode: MRE.AnimationWrapMode.PingPong });
        */
        // Load a glTF model before we use it
        const cubeData = await this.assets.loadGltf('LKAB.glb', "box");
        // spawn a copy of the glTF model
        this.cube = MRE.Actor.CreateFromPrefab(this.context, {
            // using the data we loaded earlier
            firstPrefabFrom: cubeData,
            // Also apply the following generic actor properties.
            actor: {
                name: 'BlenderCube',
                // Parent the glTF model to the text actor, so the transform is relative to the text
                parentId: this.text.id,
                transform: {
                    local: {
                        position: { x: 0, y: -1, z: 0 },
                        scale: { x: 0.4, y: 0.4, z: 0.4 }
                    }
                }
            }
        });
        /*
        // Create some animations on the cube.
        const flipAnimData = this.assets.createAnimationData(
            // the animation name
            "DoAFlip",
            { tracks: [{
                // applies to the rotation of an unknown actor we'll refer to as "target"
                target: MRE.ActorPath("target").transform.local.rotation,
                // do a spin around the X axis over the course of one second
                keyframes: this.generateSpinKeyframes(1.0, MRE.Vector3.Right()),
                // and do it smoothly
                easing: MRE.AnimationEaseCurves.Linear
            }]}
        );
        // apply the animation to our cube
        const flipAnim = await flipAnimData.bind({ target: this.cube });
        */
        // Set up cursor interaction. We add the input behavior ButtonBehavior to the cube.
        // Button behaviors have two pairs of events: hover start/stop, and click start/stop.
        const buttonBehavior = this.cube.setBehavior(MRE.ButtonBehavior);
        /*
        // Trigger the grow/shrink animations on hover.
        buttonBehavior.onHover('enter', () => {
            // use the convenience function "AnimateTo" instead of creating the animation data in advance
            MRE.Animation.AnimateTo(this.context, this.cube, {
                destination: { transform: { local: { scale: { x: 0.5, y: 0.5, z: 0.5 } } } },
                duration: 0.3,
                easing: MRE.AnimationEaseCurves.EaseOutSine
            });
        });
        buttonBehavior.onHover('exit', () => {
            MRE.Animation.AnimateTo(this.context, this.cube, {
                destination: { transform: { local: { scale: { x: 0.4, y: 0.4, z: 0.4 } } } },
                duration: 0.3,
                easing: MRE.AnimationEaseCurves.EaseOutSine
            });
        });
*/
        // When clicked, Play animation
        buttonBehavior.onClick(_ => {
            if (this.cube.targetingAnimationsByName.get('CubeAction.001').isPlaying) {
                this.cube.targetingAnimationsByName.get('CubeAction.001').stop();
            }
            else {
                this.cube.targetingAnimationsByName.get('CubeAction.001').play(true);
            }
        });
    }
}
exports.default = KonsulnAnim;
//# sourceMappingURL=app.js.map