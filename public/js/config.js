turnConfig = {
    iceServers: [{
        urls: ["stun:bn-turn1.xirsys.com"]
    }, {
        username: "wIL6KMIE2rpCFFgyHiPu8UPMCw4AeynLUM8_k1RWyBbebc2InnP2wAWnrVYolsNtAAAAAGCWVw1Hb3V0aGFtLUFS",
        credential: "2586d58a-afde-11eb-9d69-0242ac140004",
        urls: ["turn:bn-turn1.xirsys.com:80?transport=udp", "turn:bn-turn1.xirsys.com:3478?transport=udp", "turn:bn-turn1.xirsys.com:80?transport=tcp", "turn:bn-turn1.xirsys.com:3478?transport=tcp", "turns:bn-turn1.xirsys.com:443?transport=tcp", "turns:bn-turn1.xirsys.com:5349?transport=tcp"]
    }]
};