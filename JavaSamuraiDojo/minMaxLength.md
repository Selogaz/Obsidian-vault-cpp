---
aliases:
  - ^code
  - ^java
---

```java
public static void miniMaxSum(List<Integer> arr) {
// Write your code here
	Collections.sort(arr);
	long minSum = 0;
	long maxSum = 0;
	for (int i = 0; i < arr.size() - 1; i++) {
		minSum += arr.get(i);
		maxSum += arr.get(i+1);
	}
	System.out.println(minSum + " " + maxSum);
}
```
#hackerRank #алгоритмы 