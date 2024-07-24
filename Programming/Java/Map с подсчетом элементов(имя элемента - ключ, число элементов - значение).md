---
создал заметку: 2024-07-21
tags:
  - StreamAPI
---
```java
public static long findCountAircraftWithModelAirbus(Airport airport, String model) {  
    //TODO Метод должен вернуть количество самолетов указанной модели.  
    // подходят те самолеты, у которых name начинается со строки model  
    List<Aircraft> airportList = airport.getAllAircrafts();  
    return airportList.stream()  
            .filter(name-> name.getModel().contains(model))  
            .count();  
}в
```