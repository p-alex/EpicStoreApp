const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Add name"]
    },
    smallDesc:{
        type:String,
        required:[true,"Add game page desc"]
    },
    aboutGame:{
        type:String,
        required:[true,"Add game page desc"]
    }
    ,developer:{
        type:String,
        required:[true]
    },publisher:{
        type:String,
        required:[true]
    },releaseDate:{
        type:String,
        required:[true]
    },tags:{
        type:String,
        required:[true]
    },rating:{
        type:String,
        required:[true]
    },platform:{
        type:String,
        required:[true]
    },
    gamePrice: {
        type:Number,
        required:[true, "Add game price"]
    },
    sale:{
        type:Number,
    },
    isFree:{
        type:String
    },
    gameLogoURL:{
        type:String,
        required:[true]
    },
    gameHCover:{
        type:String,
        required:[true]
    },
    gameVCover:{
        type:String,
        required:[true]
    },
    videoURL:{
        type:String,
    },
    imagesURL:{
        type:Array,
    },
    screenshotsURL:{
        type:Array,
    }
});

module.exports = Game = mongoose.model("Game", gameSchema);