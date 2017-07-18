import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "menu": {
        "display": "flex",
        "justifyContent": "space-around",
        "marginBottom": 50
    },
    "top": {
        "position": "relative",
        "height": 500,
        "color": "#fff",
        "width": "100%"
    },
    "menu_item img": {
        "height": 300,
        "width": 300
    },
    "menu_item": {},
    "menu_item:hover": {
        "boxShadow": "10px 20px 5px -5px rgba(186,180,186,1)"
    },
    "menu_title": {
        "display": "block",
        "textAlign": "center",
        "fontSize": 20,
        "height": 50,
        "lineHeight": 30,
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0,
        "backgroundColor": "rgb(234, 238, 244)"
    },
    "menu-container": {
        "display": "flex",
        "flexDirection": "column",
        "position": "relative",
        "width": "100%",
        "height": "100%",
        "backgroundColor": "#00bcd4"
    },
    "menu-top-canvas": {
        "height": "100%",
        "width": "100%",
        "position": "absolute",
        "zIndex": 2
    },
    "top_context": {
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%,-50%)"
    },
    "top_desc": {
        "fontSize": 18,
        "textAlign": "center"
    },
    "gitLogo": {
        "width": 50,
        "height": 50
    },
    "footer": {
        "color": "#fff",
        "textAlign": "center",
        "backgroundColor": "rgb(41, 154, 236)",
        "height": 120,
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0
    },
    "webNum": {
        "display": "block",
        "fontSize": 16
    },
    "left-silde": {
        "position": "fixed",
        "height": "100%",
        "textAlign": "center",
        "width": 250,
        "backgroundColor": "#f4f4f4"
    },
    "left-silde nav": {
        "left": 0,
        "top": "50%",
        "transform": "translateY(50%)"
    },
    "container_wrap": {
        "position": "relative",
        "marginLeft": 250
    },
    "nav > li > a": {
        "fontSize": 24
    }
});