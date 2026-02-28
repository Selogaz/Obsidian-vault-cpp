---
tags:
  - note/basic/primary
  - category/linux
aliases: []
created: 2026-02-28T00:00:00+07:00
updated: 2026-02-28T22:09:41+03:00
---

# План атомизации: How Linux Works (Brian Ward)

## Книга: How Linux Works, 3rd Edition
**Автор:** Brian Ward
**Год:** 2021
**Издательство:** No Starch Press
**Страниц:** 464

---

## Глава 1: The Big Picture

### Подразделы для атомизации:
1. **1.1** Levels and Layers of Abstraction in a Linux System
2. **1.2** Hardware: Understanding Main Memory
3. **1.3** The Kernel
	 - 1.3.1 Process Management
	 - 1.3.2 Memory Management
	 - 1.3.3 Device Drivers and Management
	 - 1.3.4 System Calls and Support
4. **1.4** User Space
5. **1.5** Users
6. **1.6** Looking Forward

### Атомарные заметки (потенциальные):
- Уровни абстракции в Linux
- Оперативная память (RAM) в Linux
- Архитектура ядра Linux
- Управление процессами в ядре
- Управление памятью в ядре
- Драйверы устройств в Linux
- Системные вызовы (syscalls)
- Пользовательское пространство (User Space)
- Модель пользователей в Linux

---

## Глава 2: Basic Commands and Directory Hierarchy

### Подразделы для атомизации:
1. **2.1** The Bourne Shell: /bin/sh
2. **2.2** Using the Shell
	 - 2.2.1 The Shell Window
	 - 2.2.2 cat
	 - 2.2.3 Standard Input and Standard Output
3. **2.3** Basic Commands
4. **2.4** Working with Files
5. **2.5** Directory Commands
6. **2.6** Process Management Commands
7. **2.7** File Permissions
8. **2.8** Archiving and Compressing Files
	 - 2.8.1 gzip
	 - 2.8.2 tar
9. **2.9** Linux Directory Hierarchy Essentials
10. **2.10** Running Commands as the Root User

### Атомарные заметки (потенциальные):
- Bourne Shell и /bin/sh
- Основы работы с Shell
- Стандартный ввод/вывод (stdin, stdout, stderr)
- Базовые команды Linux (ls, cd, pwd, cp, mv, rm)
- Работа с файлами в Linux
- Команды для работы с директориями
- Управление процессами (ps, kill, top)
- Права доступа к файлам (chmod, chown)
- Команды архивирования (tar, gzip, zip)
- Иерархия директорий Linux (FHS)
- Выполнение команд от root (sudo, su)

---

## Глава 3: Devices

