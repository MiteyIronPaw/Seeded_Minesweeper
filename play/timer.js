time = 0;
stopped_time = 0;

function start_time(){
    time = Date.now();
}

function get_time(){
    if(GameOver){
        return stopped_time;
    }else{
        if(time == 0){return 0;}
        return (Date.now()-time)/1000;
    }
}

function stop_time(){
    stopped_time = get_time();
}
