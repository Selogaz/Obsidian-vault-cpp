#include <iostream>


int main(int argc, char **argv) {
    long km;
    long benz;
   
    std::cout << "Введите количество пройденных километров ___\b\b\b";
    std::cin >> km;
    std::cout << "Введите количество потраченного бензина в литрах ___\b\b\b";
    std::cin >> benz;
    double relation = double(benz) / double(km) * 100;
    
    std::cout << "Ваша тачка жрет " << relation << "л на 100км" << std::endl;
    return 0;
}