### Подразделы для атомизации:
1. **3.1** Device Files
2. **3.2** The sysfs Device Path
3. **3.3** dd and Devices
4. **3.4** Device Name Summary
	 - 3.4.1 Hard Disks: /dev/sd*
	 - 3.4.2 Terminals: /dev/tty*
	 - 3.4.3 Serial Ports: /dev/ttyUSB*
	 - 3.4.4 Sound Devices: /dev/snd/*
	 - 3.4.5 Device Nodes with udev

### Атомарные заметки (потенциальные):
- Device files в Linux (/dev)
- sysfs и работа с устройствами
- Команда dd и устройства
- Именование устройств в Linux (udev)
- Жёсткие диски /dev/sd*
- Терминалы /dev/tty*
- Серийные порты
- Звуковые устройства /dev/snd

---

## Глава 4: Disks and Filesystems

### Подразделы для атомизации:
1. **4.1** Partitioning Disk Devices
2. **4.2** Filesystems
3. **4.3** Disk Buffering, Caching, and Filesystems
4. **4.4** Filesystem Mounting
5. **4.5** Filesystem Architecture
6. **4.6** Disk Partitioning
7. **4.7** Logical Volume Manager (LVM)

### Атомарные заметки (потенциальные):
- Разметка дисков (partitioning)
- Типы файловых систем Linux (ext4, xfs, btrfs)
- Кеширование и буферизация файловых систем
- Монтирование файловых систем (mount/umount)
- Архитектура файловой системы
- Инструменты разметки (fdisk, parted, gdisk)
- LVM - Logical Volume Manager

---

## Глава 5: How the Linux Kernel Boots

### Подразделы для атомизации:
1. **5.1** Bootloaders
2. **5.2** Kernel Boot Parameters
3. **5.3** init (systemd)

### Атомарные заметки (потенциальные):
- Загрузчики Linux (GRUB, syslinux)
- Процесс загрузки ядра Linux
- Параметры загрузки ядра (kernel boot parameters)
- Systemd как init система
- Процесс загрузки Linux от BIOS до User Space

---

## Глава 6: How User Space Starts

### Подразделы для атомизации:
1. **6.1** init (systemd)
2. **6.2** systemd Units
3. **6.3** systemd Targets (Runlevels)
4. **6.4** Managing Services with systemctl

### Атомарные заметки (потенциальные):
- Запуск User Space в Linux
- Systemd units и типы
- Systemd targets (runlevels)
- Управление сервисами (systemctl)
- Зависимости сервисов в systemd

---

## Глава 7: System Configuration

### Подразделы для атомизации:
1. **7.1** System Logging
2. **7.2** System Time Configuration
3. **7.3** Batch Jobs (cron, at)
4. **7.4** User Management

### Атомарные заметки (потенциальные):
- Системное логирование (syslog, journald)
- rsyslog и logrotate
- Настройка системного времени (timedatectl, NTP)
- Планирование задач (cron, crontab, at)
- Управление пользователями (useradd, usermod)
- Файлы /etc/passwd, /etc/shadow, /etc/group

---

## Глава 8: A Closer Look at Processes and Resource Utilization

### Подразделы для атомизации:
1. **8.1** Process Resource Utilization
2. **8.2** Monitoring Processes
3. **8.3** Process Priorities and Niceness
4. **8.4** The /proc Filesystem

### Атомарные заметки (потенциальные):
- Ресурсы процесса (CPU, Memory, I/O)
- Мониторинг процессов (top, htop, ps)
- Приоритеты процессов (nice, renice)
- Файловая система /proc
- Состояния процессов в Linux

---

## Глава 9: Understanding Your Network and Its Configuration

### Подразделы для атомизации:
1. **9.1** Network Interfaces
2. **9.2** IP Addresses
3. **9.3** DNS and hostname resolution
4. **9.4** Routing
5. **9.5** Network Configuration Tools

### Атомарные заметки (потенциальные):
- Сетевые интерфейсы в Linux
- IP-адресация (IPv4, IPv6)
- Настройка DNS (resolv.conf)
- Маршрутизация в Linux
- Команды настройки сети (ip, ifconfig, route)
- NetworkManager

---

## Глава 10: Network Applications and Services

### Подразделы для атомизации:
1. **10.1** Network Servers
2. **10.2** inetd and xinetd
3. **10.3** Services and Ports

### Атомарные заметки (потенциальные):
- Сетевые серверы в Linux
- inetd и xinetd
- Порты и сервисы (/etc/services)
- SSH, HTTP, FTP серверы

---

11: Introduction to## Глава Shell Scripts

### Подразделы для атомизации:
1. **11.1** Shell Script Basics
2. **11.2** Variables and Parameters
3. **11.3** Conditionals and Loops
4. **11.4** Functions in Scripts

### Атомарные заметки (потенциальные):
- Основы shell скриптов
- Переменные в shell
- Условные конструкции (if, case)
- Циклы в shell (for, while)
- Функции в shell скриптах

---

## Глава 12: Network File Transfer and Sharing

### Подразделы для атомизации:
1. **12.1** rsync
2. **12.2** scp и sftp
3. **12.3** NFS
4. **12.4** Samba (SMB/CIFS)

### Атомарные заметки (потенциальные):
- rsync для синхронизации файлов
- scp и sftp - безопасная передача файлов
- NFS - сетевая файловая система
- Samba для Windows-совместимости

---

## Глава 13: User Environments

### Подразделы для атомизации:
1. **13.1** Login Process
2. **13.2** Environment Variables
3. **13.3** Shell Configuration
4. **13.4** Localization

### Атомарные заметки (потенциальные):
- Процесс входа в систему (login)
- Переменные окружения (PATH, HOME)
- Настройка shell (.bashrc, .bash_profile)
- Локализация в Linux (locale)

---

## Глава 14: A Brief Survey of the Linux Desktop and Printing

### Подразделы для атомизации:
1. **14.1** X Window System
2. **14.2** Desktop Environments
3. **14.3** Printing in Linux (CUPS)

### Атомарные заметки (потенциальные):
- X Window System (X11)
- Срезы рабочего стола (GNOME, KDE)
- CUPS система печати

---

## Глава 15: Containers

### Подразделы для атомизации:
1. **15.1** Container Basics
2. **15.2** Docker
3. **15.3** Container Orchestration

### Атомарные заметки (потенциальные):
- Контейнеризация в Linux
- Docker основы
- Dockerfiles и образы
- Docker Compose
- Оркестрация контейнеров

---

## Глава 16: Introduction to Compiling Software from C Source Code

### Подразделы для атомизации:
1. **16.1** Compilers and Build Tools
2. **16.2** make и Makefiles
3. **16.3** Library Dependencies
4. **16.4** Package Management

### Атомарные заметки (потенциальные):
- Компиляторы (gcc, clang)
- make и Makefiles
- Статические и динамические библиотеки
- Управление зависимостями
- configure, cmake

---

## Глава 17: Virtualization

### Подразделы для атомизации:
1. **17.1** Virtualization Basics
2. **17.2** Container-Based Virtualization
	 - 17.2.1 Docker
	 - 17.2.2 Podman
	 - 17.2.3 LXC
	 - 17.2.4 Kubernetes
3. **17.3** Runtime-Based Virtualization

### Атомарные заметки (потенциальные):
- Виртуализация в Linux (KVM, Xen)
- QEMU/KVM
- Контейнерная виртуализация
- LXC и LXD
- Kubernetes основы
- Виртуальные машины против контейнеров

---

## Сводная статистика

| Глава | Название | Примерное кол-во атомов |
|-------|----------|------------------------|
| 1 | The Big Picture | 9-10 |
| 2 | Basic Commands and Directory Hierarchy | 12-15 |
| 3 | Devices | 8-10 |
| 4 | Disks and Filesystems | 7-8 |
| 5 | How the Linux Kernel Boots | 5-6 |
| 6 | How User Space Starts | 5-6 |
| 7 | System Configuration | 6-7 |
| 8 | Processes and Resource Utilization | 5-6 |
| 9 | Network Configuration | 5-6 |
| 10 | Network Applications and Services | 4-5 |
| 11 | Introduction to Shell Scripts | 5-6 |
| 12 | Network File Transfer and Sharing | 4-5 |
| 13 | User Environments | 4-5 |
| 14 | Linux Desktop and Printing | 3-4 |
| 15 | Containers | 3-4 |
| 16 | Compiling Software | 5-6 |
| 17 | Virtualization | 5-6 |

**Всего:** ~100-120 атомарных заметок
