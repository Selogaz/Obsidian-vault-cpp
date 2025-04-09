#include <iostream>


int main(int argc, char **argv) {
    double mpg;
    double litr_to_km;
    double kilo_to_gallon = 62.14;
    double litr_to_gallon = 3.875; 

 std::cout << "Введите количество литров на 100км ___\b\b\b";
 std::cin >> litr_to_km;

    mpg = litr_to_gallon * kilo_to_gallon/ (litr_to_km);
    std::cout << "Ебучий ответ к ебучей задаче " << mpg << std::endl;
    return 0;
}