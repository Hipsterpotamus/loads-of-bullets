function Roomstart(floor,seed,dir){
    rinterval=0;
    switch(floor+"-"+seed){
        case "1-1":
            Red(enemRand());
            Red(enemRand());
            Red(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "1-2":
            Tinman(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "1-3":
            Orange(enemRand());
            Orange(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "1-4":
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Eyeman(enemRand());
            break;
        case "1-5":
            Red(enemRand());
            Red(enemRand());
            Orange(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;
        case "1-6":
            Bully(enemRand());
            Bully(enemRand());
            Red(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "1-7":
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Red(enemRand());
            Red(enemRand());
            Red(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            break;
        case "1-8":
            Pink(enemRand());
            Pink(enemRand());
            Blue(enemRand());
            Bully(enemRand());
            break;
        case "1-9":
            Teal(enemRand());
            Teal(enemRand());
            Eyeman(enemRand());
            Eyeman(enemRand());
            break;
        case "1-10":
            Blue(enemRand());
            Blue(enemRand());
            Tinman(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            break;
        case "1-11":
            Tinman(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;  
        case "1-12":
            BlueV(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            break;          
        case "1-13":
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Red(enemRand());
            break;
        case "1-14":
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Pink(enemRand());
            break;        
        case "1-15":
            Tinman(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "1-16":
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            BlueV(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Tinman(enemRand());
            Tinman(enemRand());
            break;
        case "1-17":
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Red(enemRand());
            Red(enemRand());
            break;
        case "1-18":
            Tinman(enemRand());
            Tinman(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;
        case "1-19":
            Eyeman(enemRand());
            Eyeman(enemRand());
            Eyeman(enemRand());
            Eyeman(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;
        case "1-20":
            Tinman(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Red(enemRand());
            Red(enemRand());
            Red(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;
        case "1-1B":
            Sixy(createVector(1600*P,800*P));
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            break;
        case "1-2B":
            DarkHorse(createVector(1600*P,800*P))
            break;
        case "1-3B":
            RedPappa(enemRand());
            break;
        case "2-1":
            Purple(enemRand());
            Brown(enemRand());
            Indigo(enemRand());
            break;
        case "2-2":
            Steelman(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "2-3":
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            break;
        case "2-4":
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Green(enemRand());
            Purple(enemRand());
            Purple(enemRand());
            break;
        case "2-5":
            Bully(enemRand());
            Bully(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "2-6":
            Brown(enemRand());
            Brown(enemRand());
            Tinman(enemRand());
            Tinman(enemRand());
            Tinman(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;
        case "2-7":
            Indigo(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Eyeman(enemRand());
            Eyeman(enemRand());
            Eyeman(enemRand());
            break;
        case "2-8":
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Brown(enemRand());
            Brown(enemRand());
            Tinman(enemRand());
            break;
        case "2-9":
            Teal(enemRand());
            Teal(enemRand());
            Steelman(enemRand());
            Tinman(enemRand());
            break;
        case "2-10":
            Indigo(enemRand());
            Indigo(enemRand());
            Steelman(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            break;
        case "2-11":
            Tinman(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            break;  
        case "2-12":
            BlueV(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            break;          
        case "2-13":
            Steelman(enemRand());
            Steelman(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Red(enemRand());
            Red(enemRand());
            break;
        case "2-14":
            Indigo(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Blue(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;        
        case "2-15":
            Purple(enemRand());
            Purple(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            break;
        case "2-16":
            Indigo(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            BlueV(enemRand());
            Steelman(enemRand());
            Steelman(enemRand());
            break;
        case "2-17":
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Orange(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            break;
        case "2-18":
            Steelman(enemRand());
            Steelman(enemRand());
            Tinman(enemRand());
            Tinman(enemRand());
            Brown(enemRand());
            Brown(enemRand());
            Brown(enemRand());
            Brown(enemRand());
            Teal(enemRand());
            Teal(enemRand());
            break;
        case "2-19":
            Purple(enemRand());
            Purple(enemRand());
            Purple(enemRand());
            Purple(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Red(enemRand());
            Red(enemRand());
            break;
        case "2-20":
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Bully(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            Indigo(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Pink(enemRand());
            Brown(enemRand());
            Brown(enemRand());
            break;
        case "2-1B":
            PurplePrince(enemRand());
            break;
        case "2-2B":
            Clockra(createVector(1600*P,800*P))
            break;
        case "2-3B":
            TheAce(enemRand());
            break;
    }
}
function enemRand(){
    let POSITION = createVector(random(width * 0.25,width * 0.75),random(height*0.25,height*0.75));
    while(true){
        if(hittingObstacles(POSITION.x,POSITION.y,50)){POSITION = createVector(random(width * 0.25,width * 0.75),random(height*0.25,height*0.75));
        }else if(hitsAnyEnemy(POSITION.x,POSITION.y,50,enemies.length+1)){POSITION = createVector(random(width * 0.25,width * 0.75),random(height*0.25,height*0.75));}else{
            break;
        }
        
    }
    return POSITION
    
    
}