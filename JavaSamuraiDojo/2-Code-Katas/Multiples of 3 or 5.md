```java
public static int solution(int number){  
    int sum = 0;  
    for (int i = 3; i < number; i++) {  
        if (i % 3 == 0 || i % 5 == 0) {  
            sum += i;  
        }  
    }  
    return sum;  
}
```
#алгоритмы #codeWars [[CodeWars]] 