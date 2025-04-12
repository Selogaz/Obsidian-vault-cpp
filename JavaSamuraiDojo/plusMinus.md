---
aliases:
  - ^code
  - ^java
---

```java
public static void plusMinus(List<Integer> arr) {  
    // Write your code here  
    float positive = 0.0f;  
    float zeros = 0.0f;  
    float negative = 0.0f;  
    for (Integer item : arr) {  
        if (item > 0) {  
            positive++;  
        } else if (item == 0) {  
            zeros++;  
        } else {  
            negative++;  
        }  
    }  
    String pos = String.format("%.6f", positive/arr.size());  
    String zer = String.format("%.6f", zeros/arr.size());  
    String neg = String.format("%.6f", negative/arr.size());  
    System.out.println(pos);  
    System.out.println(zer);  
    System.out.println(neg);  
}
```
#hackerRank #алгоритмы 