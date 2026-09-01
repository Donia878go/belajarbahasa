"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface Exercise {
  level: "Pemula" | "Menengah" | "Isi Kode" | "Expert";
  title: string;
  instruction: string;
  code: string;
}

interface LanguageSpec {
  id: string;
  name: string;
  category: "Modern" | "Retro & 90-an";
  year: string;
  monacoLang: string;
  description: string;
  modules: Exercise[];
}

const LANGUAGES_DATA: LanguageSpec[] = [
  {
    id: "python",
    name: "Python",
    category: "Modern",
    year: "1991",
    monacoLang: "python",
    description: "Bahasa dinamis tingkat tinggi dengan filosofi readability. Dipakai luas pada automasi, data science, dan backend.",
    modules: [
      {
        level: "Pemula",
        title: "1. Variabel, Tipe Data & F-String",
        instruction: "Pelajari cara kerja assignment variabel dan format f-string pada Python 3.",
        code: `# Tingkat Dasar: Manipulasi String dan Integer\nnama = "Doni"\numur = 20\npekerjaan = "Software Developer"\n\nprint(f"Nama: {nama}")\nprint(f"Usia: {umur} tahun")\nprint(f"Profesi: {pekerjaan}")`
      },
      {
        level: "Menengah",
        title: "2. Struktur Data List & Dictionary Comprehension",
        instruction: "Mengekstrak nilai kuadrat dari list angka menggunakan list comprehension.",
        code: `# Tingkat Menengah: Transformasi Data Modern\nangka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# List comprehension untuk menyaring bilangan genap lalu dikuadratkan\nkuadrat_genap = [x**2 for x in angka if x % 2 == 0]\nprint("Hasil Kuadrat Bilangan Genap:", kuadrat_genap)`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Logika Palindrome",
        instruction: "Ganti tanda '???' dengan slicing string terbalik untuk memeriksa kata palindrome.",
        code: `# LATIHAN: Lengkapi potongan kode di bawah ini\ndef cek_palindrome(teks):\n    # Ganti '???' dengan teknik reverse string pada Python\n    return teks == teks[???]\n\nkata = "katak"\nif cek_palindrome(kata):\n    print(f"'{kata}' adalah PALINDROME!")\nelse:\n    print(f"'{kata}' BUKAN palindrome!")`
      },
      {
        level: "Expert",
        title: "4. Custom Function Decorator & Performance Tracker",
        instruction: "Implementasi decorator tingkat lanjut untuk memonitor execution timing fungsi.",
        code: `# Tingkat Expert: Metaprogramming & Higher-Order Decorator\nimport time\nfrom functools import wraps\n\ndef benchmark(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        mulai = time.perf_counter()\n        hasil = func(*args, **kwargs)\n        durasi = time.perf_counter() - mulai\n        print(f"[Benchmark] Eksekusi {func.__name__} selesai dalam {durasi:.6f} detik.")\n        return hasil\n    return wrapper\n\n@benchmark\ndef komputasi_kompleks(n):\n    return sum(i * i for i in range(n))\n\nprint("Hasil Total:", komputasi_kompleks(100000))`
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript (Node.js)",
    category: "Modern",
    year: "1995",
    monacoLang: "javascript",
    description: "Bahasa prototype-based dinamis yang menjalankan platform web modern dan asynchronous backends.",
    modules: [
      {
        level: "Pemula",
        title: "1. Modern ES6 Variable & Template Literals",
        instruction: "Mendeklarasikan konstanta dan array destructuring dasar.",
        code: `const user = { id: 101, username: "dev_doni", role: "admin" };\nconst { username, role } = user;\nconsole.log(\`User: \${username} | Privilege: \${role}\`);`
      },
      {
        level: "Menengah",
        title: "2. Higher-Order Array Methods (Map, Filter, Reduce)",
        instruction: "Menghitung total inventory nilai barang belanjaan.",
        code: `const cart = [\n  { item: "Monitor", price: 1500000, qty: 1 },\n  { item: "Keyboard Mech", price: 450000, qty: 2 },\n  { item: "Mouse Wireless", price: 200000, qty: 1 }\n];\n\nconst subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);\nconsole.log(\`Total Belanjaan: Rp\${subtotal.toLocaleString("id-ID")}\`);`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Promise Async Queue",
        instruction: "Ganti tanda '???' agar fungsi mengembalikan hasil asynchronous promise dengan benar.",
        code: `// LATIHAN: Lengkapi kata kunci async/await\nconst ambilDataServer = () => new Promise(resolve => resolve("Payload Sukses!"));\n\n??? function proses() {\n  const res = ??? ambilDataServer();\n  console.log("Status:", res);\n}\n\nproses();`
      },
      {
        level: "Expert",
        title: "4. Custom Reactive Event Emitter / Observer Pattern",
        instruction: "Membangun sistem pub-sub reactive murni dari scratch.",
        code: `class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, listener) {\n    (this.events[event] = this.events[event] || []).push(listener);\n  }\n  emit(event, ...args) {\n    (this.events[event] || []).forEach(fn => fn(...args));\n  }\n}\n\nconst bus = new EventEmitter();\nbus.on("transaksi", (id, total) => console.log(\`[LOG] Transaksi #\${id} tersimpan: Rp\${total}\`));\nbus.emit("transaksi", "TRX-998", 250000);`
      }
    ]
  },
  {
    id: "c",
    name: "C (ANSI C / C99)",
    category: "Retro & 90-an",
    year: "1972",
    monacoLang: "c",
    description: "Bahasa terkompilasi prosedural dengan efisiensi memori mutlak. Dasar arsitektur Kernel OS, driver, dan compiler modern.",
    modules: [
      {
        level: "Pemula",
        title: "1. Struktur I/O Standar & Primitive Types",
        instruction: "Mencetak format heksadesimal, integer, dan kalkulasi dasar.",
        code: `#include <stdio.h>\n\nint main(void) {\n    int a = 255;\n    printf("Desimal: %d\\n", a);\n    printf("Heksadesimal: 0x%X\\n", a);\n    return 0;\n}`
      },
      {
        level: "Menengah",
        title: "2. Pointer Dereferencing & Alamat Memori",
        instruction: "Manipulasi nilai variabel secara langsung lewat alamat memori register pointer.",
        code: `#include <stdio.h>\n\nvoid tukar(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main(void) {\n    int num1 = 50, num2 = 100;\n    printf("Sebelum: %d, %d\\n", num1, num2);\n    tukar(&num1, &num2);\n    printf("Setelah: %d, %d\\n", num1, num2);\n    return 0;\n}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Dynamic Memory Allocation (malloc)",
        instruction: "Ganti tanda '???' dengan alokasi ukuran memory sizeof(int).",
        code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *ptr = (int*) malloc(5 * ???);\n    if (ptr == NULL) return 1;\n    \n    ptr[0] = 42;\n    printf("Nilai alokasi: %d\\n", ptr[0]);\n    free(ptr);\n    return 0;\n}`
      },
      {
        level: "Expert",
        title: "4. Struktur Data Generic Linked List & Bit Manipulation",
        instruction: "Implementasi low-level linked-list manual dengan traversing memory block.",
        code: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nint main(void) {\n    Node *head = (Node*)malloc(sizeof(Node));\n    Node *second = (Node*)malloc(sizeof(Node));\n    \n    head->data = 10;\n    head->next = second;\n    second->data = 20;\n    second->next = NULL;\n    \n    Node *curr = head;\n    while(curr != NULL) {\n        printf("Node Val: %d\\n", curr->data);\n        curr = curr->next;\n    }\n    free(second); free(head);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    category: "Modern",
    year: "1985",
    monacoLang: "cpp",
    description: "Multi-paradigm language dengan abstraction performa tinggi, OOP, template generic, dan Standard Template Library (STL).",
    modules: [
      {
        level: "Pemula",
        title: "1. Modern Stream I/O & Namespaces",
        instruction: "Sintaks dasar input/output std::cout dan manipulasi tipe data integer.",
        code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Selamat datang di standar kompilasi C++!" << endl;\n    int radius = 7;\n    cout << "Radius Lingkaran: " << radius << endl;\n    return 0;\n}`
      },
      {
        level: "Menengah",
        title: "2. STL Vectors & Lambda Algorithms",
        instruction: "Mengurutkan dan menyaring kumpulan vector dengan std::sort.",
        code: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {45, 12, 85, 32, 89, 39, 69};\n    std::sort(nums.begin(), nums.end());\n    \n    std::cout << "Data terurut: ";\n    for(int n : nums) std::cout << n << " ";\n    std::cout << std::endl;\n    return 0;\n}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Class Constructor",
        instruction: "Ganti tanda '???' dengan keyword instansiasi constructor class C++.",
        code: `#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    ???(int s) {\n        sisi = s;\n    }\n    int hitungLuas() { return sisi * sisi; }\n};\n\nint main() {\n    Persegi p(8);\n    cout << "Luas: " << p.hitungLuas() << endl;\n    return 0;\n}`
      },
      {
        level: "Expert",
        title: "4. Template Metaprogramming Compile-time Factorial",
        instruction: "Kalkulasi nilai faktorial saat proses kompilasi tanpa beban runtime CPU.",
        code: `#include <iostream>\n\ntemplate<unsigned int N>\nstruct Factorial {\n    enum { value = N * Factorial<N - 1>::value };\n};\n\ntemplate<>\nstruct Factorial<0> {\n    enum { value = 1 };\n};\n\nint main() {\n    std::cout << "Compile-Time Factorial of 7: " << Factorial<7>::value << std::endl;\n    return 0;\n}`
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    category: "Modern",
    year: "1995",
    monacoLang: "java",
    description: "Platform-independent, strict OOP yang berjalan di atas Java Virtual Machine (JVM). Standar enterprise backend.",
    modules: [
      {
        level: "Pemula",
        title: "1. Main Entrypoint & System Streams",
        instruction: "Deklarasi kelas standar Java dan pencetakan data.",
        code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Virtual Machine Runtime: Ready!");\n    }\n}`
      },
      {
        level: "Menengah",
        title: "2. Stream API & Functional Filtering",
        instruction: "Memproses koleksi data menggunakan stream API Java 8+.",
        code: `import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> bahasa = Arrays.asList("Java", "C++", "Python", "JavaScript", "Rust");\n        List<String> filtered = bahasa.stream()\n            .filter(s -> s.length() <= 4)\n            .collect(Collectors.toList());\n        System.out.println("Bahasa <= 4 Huruf: " + filtered);\n    }\n}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Interface Implementation",
        instruction: "Ganti tanda '???' dengan keyword turunan interface pada Java.",
        code: `interface Kendaraan {\n    void jalan();\n}\n\nclass Mobil ??? Kendaraan {\n    public void jalan() {\n        System.out.println("Mobil melaju di jalan tol.");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Kendaraan k = new Mobil();\n        k.jalan();\n    }\n}`
      },
      {
        level: "Expert",
        title: "4. Multithreading Producer-Consumer with Locks",
        instruction: "Sinkronisasi antar-thread menggunakan antrean concurrent.",
        code: `import java.util.concurrent.ArrayBlockingQueue;\nimport java.util.concurrent.BlockingQueue;\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);\n        \n        Thread producer = new Thread(() -> {\n            try { queue.put(999); System.out.println("[Thread] Data 999 Ditambahkan"); }\n            catch (Exception e) {}\n        });\n        \n        producer.start();\n        producer.join();\n        System.out.println("Queue Item: " + queue.poll());\n    }\n}`
      }
    ]
  },
  {
    id: "rust",
    name: "Rust",
    category: "Modern",
    year: "2015",
    monacoLang: "rust",
    description: "Bahasa pemrograman sistem revolusioner yang menjamin memory-safety mutlak tanpa runtime garbage collector.",
    modules: [
      {
        level: "Pemula",
        title: "1. Immutability by Default & Macro Formatting",
        instruction: "Dasar variabel mutable/immutable dan makro println!.",
        code: `fn main() {\n    let mut counter = 10;\n    println!("Nilai Awal: {}", counter);\n    counter += 5;\n    println!("Nilai Akhir: {}", counter);\n}`
      },
      {
        level: "Menengah",
        title: "2. Pattern Matching & Option Enum",
        instruction: "Menangani null-safety secara elegan via enum Result & Option.",
        code: `fn cari_pembagian(a: i32, b: i32) -> Option<i32> {\n    if b == 0 { None } else { Some(a / b) }\n}\n\nfn main() {\n    match cari_pembagian(100, 4) {\n        Some(val) => println!("Hasil Bagi: {}", val),\n        None => println!("Error: Pembagian oleh nol!"),\n    }\n}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Borrowing & Mutable Reference",
        instruction: "Ganti tanda '???' dengan operator mutable reference '&mut'.",
        code: `fn tambah_kata(s: ??? String) {\n    s.push_str(" World!");\n}\n\nfn main() {\n    let mut pesan = String::from("Hello");\n    tambah_kata(&mut pesan);\n    println!("{}", pesan);\n}`
      },
      {
        level: "Expert",
        title: "4. Zero-Cost Traits & Generic Lifetime Bounds",
        instruction: "Membangun trait polimorfis compile-time tanpa runtime dynamic dispatch.",
        code: `trait Ringkasan {\n    fn ringkas(&self) -> String;\n}\n\nstruct Artikel {\n    judul: String,\n}\n\nimpl Ringkasan for Artikel {\n    fn ringkas(&self) -> String {\n        format!("Judul Berita: {}", self.judul)\n    }\n}\n\nfn cetak_info<T: Ringkasan>(item: T) {\n    println!("{}", item.ringkas());\n}\n\nfn main() {\n    let art = Artikel { judul: String::from("Arsitektur Rust WASM") };\n    cetak_info(art);\n}`
      }
    ]
  },
  {
    id: "go",
    name: "Go (Golang)",
    category: "Modern",
    year: "2009",
    monacoLang: "go",
    description: "Bahasa minimalis buatan Google dengan built-in lightweight concurrency (Goroutines & Channels).",
    modules: [
      {
        level: "Pemula",
        title: "1. Multiple Return Values & Package Structure",
        instruction: "Fungsi yang mengembalikan multi return value sekaligus.",
        code: `package main\nimport "fmt"\n\nfunc kalkulasi(a, b int) (int, int) {\n    return a + b, a * b\n}\n\nfunc main() {\n    tambah, kali := kalkulasi(7, 3)\n    fmt.Printf("Tambah: %d | Kali: %d\\n", tambah, kali)\n}`
      },
      {
        level: "Menengah",
        title: "2. Struct Slices & Pointer Methods",
        instruction: "Membuat method struct dengan pointer receiver.",
        code: `package main\nimport "fmt"\n\ntype Dompet struct {\n    Saldo int\n}\n\nfunc (d *Dompet) Topup(nominal int) {\n    d.Saldo += nominal\n}\n\nfunc main() {\n    d := Dompet{Saldo: 50000}\n    d.Topup(25000)\n    fmt.Printf("Saldo Akhir: Rp%d\\n", d.Saldo)\n}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Goroutine Channel Sync",
        instruction: "Ganti tanda '???' dengan operator pengiriman channel 'c <- val'.",
        code: `package main\nimport "fmt"\n\nfunc kirimPesan(c chan string) {\n    c ??? "Data dari Goroutine Async!"\n}\n\nfunc main() {\n    ch := make(chan string)\n    go kirimPesan(ch)\n    msg := <-ch\n    fmt.Println("Diterima:", msg)\n}`
      },
      {
        level: "Expert",
        title: "4. Worker Pool Pattern Concurrency",
        instruction: "Mengelola thread pool pekerja goroutines secara paralel dengan buffered channel.",
        code: `package main\nimport "fmt"\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 5)\n    results := make(chan int, 5)\n    \n    for w := 1; w <= 2; w++ {\n        go worker(w, jobs, results)\n    }\n    for j := 1; j <= 3; j++ { jobs <- j }\n    close(jobs)\n    for a := 1; a <= 3; a++ { fmt.Println("Result:", <-results) }\n}`
      }
    ]
  },
  {
    id: "pascal",
    name: "Pascal (Free Pascal)",
    category: "Retro & 90-an",
    year: "1970",
    monacoLang: "pascal",
    description: "Bahasa terstruktur legendaris era 70–90-an yang menjadi standar dasar kurikulum algoritma.",
    modules: [
      {
        level: "Pemula",
        title: "1. Block Structure & Variabel Deklarasi",
        instruction: "Sintaks blok begin..end dan deklarasi var.",
        code: `program BelajarPascal;\nvar\n  nama: string;\n  nilai: integer;\nbegin\n  nama := 'Doni Firmansyah';\n  nilai := 95;\n  writeln('Nama Mahasiswa: ', nama);\n  writeln('Nilai Ujian: ', nilai);\nend.`
      },
      {
        level: "Menengah",
        title: "2. Record Structure & Array Traversal",
        instruction: "Penyimpanan data mirip struct menggunakan Record di Pascal.",
        code: `program ManajemenData;\ntype\n  TBarang = record\n    Nama: string;\n    Harga: LongInt;\n  end;\nvar\n  item: TBarang;\nbegin\n  item.Nama := 'Disket 3.5 Inch Floppy';\n  item.Harga := 15000;\n  writeln('Item: ', item.Nama, ' | Harga: Rp', item.Harga);\nend.`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Prosedur Rekursif",
        instruction: "Ganti tanda '???' dengan nama function rekursif.",
        code: `program RekursifFaktorial;\nfunction Faktorial(n: integer): longint;\nbegin\n  if n <= 1 then\n    Faktorial := 1\n  else\n    Faktorial := n * ???(n - 1);\nend;\nbegin\n  writeln('Faktorial 5: ', Faktorial(5));\nend.`
      },
      {
        level: "Expert",
        title: "4. Dynamic Linked Pointer Memory Block",
        instruction: "Pengelolaan pointer mentah heap memory via New() dan Dispose().",
        code: `program PointersPascal;\ntype\n  PInt = ^integer;\nvar\n  p: PInt;\nbegin\n  new(p);\n  p^ := 1995;\n  writeln('Nilai pada heap pointer: ', p^);\n  dispose(p);\nend.`
      }
    ]
  },
  {
    id: "nasm64",
    name: "Assembly (x86_64 NASM)",
    category: "Retro & 90-an",
    year: "Retro",
    monacoLang: "plaintext",
    description: "Bahasa instruksi tingkat register CPU terendah. Bekerja langsung dengan kernel interrupt & syscall 64-bit.",
    modules: [
      {
        level: "Pemula",
        title: "1. Direct Syscall Write stdout",
        instruction: "Menulis pesan teks ke file descriptor 1 via Linux syscall rax 1.",
        code: `section .data\n    msg db "Assembly NASM x86_64: Online!", 0x0A\n    len equ $ - msg\n\nsection .text\n    global _start\n\n_start:\n    mov rax, 1          ; sys_write\n    mov rdi, 1          ; stdout\n    mov rsi, msg        ; buffer\n    mov rdx, len        ; length\n    syscall\n\n    mov rax, 60         ; sys_exit\n    xor rdi, rdi        ; code 0\n    syscall`
      },
      {
        level: "Menengah",
        title: "2. Register Arithmetic & Bit Shifting",
        instruction: "Operasi aritmatika biner ADD, SUB, dan Shift Right (SHR).",
        code: `section .data\n    done db "Operasi Register CPU Selesai", 0x0A\n    len equ $ - done\n\nsection .text\n    global _start\n\n_start:\n    mov rax, 50\n    add rax, 30         ; rax = 80\n    sub rax, 10         ; rax = 70\n    shr rax, 1          ; rax = 35 (dibagi 2)\n\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, done\n    mov rdx, len\n    syscall\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Instruction Pointer Jump",
        instruction: "Ganti tanda '???' dengan instruksi pembanding komparasi register 'cmp'.",
        code: `section .data\n    sukses db "Loop selesai", 0x0A\n    len equ $ - sukses\n\nsection .text\n    global _start\n\n_start:\n    mov rcx, 5\n.loop:\n    dec rcx\n    ??? rcx, 0          ; bandingkan rcx dengan 0\n    jg .loop            ; jump jika greater\n\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, sukses\n    mov rdx, len\n    syscall\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`
      },
      {
        level: "Expert",
        title: "4. Stack Frame Subroutine & Base Pointer",
        instruction: "Membuat fungsi mandiri dengan standar prologue dan epilogue stack.",
        code: `section .data\n    out db "Fungsi Subroutine OK", 0x0A\n    len equ $ - out\n\nsection .text\n    global _start\n\ncetak:\n    push rbp\n    mov rbp, rsp\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, out\n    mov rdx, len\n    syscall\n    mov rsp, rbp\n    pop rbp\n    ret\n\n_start:\n    call cetak\n    mov rax, 60\n    xor rdi, rdi\n    syscall`
      }
    ]
  },
  {
    id: "basic.net",
    name: "Visual Basic (VB.NET)",
    category: "Retro & 90-an",
    year: "1991",
    monacoLang: "vb",
    description: "Bahasa dengan sintaks berbasis bahasa manusia (English-like). Sangat terkenal pada era sistem desktop Windows 90-an.",
    modules: [
      {
        level: "Pemula",
        title: "1. Module & Console Stream",
        instruction: "Struktur program modul standar Visual Basic.",
        code: `Imports System\n\nModule Program\n    Sub Main()\n        Console.WriteLine("Halo dari Visual Basic!")\n        Dim tahun As Integer = 1991\n        Console.WriteLine("Tahun Rilis: " & tahun)\n    End Sub\nEnd Module`
      },
      {
        level: "Menengah",
        title: "2. Percabangan Select Case & Perulangan For",
        instruction: "Pengendalian alur program menggunakan blok Select Case.",
        code: `Imports System\n\nModule Program\n    Sub Main()\n        Dim peringkat As Char = "A"c\n        Select Case peringkat\n            Case "A"c\n                Console.WriteLine("Predikat: Sangat Memuaskan")\n            Case "B"c\n                Console.WriteLine("Predikat: Baik")\n        End Select\n    End Sub\nEnd Module`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Function Return VB",
        instruction: "Ganti tanda '???' dengan tipe kembalian data Integer.",
        code: `Imports System\n\nModule Program\n    Function Tambah(a As Integer, b As Integer) As ???\n        Return a + b\n    End Function\n\n    Sub Main()\n        Console.WriteLine("Hasil: " & Tambah(15, 25))\n    End Sub\nEnd Module`
      },
      {
        level: "Expert",
        title: "4. LINQ Data Transformation on Objects",
        instruction: "Query data koleksi menggunakan Language Integrated Query (LINQ).",
        code: `Imports System\nImports System.Linq\n\nModule Program\n    Sub Main()\n        Dim angka = {12, 45, 67, 88, 23, 90}\n        Dim genap = From n In angka Where n Mod 2 = 0 Select n\n        Console.WriteLine("Angka Genap: " & String.Join(", ", genap))\n    End Sub\nEnd Module`
      }
    ]
  }
];

export default function Home() {
  const [selectedLang, setSelectedLang] = useState<LanguageSpec>(LANGUAGES_DATA[0]);
  const [selectedModIndex, setSelectedModIndex] = useState(0);
  const [code, setCode] = useState(LANGUAGES_DATA[0].modules[0].code);
  const [output, setOutput] = useState("");
  const [debugLog, setDebugLog] = useState("Engine siap.");
  const [activeTab, setActiveTab] = useState<"output" | "debug">("output");
  const [isLoading, setIsLoading] = useState(false);

  const handleLangChange = (lang: LanguageSpec) => {
    setSelectedLang(lang);
    setSelectedModIndex(0);
    setCode(lang.modules[0].code);
    setOutput("");
    setDebugLog(`Switched context to ${lang.name}`);
  };

  const handleModuleSelect = (index: number) => {
    setSelectedModIndex(index);
    setCode(selectedLang.modules[index].code);
    setOutput("");
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput("Mengompilasi dan mengeksekusi di server...");
    setDebugLog(`[Job Start] Target: ${selectedLang.name} (${selectedLang.id})`);

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang.id,
          code: code
        })
      });

      const data = await res.json();
      setOutput(data.run?.output || "Program selesai.");
      setDebugLog(`[Job Done] ${data.debug || "200 OK"}`);
    } catch (err: any) {
      setOutput("[Network Error] Gagal mengirim paket program ke compiler.");
      setDebugLog(`[Exception]: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const currentMod = selectedLang.modules[selectedModIndex];

  return (
    <div className="min-h-screen bg-[#111111] text-[#d4d4d4] font-mono flex flex-col selection:bg-[#333]">
      {/* Top Header Classic Monokrom */}
      <header className="h-14 border-b border-[#262626] bg-[#161616] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-widest text-white uppercase">
            BelajarBahasa // Core Sandbox
          </span>
          <span className="text-[11px] bg-[#222] border border-[#333] px-2 py-0.5 text-[#888]">
            {LANGUAGES_DATA.length} Languages
          </span>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedLang.id}
            onChange={(e) => {
              const target = LANGUAGES_DATA.find((l) => l.id === e.target.value);
              if (target) handleLangChange(target);
            }}
            className="bg-[#202020] text-[#ddd] border border-[#333] px-3 py-1.5 text-xs focus:outline-none focus:border-[#666] cursor-pointer"
          >
            <optgroup label="Bahasa Modern">
              {LANGUAGES_DATA.filter((l) => l.category === "Modern").map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} ({lang.year})
                </option>
              ))}
            </optgroup>
            <optgroup label="Bahasa Klasik & Retro 90-an">
              {LANGUAGES_DATA.filter((l) => l.category === "Retro & 90-an").map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} ({lang.year})
                </option>
              ))}
            </optgroup>
          </select>

          <button
            onClick={runCode}
            disabled={isLoading}
            className="bg-[#2a2a2a] hover:bg-[#383838] active:bg-[#444] disabled:opacity-50 text-white border border-[#444] px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition cursor-pointer"
          >
            {isLoading ? "[ Compiling... ]" : "[ ▶ Run Code ]"}
          </button>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Kolom 1: Kurikulum & Modul Soal (3 Cols) */}
        <div className="lg:col-span-3 border-r border-[#262626] bg-[#141414] p-4 flex flex-col gap-5 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-2">
              <span className="text-xs font-bold text-white uppercase">{selectedLang.name}</span>
              <span className="text-[10px] text-[#777] border border-[#2a2a2a] px-1.5 py-0.5">
                EST. {selectedLang.year}
              </span>
            </div>
            <p className="text-[11px] text-[#888] leading-relaxed">
              {selectedLang.description}
            </p>
          </div>

          <div className="border-t border-[#262626] pt-3">
            <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider block mb-2">
              Tingkat Pembelajaran & Latihan:
            </span>
            <div className="flex flex-col gap-2">
              {selectedLang.modules.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => handleModuleSelect(idx)}
                  className={`text-left p-2.5 border transition cursor-pointer ${
                    selectedModIndex === idx
                      ? "bg-[#222222] border-[#555] text-white"
                      : "bg-[#181818] border-[#262626] text-[#777] hover:border-[#3a3a3a] hover:text-[#aaa]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#999]">
                      {mod.level}
                    </span>
                    {mod.level === "Isi Kode" && (
                      <span className="text-[9px] bg-[#2a2a2a] text-[#aaa] px-1 border border-[#3a3a3a]">
                        Tantangan
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-semibold">{mod.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Kotak Instruksi */}
          <div className="bg-[#181818] border border-[#262626] p-3 text-[11px]">
            <span className="font-bold text-[#888] block mb-1 uppercase tracking-wider">
              Instruksi Modul:
            </span>
            <p className="text-[#aaa] leading-relaxed">{currentMod.instruction}</p>
          </div>
        </div>

        {/* Kolom 2: Monaco Code Editor (5 Cols) */}
        <div className="lg:col-span-5 border-r border-[#262626] flex flex-col h-[50vh] lg:h-full bg-[#1e1e1e]">
          <div className="h-8 border-b border-[#262626] bg-[#161616] px-4 flex items-center justify-between text-[11px] text-[#777]">
            <span>CODE_EDITOR // {selectedLang.id.toUpperCase()}</span>
            <button
              onClick={() => setCode(currentMod.code)}
              className="hover:text-white transition cursor-pointer text-[10px]"
            >
              [ Reset Boilerplate ]
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={selectedLang.monacoLang}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                automaticLayout: true,
                fontFamily: "monospace",
                lineNumbers: "on",
                renderLineHighlight: "all",
                scrollBeyondLastLine: false,
                tabSize: 2
              }}
            />
          </div>
        </div>

        {/* Kolom 3: Dual-Tab Terminal (4 Cols) */}
        <div className="lg:col-span-4 bg-[#121212] flex flex-col h-[40vh] lg:h-full">
          {/* Header Tab Terminal */}
          <div className="h-8 border-b border-[#262626] bg-[#161616] px-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("output")}
                className={`px-3 py-1 text-[10px] font-bold uppercase transition cursor-pointer ${
                  activeTab === "output"
                    ? "bg-[#242424] text-white border-t border-r border-l border-[#333]"
                    : "text-[#666] hover:text-[#999]"
                }`}
              >
                1. Stdout Output
              </button>
              <button
                onClick={() => setActiveTab("debug")}
                className={`px-3 py-1 text-[10px] font-bold uppercase transition cursor-pointer ${
                  activeTab === "debug"
                    ? "bg-[#242424] text-white border-t border-r border-l border-[#333]"
                    : "text-[#666] hover:text-[#999]"
                }`}
              >
                2. System / Debug Log
              </button>
            </div>

            <button
              onClick={() => {
                if (activeTab === "output") setOutput("");
                else setDebugLog("Cleared.");
              }}
              className="hover:text-white transition cursor-pointer text-[10px] text-[#666] px-2"
            >
              [ Clear ]
            </button>
          </div>

          {/* Konten Terminal Terpisah */}
          <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed">
            {activeTab === "output" ? (
              <pre className="text-[#cfcfcf] whitespace-pre-wrap">
                {output || "// Output eksekusi program akan muncul di sini...\n// Klik tombol [ ▶ RUN CODE ] di atas."}
              </pre>
            ) : (
              <pre className="text-[#888888] whitespace-pre-wrap">
                {debugLog}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}