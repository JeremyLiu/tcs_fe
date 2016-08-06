import React from 'react'
import {connect} from 'react-redux'
import {PLAY_RECORD} from '../constant/api.js'

var Player = React.createClass({

    getDefaultProps(){
        return {
            url: "http://listen.radionomy.com/abc-jazz"
        }
    },
    componentDidMount(){
        let {url} = this.props;
        let {jplayer} = this.refs;
        $(jplayer).jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: url
                });
            },
            play: function() { // To avoid multiple jPlayers playing together.
                $(this).jPlayer("pauseOthers");
            },
            swfPath: "static/js",
            supplied: "mp3",
            wmode: "window",
            cssSelectorAncestor: "#jp_container",
            globalVolume: true,
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true
        });
    },
    componentWillReceiveProps(nextProps){
        $(this.refs.jplayer).jPlayer('setMedia',{
            mp3: nextProps.url
        }).jPlayer('play');
    },
    shouldComponentUpdate(){
      return false;
    },

    render(){
       return <div id="jp_container" className="jp-audio" role="application" style={{
        margin: '15px auto'
       }} aria-label="media player">
           <div ref="jplayer" className="jp-jplayer"></div>
           <div className="jp-type-single">
               <div className="jp-gui jp-interface">
                   <div className="jp-controls">
                       <button className="jp-play" role="button" tabindex="0">play</button>
                       <button className="jp-stop" role="button" tabindex="0">stop</button>
                   </div>
                   <div className="jp-progress">
                       <div className="jp-seek-bar">
                           <div className="jp-play-bar"></div>
                       </div>
                   </div>
                   <div className="jp-volume-controls">
                       <button className="jp-mute" role="button" tabindex="0">mute</button>
                       <button className="jp-volume-max" role="button" tabindex="0">max volume</button>
                       <div className="jp-volume-bar">
                           <div className="jp-volume-bar-value"></div>
                       </div>
                   </div>
                   <div className="jp-time-holder">
                       <div className="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
                       <div className="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
                       <div className="jp-toggles">
                           <button className="jp-repeat" role="button" tabindex="0">repeat</button>
                       </div>
                   </div>
               </div>
               <div className="jp-no-solution">
                   <span>Update Required</span>
                   To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
               </div>
           </div>

       </div>
    }
});

function stateMap(state){
    return {
        url: state.record.curPlay<=0 ?
            state.record.playUrl:
            PLAY_RECORD+"?id=" + state.record.curPlay
            + "&recording=" + state.record.recording
    }
}

export default connect(stateMap)(Player);