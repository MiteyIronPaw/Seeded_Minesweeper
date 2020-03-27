time = 0;
stopped_time = 0;

function start_time(){
    time = Date.now();
}

function get_time(){
    if(GameOver){
        return stopped_time;
    }else{
        if(time == 0){
            return 0;
        }

        let time_delta = Date.now() - time;

        //Round and convert to seconds
        return Math.round(time_delta/10)/100;
    }
}

function stop_time(){
    stopped_time = get_time();
}
