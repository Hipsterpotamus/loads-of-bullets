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
    }
}
function enemRand(){
    return createVector(random(480,1440),random(275,825))
    
    
}