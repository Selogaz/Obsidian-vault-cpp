```c++
#include <iostream>

  
  

int main(int argc, char **argv) {

int inch_cin;

int ft_cin;

int lb;

const int inch_per_ft = 12;

const double m_per_inch = 0.0254;

const double kg_per_lb = 2.2;

std::cout << "Введите широту в градусах:___\b\b\b";

std::cin >> ft_cin;

std::cout << "Дополните широту минутами:___\b\b\b";

std::cin >> inch_cin;

std::cout << "Дополните широту секундами:___\b\b\b";

std::cin >> lb;

int inch = ft_cin * inch_per_ft + inch_cin;

int kg = lb / kg_per_lb;

double metr = inch * m_per_inch;

double BMI = kg / (metr * metr);

std::cout << "Индекс массы тела: " << BMI << std::endl;

return 0;

}
```

[[C++]] [[Исходники]] 