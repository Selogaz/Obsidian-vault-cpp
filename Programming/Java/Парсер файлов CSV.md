Моя версия:
```java
public class Main {  
    public static void main(String[] args) {  
        StringBuilder builder = new StringBuilder();  
        String path = "data/movementList.csv";  
        List<String> lines = new ArrayList<>();  
        try {  
            lines = Files.readAllLines(Paths.get(path));  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        lines = lines.stream()  
                .skip(1)  
                .collect(Collectors.toList());  
        for(String line : lines) {  
            builder.append(line + "\n");  
        }  
        ArrayList<String> payType = getPayType(builder.toString());  
        ArrayList<Double> expences = getExpences(builder.toString(), payType);  
        HashMap<String, Double> payTypeAndExpences = new HashMap<>();  
        for(int i = 0; i < payType.size(); i++) {  
            if (payTypeAndExpences.containsKey(payType.get(i))) payTypeAndExpences.put(payType.get(i), payTypeAndExpences.get(payType.get(i)) + expences.get(i));  
            else payTypeAndExpences.put(payType.get(i), expences.get(i));  
        }  
        for (HashMap.Entry<String, Double> e : payTypeAndExpences.entrySet()) {  
            System.out.println(e.getKey() + "\t" + e.getValue());  
        }  
    }  
  
    public static ArrayList<Double> getExpences(String builder,ArrayList<String> payType) {  
        ArrayList<Double> expences = new ArrayList<>();  
        String regex = "\s+[0-9]{1,5}\\.[0-9]{2}\s+";  
        Pattern pattern = Pattern.compile(regex);  
        Matcher matcher = pattern.matcher(builder);  
        while (matcher.find()) {  
            expences.add(Double.parseDouble(matcher.group()));  
        }  
        return expences;  
    }  
  
    public static ArrayList<String> getPayType(String builder) {  
        ArrayList<String> payType = new ArrayList<>();  
        String regex = "[^a-zA-Z0-9]([a-zA-Z0-9\s]+)[0-9]{2}\\.[0-9]{2}\\.[0-9]{2}\s[0-9]{2}\\.[0-9]{2}\\.[0-9]{2}";  
        Pattern pattern = Pattern.compile(regex);  
        Matcher matcher = pattern.matcher(builder);  
        while (matcher.find()) {  
            StringBuilder result = new StringBuilder();  
            boolean foundSpace = false;  
            int secondSpaceCounter = 0;  
            for (char c : matcher.group().toCharArray()) {//чтобы слова не склеивались  
                if (!foundSpace && c == ' ') {  
                    if (secondSpaceCounter == 0) {  
                        secondSpaceCounter++;  
                        result.append(c);  
                        continue;  
                    }  
                    foundSpace = true;  
                } else if (!foundSpace) {  
                    result.append(c);  
                }  
            }  
            String trimmedString = result.toString();  
            trimmedString = trimmedString.substring(1,trimmedString.length() - 1);//убрал символы перед словами  
            payType.add(trimmedString);  
        }  
        return payType;  
    }  
}
```

Версия Skillbox:

```java
public class Main {
public static void main(String[] args) {
String path =
"/Users/sortedmap/Desktop/movementList.csv";
List<String> lines = new ArrayList<>();
try {
lines = Files.readAllLines(Paths.get(path));
} catch (IOException e) {
e.printStackTrace();
}
HashMap<String, Double> expence2sum = new HashMap<>();
String firstLine = null;
for(String line : lines) {
if(firstLine == null) {
firstLine = line;
continue;
}
String[] tokens = line.split(",");
double expense = Double.parseDouble(tokens[7]);
if(expense == 0) {
continue;
}
String paymentType = getPaymentType(tokens[5]);
if(!expence2sum.containsKey(paymentType)) {
expence2sum.put(paymentType, 0.);
}
expence2sum.put(
paymentType,
expence2sum.get(paymentType) + expense
);
}
for(String paymentType : expence2sum.keySet()) {
double sum = expence2sum.get(paymentType);
System.out.println(paymentType + "\t" + sum);
}
}
private static String getPaymentType(String info) {
String regex =
"[^a-zA-Z0-9]([a-zA-Z0-9\s]+)[0-9]{2}\\.[0-9]{2}\\.[0-9]{2}\s
[0-9]{2}\\.[0-9]{2}\\.[0-9]{2}";
Pattern pattern = Pattern.compile(regex);
Matcher matcher = pattern.matcher(info);
return matcher.find() ? matcher.group(1).trim() :
null;
}
}
```

[[Java]] [[Готовый код]] [[CSV]] 