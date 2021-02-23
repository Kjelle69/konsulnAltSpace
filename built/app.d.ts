/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';
/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
    private context;
    private text;
    private cube;
    private assets;
    constructor(context: MRE.Context);
    /**
     * Once the context is "started", initialize the app.
     */
    private started;
    /**
     * Generate keyframe data for a simple spin animation.
     * @param duration The length of time in seconds it takes to complete a full revolution.
     * @param axis The axis of rotation in local space.
     */
    private generateSpinKeyframes;
}
//# sourceMappingURL=app.d.ts.map