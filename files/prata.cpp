#include <iostream>


int main(int argc, char **argv) {
    long all_ppl;
    long rus_ppl;
   
    std::cout << "Введите количество людей в мире ______\b\b\b\b\b\b";
    std::cin >> all_ppl;
    std::cout << "Введите население России ______\b\b\b\b\b\b";
    std::cin >> rus_ppl;
    double relation = double(rus_ppl) / double(all_ppl) * 100;
    
    std::cout << "Население России составляет " << relation << "% от мирового населения " << std::endl;
    return 0;
}