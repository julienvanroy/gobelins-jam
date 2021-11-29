import Stats from "stats.js/src/Stats";
import {Pane} from "tweakpane";
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            this._setPane()
            this._setStats()
        }
    }

    _setPane() {
        this.pane = new Pane()
        this.pane.registerPlugin(EssentialsPlugin);
    }

    _setStats() {
        this.fpsGraph = this.pane.addBlade({
            view: 'fpsgraph',

            label: 'fpsgraph',
            lineCount: 2,
        });
        this.stats = new Stats()
        document.body.appendChild( this.stats.dom );
    }

    begin() {
        if(!this.active) return;
        this.fpsGraph.begin();
        this.stats.begin()
    }

    end() {
        if(!this.active) return;
        this.fpsGraph.end();
        this.stats.end()
    }

}
