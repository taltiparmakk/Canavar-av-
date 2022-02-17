new Vue ({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : [ ],
        attack_multiple : 10,
        heal_up_multiple : 20,
        special_attack_multiple : 20,
        monster_attack_multiple : 10,
        log_text : { 
            attack : "OYUNCU ATAĞI",
            special_attack : "ULTİ",
            monster_attack : "CANAVAR ATAĞI",
            heal_up : "HEAL",
            give_up : "GİVE UP!"
        }
        

    },
    methods : {
        start_game : function(){
            this.game_is_on = true;
        },
        attack : function(){

            var point = Math.ceil(Math.random()* this.attack_multiple);
            this.monster_heal-=point;
            this.add_to_log({ turn : "p", text : "Player Attack (" + point + ")"})
            this.monster_attack();
        },
        special_attack : function(){
            var point = Math.ceil(Math.random()*this.special_attack_multiple);
            this.monster_heal-=point;
            this.add_to_log({ turn : "p", text : "ULTi (" + point + ")"})
            this.monster_attack();
        },
        heal_up : function(){
            var point = Math.ceil(Math.random()*this.heal_up_multiple);
            this.add_to_log({ turn : "p", text : "Healed (" + point + ")"})
            this.player_heal+=point;
            this.monster_attack();
        },
        give_up : function(){
            this.player_heal=0;
            this.add_to_log({ turn : "p", text : "Give Up!"})

        },
        monster_attack : function(){
        var point = Math.ceil(Math.random()*this.monster_attack_multiple);
        this.player_heal-=point;
        this.add_to_log({ turn : "m", text : "Monster Attack (" + point + ")"})
        },
    
    add_to_log : function(log){
        this.logs.push(log);
    }
    },

    watch : {
        player_heal : function(value){
            if(value <= 0) {
            this.player_heal = 0;
            if (confirm("You lost. Do you want to try Again?")){
                this.player_heal = 100;
                this.monster_heal = 100; 
                this.logs = [];
               }
        }  
        else if (value >= 100){
        this.player_heal = 100; 
        }
    }, 
    monster_heal : function(value){
        if(value <= 0) {
        this.monster_heal = 0;
       if (confirm("You win.Congratulations!")){
        this.player_heal = 100;
        this.monster_heal = 100; 
        this.logs = [];
       }
    }  
    else if (value >= 100){
    this.monster_heal = 100; 
    }
    }
}
})