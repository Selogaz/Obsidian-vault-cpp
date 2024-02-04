#include <iostream>


int main(int argc, char **argv) {
    long seconds;
    const int sec_per_min = 60;
    const int min_per_hr = 60;
    const int hr_per_day = 24;
   
    std::cout << "Введите количество секунд______\b\b\b\b\b\b";
    std::cin >> seconds;
    int days = seconds / (sec_per_min * min_per_hr * hr_per_day);
    int hr = (seconds / (sec_per_min * min_per_hr)) % hr_per_day;
    int min = (seconds / sec_per_min) % min_per_hr;
    int sec = seconds % sec_per_min;
    
    std::cout << seconds << " seconds = " << days << " days "
    << hr << " hours " << min << " minutes " << sec << " seconds " << std::endl;
    return 0;
}