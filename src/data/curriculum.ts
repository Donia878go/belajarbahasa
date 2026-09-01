import { LanguageTrack } from "@/types/curriculum";

export const CURRICULUM_DATA: LanguageTrack[] = [
  {
    id: "python",
    name: "Python",
    category: "Modern",
    year: "1991",
    monacoLang: "python",
    judge0Id: 71,
    description: "Bahasa dinamis tingkat tinggi dengan sintaksis ekspresif dan keterbacaan tinggi.",
    modules: [
      {
        id: "py-1",
        order: 1,
        level: "Dasar",
        title: "Sistem I/O Standar",
        theory: "Fungsi print() digunakan untuk mencetak teks dan nilai ke konsol standar.",
        task: "Cetak kalimat 'Halo Dunia!' ke konsol.",
        initialCode: `# Modul 1: Print Standar\nprint(???)`,
        solutionCode: `print("Halo Dunia!")`,
        expectedOutput: "Halo Dunia!",
        hints: ["Gunakan tanda petik dua di dalam print()", 'Format: print("Halo Dunia!")']
      },
      {
        id: "py-2",
        order: 2,
        level: "Variabel",
        title: "Tipe Data & F-String",
        theory: "Variabel menyimpan nilai secara dinamis tanpa perlu deklarasi tipe data eksplisit.",
        task: "Definisikan variabel nama='Doni' dan skor=95, lalu cetak menggunakan format f-string.",
        initialCode: `nama = "Doni"\nskor = ???\nprint(f"User {nama} memperoleh skor {skor}")`,
        solutionCode: `nama = "Doni"\nskor = 95\nprint(f"User {nama} memperoleh skor {skor}")`,
        expectedOutput: "User Doni memperoleh skor 95",
        hints: ["Isi variabel skor dengan angka 95 tanpa petik"]
      },
      {
        id: "py-3",
        order: 3,
        level: "Percabangan",
        title: "Kondisi If-Else",
        theory: "Percabangan if-elif-else menentukan alur eksekusi berdasarkan evaluasi boolean.",
        task: "Lengkapi kondisi agar mencetak 'Lulus' jika nilai minimal 75.",
        initialCode: `nilai = 80\nif nilai >= ???:\n    print("Lulus")\nelse:\n    print("Remedial")`,
        solutionCode: `nilai = 80\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Remedial")`,
        expectedOutput: "Lulus",
        hints: ["Ambang batas kelulusan adalah 75"]
      },
      {
        id: "py-4",
        order: 4,
        level: "Perulangan",
        title: "Iterasi For Loop & Range",
        theory: "Fungsi range(start, stop) menghasilkan urutan angka untuk iterasi perulangan.",
        task: "Buat loop untuk mencetak angka 1 sampai 3 berurutan.",
        initialCode: `for i in range(1, ???):\n    print(f"Langkah {i}")`,
        solutionCode: `for i in range(1, 4):\n    print(f"Langkah {i}")`,
        expectedOutput: "Langkah 1\nLangkah 2\nLangkah 3",
        hints: ["Range berhenti sebelum parameter batas atas. Gunakan 4 agar berhenti di 3."]
      },
      {
        id: "py-5",
        order: 5,
        level: "Struktur Data",
        title: "List & Dictionary Comprehension",
        theory: "List comprehension menyaring dan memetakan koleksi data secara ringkas.",
        task: "Ambil bilangan genap dari list dan cetak hasilnya.",
        initialCode: `angka = [1, 2, 3, 4, 5, 6]\ngenap = [x for x in angka if x % 2 == ???]\nprint(genap)`,
        solutionCode: `angka = [1, 2, 3, 4, 5, 6]\ngenap = [x for x in angka if x % 2 == 0]\nprint(genap)`,
        expectedOutput: "[2, 4, 6]",
        hints: ["Bilangan genap memiliki sisa bagi modulo 2 sama dengan 0"]
      },
      {
        id: "py-6",
        order: 6,
        level: "Fungsi",
        title: "Parameter & Return Value",
        theory: "Fungsi membungkus logika reusable dengan kata kunci def dan return.",
        task: "Lengkapi fungsi hitung_pajak untuk mengembalikan nominal 10% dari harga.",
        initialCode: `def hitung_pajak(harga):\n    return harga * ???\n\nprint(int(hitung_pajak(50000)))`,
        solutionCode: `def hitung_pajak(harga):\n    return harga * 0.1\n\nprint(int(hitung_pajak(50000)))`,
        expectedOutput: "5000",
        hints: ["10% bernilai desimal 0.1"]
      },
      {
        id: "py-7",
        order: 7,
        level: "Error Handling",
        title: "Blok Try-Except",
        theory: "Try-except mencegah program terhenti saat terjadi runtime exception.",
        task: "Tangkap error ZeroDivisionError dan cetak pesan 'Tidak bisa membagi nol'.",
        initialCode: `try:\n    hasil = 10 / 0\nexcept ???:\n    print("Tidak bisa membagi nol")`,
        solutionCode: `try:\n    hasil = 10 / 0\nexcept ZeroDivisionError:\n    print("Tidak bisa membagi nol")`,
        expectedOutput: "Tidak bisa membagi nol",
        hints: ["Gunakan nama exception ZeroDivisionError atau Exception"]
      },
      {
        id: "py-8",
        order: 8,
        level: "OOP / Paradigma",
        title: "Class & Constructor (__init__)",
        theory: "Paradigma OOP mengelompokkan data (atribut) dan perilaku (method) dalam Class.",
        task: "Lengkapi konstruktor kelas Akun dengan atribut saldo.",
        initialCode: `class Akun:\n    def __init__(self, saldo):\n        self.saldo = ???\n\na = Akun(100000)\nprint(f"Saldo: {a.saldo}")`,
        solutionCode: `class Akun:\n    def __init__(self, saldo):\n        self.saldo = saldo\n\na = Akun(100000)\nprint(f"Saldo: {a.saldo}")`,
        expectedOutput: "Saldo: 100000",
        hints: ["Petakan parameter saldo ke self.saldo"]
      },
      {
        id: "py-9",
        order: 9,
        level: "Fitur Khas",
        title: "Decorator & Generator Yield",
        theory: "Generator menggunakan kata kunci yield untuk streaming data hemat memori.",
        task: "Lengkapi fungsi generator deret ganjil.",
        initialCode: `def ganjil(limit):\n    for i in range(1, limit + 1, 2):\n        ??? i\n\nprint(list(ganjil(5)))`,
        solutionCode: `def ganjil(limit):\n    for i in range(1, limit + 1, 2):\n        yield i\n\nprint(list(ganjil(5)))`,
        expectedOutput: "[1, 3, 5]",
        hints: ["Gunakan kata kunci yield untuk mengembalikan item generator"]
      },
      {
        id: "py-10",
        order: 10,
        level: "Mini Project",
        title: "Aplikasi Kasir Mini Diskon",
        theory: "Menggabungkan fungsi, perulangan, kondisi, dan manipulasi dictionary.",
        task: "Hitung total belanjaan setelah diskon 20% jika total belanja melebihi 100.000.",
        initialCode: `item = {"Laptop Stand": 80000, "OTG Hub": 40000}\ntotal = sum(item.values())\n\nif total > 100000:\n    total_bayar = total - (total * ???)\nelse:\n    total_bayar = total\n\nprint(f"Total Bayar: Rp{int(total_bayar)}")`,
        solutionCode: `item = {"Laptop Stand": 80000, "OTG Hub": 40000}\ntotal = sum(item.values())\n\nif total > 100000:\n    total_bayar = total - (total * 0.2)\nelse:\n    total_bayar = total\n\nprint(f"Total Bayar: Rp{int(total_bayar)}")`,
        expectedOutput: "Total Bayar: Rp96000",
        hints: ["Diskon 20% sama dengan pengali 0.2"]
      }
    ]
  },
  {
    id: "c",
    name: "C (ANSI / C99)",
    category: "Klasik & Retro",
    year: "1972",
    monacoLang: "c",
    judge0Id: 50,
    description: "Bahasa terkompilasi prosedural dengan efisiensi performa dan manipulasi memori tingkat rendah.",
    modules: [
      {
        id: "c-1",
        order: 1,
        level: "Dasar",
        title: "Struktur Header & printf",
        theory: "Program C mengeksekusi entry point main() dan membutuhkan header stdio.h.",
        task: "Cetak pesan 'C System Online' ke stdout.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    printf("???\\n");\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint main(void) {\n    printf("C System Online\\n");\n    return 0;\n}`,
        expectedOutput: "C System Online",
        hints: ["Tulis kalimat 'C System Online' di dalam kutip"]
      },
      {
        id: "c-2",
        order: 2,
        level: "Variabel",
        title: "Tipe Data Primitif & Format Specifier",
        theory: "Format specifier seperti %d untuk integer dan %f untuk desimal.",
        task: "Cetak nilai bilangan bulat menggunakan format specifier %d.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int tahun = 1972;\n    printf("Rilis C: ???\\n", tahun);\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint main(void) {\n    int tahun = 1972;\n    printf("Rilis C: %d\\n", tahun);\n    return 0;\n}`,
        expectedOutput: "Rilis C: 1972",
        hints: ["Gunakan %d untuk format integer"]
      },
      {
        id: "c-3",
        order: 3,
        level: "Percabangan",
        title: "Logika Kondisi Switch-Case",
        theory: "Switch-case mengevaluasi konstanta integer atau karakter secara terstruktur.",
        task: "Lengkapi pemecah kondisi break pada case switch.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int status = 1;\n    switch(status) {\n        case 1:\n            printf("Status: Aktif\\n");\n            ???;\n        default:\n            printf("Status: Nonaktif\\n");\n    }\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint main(void) {\n    int status = 1;\n    switch(status) {\n        case 1:\n            printf("Status: Aktif\\n");\n            break;\n        default:\n            printf("Status: Nonaktif\\n");\n    }\n    return 0;\n}`,
        expectedOutput: "Status: Aktif",
        hints: ["Gunakan kata kunci break"]
      },
      {
        id: "c-4",
        order: 4,
        level: "Perulangan",
        title: "Perulangan For Loop",
        theory: "For loop di C memadukan inisialisasi, kondisi terminasi, dan inkremen.",
        task: "Ulangi pencetakan hingga angka 3.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    for (int i = 1; i <= ???; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint main(void) {\n    for (int i = 1; i <= 3; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}`,
        expectedOutput: "1 2 3 ",
        hints: ["Gunakan angka 3 pada batas perulangan"]
      },
      {
        id: "c-5",
        order: 5,
        level: "Struktur Data",
        title: "Struct Entitas",
        theory: "Struct menggabungkan beberapa tipe data berbeda ke dalam satu entitas record.",
        task: "Lengkapi inisialisasi variabel struct.",
        initialCode: `#include <stdio.h>\n\nstruct Port {\n    int id;\n    char type;\n};\n\nint main(void) {\n    struct Port p = { .id = 80, .type = 'H' };\n    printf("Port %d Type %c\\n", p.id, p.???);\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nstruct Port {\n    int id;\n    char type;\n};\n\nint main(void) {\n    struct Port p = { .id = 80, .type = 'H' };\n    printf("Port %d Type %c\\n", p.id, p.type);\n    return 0;\n}`,
        expectedOutput: "Port 80 Type H",
        hints: ["Akses properti 'type' dari struct p"]
      },
      {
        id: "c-6",
        order: 6,
        level: "Fungsi",
        title: "Pass by Reference via Pointer",
        theory: "Mengirim pointer alamat memori memungkinkan fungsi memodifikasi nilai variabel pemanggil.",
        task: "Lengkapi fungsi swap untuk menukar nilai via dereference operator *.",
        initialCode: `#include <stdio.h>\n\nvoid kali_dua(int *val) {\n    ??? = *val * 2;\n}\n\nint main(void) {\n    int angka = 15;\n    kali_dua(&angka);\n    printf("Hasil: %d\\n", angka);\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nvoid kali_dua(int *val) {\n    *val = *val * 2;\n}\n\nint main(void) {\n    int angka = 15;\n    kali_dua(&angka);\n    printf("Hasil: %d\\n", angka);\n    return 0;\n}`,
        expectedOutput: "Hasil: 30",
        hints: ["Gunakan *val untuk mengubah nilai di alamat memori"]
      },
      {
        id: "c-7",
        order: 7,
        level: "Error Handling",
        title: "Return Exit Codes & Null Checks",
        theory: "C menggunakan pengecekan pointer NULL dan return status integer sebagai mekanisme error standar.",
        task: "Periksa apakah pointer bernilai NULL sebelum digunakan.",
        initialCode: `#include <stdio.h>\n\nint main(void) {\n    int *ptr = NULL;\n    if (ptr == ???) {\n        printf("Error: Pointer Kosong\\n");\n        return 1;\n    }\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nint main(void) {\n    int *ptr = NULL;\n    if (ptr == NULL) {\n        printf("Error: Pointer Kosong\\n");\n        return 1;\n    }\n    return 0;\n}`,
        expectedOutput: "Error: Pointer Kosong",
        hints: ["Bandingkan dengan konstanta NULL"]
      },
      {
        id: "c-8",
        order: 8,
        level: "OOP / Paradigma",
        title: "Function Pointers (Polymorphism)",
        theory: "Function pointer memungkinkan implementasi callback dan tabel dispatch virtual.",
        task: "Lengkapi pemanggilan fungsi via function pointer.",
        initialCode: `#include <stdio.h>\n\nvoid salam(void) { printf("Driver Siap\\n"); }\n\nint main(void) {\n    void (*cb)(void) = ???;\n    cb();\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nvoid salam(void) { printf("Driver Siap\\n"); }\n\nint main(void) {\n    void (*cb)(void) = salam;\n    cb();\n    return 0;\n}`,
        expectedOutput: "Driver Siap",
        hints: ["Isi dengan nama fungsi salam"]
      },
      {
        id: "c-9",
        order: 9,
        level: "Fitur Khas",
        title: "Dynamic Memory (malloc & free)",
        theory: "Alokasi heap manual via malloc() wajib diimbangi dengan dealokasi free().",
        task: "Lengkapi alokasi array integer 3 elemen.",
        initialCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = (int*) malloc(3 * sizeof(???));\n    if(!arr) return 1;\n    arr[0] = 77;\n    printf("Heap: %d\\n", arr[0]);\n    free(arr);\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = (int*) malloc(3 * sizeof(int));\n    if(!arr) return 1;\n    arr[0] = 77;\n    printf("Heap: %d\\n", arr[0]);\n    free(arr);\n    return 0;\n}`,
        expectedOutput: "Heap: 77",
        hints: ["Gunakan tipe data int di dalam sizeof"]
      },
      {
        id: "c-10",
        order: 10,
        level: "Mini Project",
        title: "Sistem Inventaris Hardware Sederhana",
        theory: "Memadukan struct, array pointer, dan perulangan komputasi data.",
        task: "Hitung total unit stok perangkat jaringan.",
        initialCode: `#include <stdio.h>\n\nstruct Device {\n    char name[20];\n    int qty;\n};\n\nint main(void) {\n    struct Device d[2] = {{"Router", 5}, {"Switch", 3}};\n    int total = 0;\n    for(int i=0; i<2; i++) {\n        total += d[i].???;\n    }\n    printf("Total Stok: %d\\n", total);\n    return 0;\n}`,
        solutionCode: `#include <stdio.h>\n\nstruct Device {\n    char name[20];\n    int qty;\n};\n\nint main(void) {\n    struct Device d[2] = {{"Router", 5}, {"Switch", 3}};\n    int total = 0;\n    for(int i=0; i<2; i++) {\n        total += d[i].qty;\n    }\n    printf("Total Stok: %d\\n", total);\n    return 0;\n}`,
        expectedOutput: "Total Stok: 8",
        hints: ["Akses properti qty pada struct"]
      }
    ]
  }
];