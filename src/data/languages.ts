export interface Exercise {
  level: "Pemula" | "Menengah" | "Isi Kode" | "Expert";
  title: string;
  instruction: string;
  code: string;
}

export interface LanguageSpec {
  id: string;
  name: string;
  category: "Modern" | "Klasik & Retro";
  year: string;
  monacoLang: string;
  description: string;
  modules: Exercise[];
}

export const DATABASE_BAHASA: LanguageSpec[] = [
  // ==========================================
  // 1. COBOL
  // ==========================================
  {
    id: "cobol",
    name: "COBOL",
    category: "Klasik & Retro",
    year: "1959",
    monacoLang: "cobol",
    description: "Common Business-Oriented Language karya Grace Hopper. Fondasi sistem komputasi mainframe perbankan, asuransi, dan transaksi keuangan global.",
    modules: [
      {
        level: "Pemula",
        title: "1. Struktur 4 Divisi & Tampilan Pesan",
        instruction: "Pahami hierarki wajib COBOL: IDENTIFICATION DIVISION, ENVIRONMENT DIVISION, DATA DIVISION, dan PROCEDURE DIVISION.",
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-COBOL.
       PROCEDURE DIVISION.
           DISPLAY "Halo dari Bahasa Pemrograman COBOL Mainframe!".
           DISPLAY "Sistem Transaksi Perbankan Siap Beroperasi.".
           STOP RUN.`
      },
      {
        level: "Menengah",
        title: "2. Working-Storage Section & Komputasi Saldo",
        instruction: "Deklarasikan variabel numerik PIC 9(6) untuk menghitung bunga tabungan nasabah.",
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HITUNG-SALDO.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 SALDO-AWAL    PIC 9(6) VALUE 750000.
       01 BUNGA         PIC 9(5) VALUE 25000.
       01 TOTAL-SALDO   PIC 9(6).
       PROCEDURE DIVISION.
           COMPUTE TOTAL-SALDO = SALDO-AWAL + BUNGA.
           DISPLAY "Saldo Awal  : Rp " SALDO-AWAL.
           DISPLAY "Bunga Bank  : Rp " BUNGA.
           DISPLAY "Total Akhir : Rp " TOTAL-SALDO.
           STOP RUN.`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Statement Keputusan IF",
        instruction: "Ganti tanda '???' dengan keyword penutup blok IF pada COBOL (END-IF).",
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. EVALUASI-SKOR.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 SKOR PIC 9(2) VALUE 85.
       PROCEDURE DIVISION.
           IF SKOR >= 75
               DISPLAY "STATUS: LULUS SERTIFIKASI MAINFRAME"
           ELSE
               DISPLAY "STATUS: PERLU REMEDIAL"
           ???
           STOP RUN.`
      },
      {
        level: "Expert",
        title: "4. Batch Processing Loop dengan PERFORM UNTIL",
        instruction: "Simulasikan pemrosesan batch transaksi record berulang secara modular.",
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. BATCH-TRANSAKSI.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 COUNTER PIC 9(2) VALUE 1.
       PROCEDURE DIVISION.
       MAIN-PROCEDURE.
           PERFORM PROSES-BATCH UNTIL COUNTER > 3.
           DISPLAY "=== BATCH RECORD COMPLETE ===".
           STOP RUN.
       PROSES-BATCH.
           DISPLAY "Eksekusi Batch Antrean TRX-00" COUNTER.
           ADD 1 TO COUNTER.`
      }
    ]
  },

  // ==========================================
  // 2. FORTRAN
  // ==========================================
  {
    id: "fortran",
    name: "Fortran",
    category: "Klasik & Retro",
    year: "1957",
    monacoLang: "fortran",
    description: "Formula Translation. Bahasa komputasi ilmiah numerik, simulasi fluida, cuaca, dan astrofisika tertua di dunia.",
    modules: [
      {
        level: "Pemula",
        title: "1. Formula Kalkulasi Numerik Dasar",
        instruction: "Deklarasikan parameter konstanta dan hitung luas lingkaran presisi tinggi.",
        code: `program SainsDasar
  implicit none
  real :: radius, luas
  real, parameter :: pi = 3.14159265
  
  radius = 7.0
  luas = pi * (radius ** 2)
  print *, "Luas Lingkaran Numerik =", luas
end program SainsDasar`
      },
      {
        level: "Menengah",
        title: "2. Matriks 2 Dimensi & Nested Do-Loop",
        instruction: "Manipulasi elemen matriks 2D dengan nested loop do-end do.",
        code: `program Matriks
  implicit none
  integer, dimension(2, 2) :: m
  integer :: i, j
  
  m(1,1) = 10; m(1,2) = 20
  m(2,1) = 30; m(2,2) = 40
  
  print *, "Data Matriks 2x2:"
  do i = 1, 2
     print *, (m(i, j), j = 1, 2)
  end do
end program Matriks`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Pemanggilan Subroutine Fortran",
        instruction: "Ganti tanda '???' dengan keyword pemanggil subrutin di Fortran (call).",
        code: `program UjiSub
  implicit none
  ??? cetakStatus()
contains
  subroutine cetakStatus()
    print *, "Subroutine Numerik Berhasil Dipanggil!"
  end subroutine cetakStatus
end program UjiSub`
      },
      {
        level: "Expert",
        title: "4. Integrasi Numerik Metode Trapesium",
        instruction: "Aproksimasi kalkulus integral integral tentu f(x) = x^2 pada rentang [0, 1].",
        code: `program Integral
  implicit none
  real :: a, b, h, integral, x
  integer :: n, i
  
  a = 0.0; b = 1.0; n = 100
  h = (b - a) / n
  integral = 0.5 * (a**2 + b**2)
  
  do i = 1, n - 1
     x = a + i * h
     integral = integral + x**2
  end do
  integral = integral * h
  print *, "Hasil Integral f(x)=x^2 [0..1] =", integral
end program Integral`
      }
    ]
  },

  // ==========================================
  // 3. PASCAL
  // ==========================================
  {
    id: "pascal",
    name: "Pascal (Free Pascal)",
    category: "Klasik & Retro",
    year: "1970",
    monacoLang: "pascal",
    description: "Bahasa terstruktur legendaris karya Niklaus Wirth yang menjadi kurikulum baku pengajaran algoritma dan struktur data rapi.",
    modules: [
      {
        level: "Pemula",
        title: "1. Struktur Blok Prosedural & Variabel",
        instruction: "Pelajari sintaks blok var, begin, dan penutup end. dengan titik.",
        code: `program BelajarPascal;
var
  nama: string;
  tahun: integer;
begin
  nama := 'Pascal Niklaus Wirth';
  tahun := 1970;
  writeln('Bahasa: ', nama);
  writeln('Rilis : ', tahun);
end.`
      },
      {
        level: "Menengah",
        title: "2. Record Struct & Array Traversal",
        instruction: "Kelola kumpulan record entitas inventaris barang.",
        code: `program Inventaris;
type
  TBarang = record
    Nama: string;
    Harga: LongInt;
  end;
var
  item: TBarang;
begin
  item.Nama := 'Disket Floppy 1.44MB';
  item.Harga := 15000;
  writeln('Item: ', item.Nama, ' | Harga: Rp', item.Harga);
end.`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Fungsi Rekursif Faktorial",
        instruction: "Ganti tanda '???' dengan pemanggilan nama fungsinya sendiri (Faktorial).",
        code: `program Rekursi;
function Faktorial(n: integer): longint;
begin
  if n <= 1 then
    Faktorial := 1
  else
    Faktorial := n * ???(n - 1);
end;
begin
  writeln('Faktorial 5 adalah: ', Faktorial(5));
end.`
      },
      {
        level: "Expert",
        title: "4. Raw Dynamic Memory Heap Pointer",
        instruction: "Alokasi dan dealokasi memori manual heap via New() dan Dispose().",
        code: `program PointerMemory;
type
  PInt = ^integer;
var
  p: PInt;
begin
  new(p);
  p^ := 2026;
  writeln('Alamat pointer terisi nilai: ', p^);
  dispose(p);
end.`
      }
    ]
  },

  // ==========================================
  // 4. ASSEMBLY NASM (x86_64)
  // ==========================================
  {
    id: "nasm64",
    name: "Assembly (x86_64 NASM)",
    category: "Klasik & Retro",
    year: "Retro",
    monacoLang: "plaintext",
    description: "Bahasa instruksi tingkat register CPU terendah. Mengontrol alur komputasi langsung via Linux Syscall 64-bit.",
    modules: [
      {
        level: "Pemula",
        title: "1. Direct Syscall Write stdout",
        instruction: "Mencetak teks ke stdout via kernel interrupt sys_write (rax=1).",
        code: `section .data
    msg db "Assembly NASM x86_64: Online!", 0x0A
    len equ $ - msg

section .text
    global _start

_start:
    mov rax, 1          ; syscall 1: sys_write
    mov rdi, 1          ; file descriptor 1: stdout
    mov rsi, msg        ; pointer pesan
    mov rdx, len        ; panjang string
    syscall

    mov rax, 60         ; syscall 60: sys_exit
    xor rdi, rdi        ; return status 0
    syscall`
      },
      {
        level: "Menengah",
        title: "2. Register Arithmetic & Bit Shifting",
        instruction: "Operasi register CPU ADD, SUB, dan Shift Right (SHR).",
        code: `section .data
    sukses db "Aritmatika Register Selesai!", 0x0A
    len equ $ - sukses

section .text
    global _start

_start:
    mov rax, 50
    add rax, 30         ; rax = 80
    sub rax, 10         ; rax = 70
    shr rax, 1          ; rax = 35 (dibagi 2)

    mov rax, 1
    mov rdi, 1
    mov rsi, sukses
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Instruksi Perulangan Register CMP",
        instruction: "Ganti tanda '???' dengan instruksi pembanding komparasi register (cmp).",
        code: `section .data
    out db "Loop Register Sukses", 0x0A
    len equ $ - out

section .text
    global _start

_start:
    mov rcx, 3
.loop:
    dec rcx
    ??? rcx, 0
    jg .loop

    mov rax, 1
    mov rdi, 1
    mov rsi, out
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall`
      },
      {
        level: "Expert",
        title: "4. Stack Frame Subroutine Prologue & Epilogue",
        instruction: "Membuat fungsi mandiri dengan standar prologue dan epilogue stack.",
        code: `section .data
    teks db "Subroutine Assembly Berhasil Dieksekusi!", 0x0A
    len equ $ - teks

section .text
    global _start

fungsi_cetak:
    push rbp
    mov rbp, rsp
    mov rax, 1
    mov rdi, 1
    mov rsi, teks
    mov rdx, len
    syscall
    mov rsp, rbp
    pop rbp
    ret

_start:
    call fungsi_cetak
    mov rax, 60
    xor rdi, rdi
    syscall`
      }
    ]
  },

  // ==========================================
  // 5. VISUAL BASIC (.NET)
  // ==========================================
  {
    id: "basic.net",
    name: "Visual Basic (VB.NET)",
    category: "Klasik & Retro",
    year: "1991",
    monacoLang: "vb",
    description: "Bahasa pemrograman dengan gaya sintaks bahasa Inggris (English-like). Sangat populer di era Windows desktop 90-an.",
    modules: [
      {
        level: "Pemula",
        title: "1. Module Structure & Console I/O",
        instruction: "Dasar pembungkus Module dan perintah cetak Console.WriteLine.",
        code: `Imports System

Module Program
    Sub Main()
        Console.WriteLine("Halo dari Visual Basic!")
        Dim tahun As Integer = 1991
        Console.WriteLine("Tahun Rilis: " & tahun)
    End Sub
End Module`
      },
      {
        level: "Menengah",
        title: "2. Percabangan Select Case Terstruktur",
        instruction: "Pengendalian alur logika menggunakan Select Case.",
        code: `Imports System

Module Program
    Sub Main()
        Dim predikat As Char = "A"c
        Select Case predikat
            Case "A"c
                Console.WriteLine("Predikat: Sangat Memuaskan")
            Case "B"c
                Console.WriteLine("Predikat: Baik")
        End Select
    End Sub
End Module`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Tipe Data Kembalian Fungsi",
        instruction: "Ganti tanda '???' dengan tipe kembalian data Integer.",
        code: `Imports System

Module Program
    Function HitungTotal(a As Integer, b As Integer) As ???
        Return a + b
    End Function

    Sub Main()
        Console.WriteLine("Total: " & HitungTotal(25, 75))
    End Sub
End Module`
      },
      {
        level: "Expert",
        title: "4. LINQ Data Query Transformation",
        instruction: "Query koleksi data menggunakan Language Integrated Query (LINQ).",
        code: `Imports System
Imports System.Linq

Module Program
    Sub Main()
        Dim angka = {12, 45, 68, 89, 90, 24}
        Dim genap = From n In angka Where n Mod 2 = 0 Select n
        Console.WriteLine("Bilangan Genap: " & String.Join(", ", genap))
    End Sub
End Module`
      }
    ]
  },

  // ==========================================
  // 6. C (ANSI C)
  // ==========================================
  {
    id: "c",
    name: "C (ANSI C)",
    category: "Klasik & Retro",
    year: "1972",
    monacoLang: "c",
    description: "Ibu dari seluruh bahasa pemrograman modern karya Dennis Ritchie. Menawarkan efisiensi mutlak dan manipulasi pointer memori mentah.",
    modules: [
      {
        level: "Pemula",
        title: "1. Format Specifiers & Primitive Types",
        instruction: "Cetak nilai desimal, heksadesimal, dan float standar.",
        code: `#include <stdio.h>

int main(void) {
    int angka = 255;
    float pi = 3.14159;
    printf("Desimal: %d\\n", angka);
    printf("Heksadesimal: 0x%X\\n", angka);
    printf("Presisi Float: %.2f\\n", pi);
    return 0;
}`
      },
      {
        level: "Menengah",
        title: "2. Pointer Dereferencing & Swap Memory",
        instruction: "Menukar nilai dua variabel dengan passing pointer alamat memori.",
        code: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main(void) {
    int a = 10, b = 99;
    printf("Sebelum: a=%d, b=%d\\n", a, b);
    swap(&a, &b);
    printf("Sesudah: a=%d, b=%d\\n", a, b);
    return 0;
}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Dynamic Memory Allocation (malloc)",
        instruction: "Ganti tanda '???' dengan keyword penentu ukuran tipe memori sizeof(int).",
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = (int*) malloc(5 * ???);
    if (!arr) return 1;
    arr[0] = 500;
    printf("Alokasi Berhasil: %d\\n", arr[0]);
    free(arr);
    return 0;
}`
      },
      {
        level: "Expert",
        title: "4. Singly Linked List Traversal",
        instruction: "Implementasi linked-list manual dengan traversing struct node pointer.",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

int main(void) {
    Node *head = (Node*)malloc(sizeof(Node));
    Node *second = (Node*)malloc(sizeof(Node));
    head->data = 100; head->next = second;
    second->data = 200; second->next = NULL;

    for (Node *curr = head; curr; curr = curr->next) {
        printf("Node Val: %d\\n", curr->data);
    }
    free(second); free(head);
    return 0;
}`
      }
    ]
  },

  // ==========================================
  // 7. C++
  // ==========================================
  {
    id: "cpp",
    name: "C++",
    category: "Modern",
    year: "1985",
    monacoLang: "cpp",
    description: "Ekstensi bahasa C dengan dukungan OOP, template metaprogramming, dan pustaka kontainer cepat Standard Template Library (STL).",
    modules: [
      {
        level: "Pemula",
        title: "1. Stream I/O & Namespaces",
        instruction: "Sintaks stream std::cout dan std::endl.",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Selamat Datang di Pemrograman Modern C++!" << endl;
    return 0;
}`
      },
      {
        level: "Menengah",
        title: "2. STL Vectors & Lambda Sort",
        instruction: "Pengurutan vector dinamis menggunakan std::sort.",
        code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> data = {40, 10, 80, 20, 50};
    std::sort(data.begin(), data.end());
    std::cout << "Vector Terurut: ";
    for (int n : data) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Class Constructor Instantiation",
        instruction: "Ganti tanda '???' dengan nama constructor class Persegi.",
        code: `#include <iostream>
using namespace std;

class Persegi {
public:
    int sisi;
    ???(int s) { sisi = s; }
    int getLuas() { return sisi * sisi; }
};

int main() {
    Persegi p(8);
    cout << "Luas Persegi: " << p.getLuas() << endl;
    return 0;
}`
      },
      {
        level: "Expert",
        title: "4. Compile-Time Template Metaprogramming",
        instruction: "Kalkulasi faktorial saat proses kompilasi tanpa beban runtime CPU.",
        code: `#include <iostream>

template<unsigned int N>
struct Faktorial { enum { nilai = N * Faktorial<N - 1>::nilai }; };
template<>
struct Faktorial<0> { enum { nilai = 1 }; };

int main() {
    std::cout << "Compile-Time Faktorial(6): " << Faktorial<6>::nilai << std::endl;
    return 0;
}`
      }
    ]
  },

  // ==========================================
  // 8. C# (.NET)
  // ==========================================
  {
    id: "csharp",
    name: "C# (.NET)",
    category: "Modern",
    year: "2000",
    monacoLang: "csharp",
    description: "Bahasa type-safe berorientasi objek murni dari Microsoft untuk pengembangan enterprise backend, cloud, dan engine game Unity.",
    modules: [
      {
        level: "Pemula",
        title: "1. Class Program & String Interpolation",
        instruction: "Format pencetakan modern string interpolation C#.",
        code: `using System;

public class Program {
    public static void Main() {
        string dev = "Doni Firmansyah";
        int level = 99;
        Console.WriteLine($"Developer: {dev} | Level Status: {level}");
    }
}`
      },
      {
        level: "Menengah",
        title: "2. LINQ Lambda & Collection Filtering",
        instruction: "Menyaring dan mentransformasi list menggunakan ekstensi LINQ.",
        code: `using System;
using System.Collections.Generic;
using System.Linq;

public class Program {
    public static void Main() {
        var angka = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8 };
        var genapKuadrat = angka.Where(n => n % 2 == 0).Select(n => n * n);
        Console.WriteLine("Genap Kuadrat: " + string.Join(", ", genapKuadrat));
    }
}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Lengkapi Properti Auto-Getter Setter",
        instruction: "Ganti tanda '???' dengan keyword setter (set).",
        code: `using System;

public class User {
    public string Name { get; ???; }
}

public class Program {
    public static void Main() {
        var u = new User { Name = "Admin" };
        Console.WriteLine("User Name: " + u.Name);
    }
}`
      },
      {
        level: "Expert",
        title: "4. Async Task Pipeline Synchronization",
        instruction: "Eksekusi asynchronous method menggunakan Task dan async/await.",
        code: `using System;
using System.Threading.Tasks;

public class Program {
    public static async Task<int> FetchDataAsync() {
        await Task.Delay(10);
        return 42;
    }
    public static async Task Main() {
        int hasil = await FetchDataAsync();
        Console.WriteLine($"Hasil Async Task: {hasil}");
    }
}`
      }
    ]
  },

  // ==========================================
  // 9. JAVA
  // ==========================================
  {
    id: "java",
    name: "Java",
    category: "Modern",
    year: "1995",
    monacoLang: "java",
    description: "Bahasa berorientasi objek yang berjalan di atas JVM dengan filosofi Write Once, Run Anywhere. Standar utama korporat besar.",
    modules: [
      {
        level: "Pemula",
        title: "1. Main Entrypoint & System Streams",
        instruction: "Deklarasi kelas standar Java dan stream output.",
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java Virtual Machine Runtime: Ready!");
    }
}`
      },
      {
        level: "Menengah",
        title: "2. Stream API & Collection Filtering",
        instruction: "Filter elemen list menggunakan Stream API Java 8+.",
        code: `import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Java", "COBOL", "Python", "C++", "Rust");
        List<String> hasil = list.stream().filter(s -> s.length() <= 4).collect(Collectors.toList());
        System.out.println("Bahasa <= 4 Huruf: " + hasil);
    }
}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Implementasi Interface",
        instruction: "Ganti tanda '???' dengan keyword implements interface.",
        code: `interface IService { void eksekusi(); }

class BackendService ??? IService {
    public void eksekusi() { System.out.println("Service Aktif!"); }
}

public class Main {
    public static void main(String[] args) {
        IService s = new BackendService();
        s.eksekusi();
    }
}`
      },
      {
        level: "Expert",
        title: "4. Multithreading ArrayBlockingQueue Locks",
        instruction: "Sinkronisasi antrean producer-consumer multithreaded.",
        code: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BlockingQueue<Integer> q = new ArrayBlockingQueue<>(5);
        Thread t = new Thread(() -> { try { q.put(888); } catch(Exception e){} });
        t.start(); t.join();
        System.out.println("Queue Element Received: " + q.poll());
    }
}`
      }
    ]
  },

  // ==========================================
  // 10. GO (GOLANG)
  // ==========================================
  {
    id: "go",
    name: "Go (Golang)",
    category: "Modern",
    year: "2009",
    monacoLang: "go",
    description: "Bahasa minimalis dan cepat dari Google yang dirancang untuk arsitektur cloud, microservices, dan sistem terdistribusi via Goroutines.",
    modules: [
      {
        level: "Pemula",
        title: "1. Multiple Return Values & Formatting",
        instruction: "Fungsi yang mengembalikan dua nilai kembalian sekaligus.",
        code: `package main
import "fmt"

func hitung(a, b int) (int, int) {
    return a + b, a * b
}

func main() {
    tambah, kali := hitung(10, 5)
    fmt.Printf("Tambah: %d | Kali: %d\\n", tambah, kali)
}`
      },
      {
        level: "Menengah",
        title: "2. Struct Methods & Pointer Receivers",
        instruction: "Method receiver pointer untuk mengubah status objek struct.",
        code: `package main
import "fmt"

type Dompet struct { Saldo int }
func (d *Dompet) Topup(n int) { d.Saldo += n }

func main() {
    d := Dompet{Saldo: 50000}
    d.Topup(25000)
    fmt.Printf("Saldo Akhir: Rp%d\\n", d.Saldo)
}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Goroutine Channel Data Transfer",
        instruction: "Ganti tanda '???' dengan operator pengiriman channel (<-).",
        code: `package main
import "fmt"

func kirimPesan(c chan string) {
    c ??? "Data Goroutine Sukses!"
}

func main() {
    ch := make(chan string)
    go kirimPesan(ch)
    fmt.Println(<-ch)
}`
      },
      {
        level: "Expert",
        title: "4. Worker Pool Pattern Concurrency",
        instruction: "Pola concurrency worker-pool untuk pemrosesan pekerjaan paralel.",
        code: `package main
import "fmt"

func main() {
    jobs := make(chan int, 3)
    results := make(chan int, 3)
    for w := 1; w <= 2; w++ {
        go func() {
            for j := range jobs { results <- j * 10 }
        }()
    }
    for j := 1; j <= 3; j++ { jobs <- j }
    close(jobs)
    for a := 1; a <= 3; a++ { fmt.Println("Result:", <-results) }
}`
      }
    ]
  },

  // ==========================================
  // 11. RUST
  // ==========================================
  {
    id: "rust",
    name: "Rust",
    category: "Modern",
    year: "2015",
    monacoLang: "rust",
    description: "Bahasa sistem modern yang menjamin memory safety dan kebebasan thread tanpa menggunakan garbage collector lewat mekanisme Ownership & Borrowing.",
    modules: [
      {
        level: "Pemula",
        title: "1. Immutability & Macro Output",
        instruction: "Pahami konsep variabel immutable vs mutable (mut).",
        code: `fn main() {
    let mut counter = 10;
    println!("Nilai Awal: {}", counter);
    counter += 5;
    println!("Nilai Akhir: {}", counter);
}`
      },
      {
        level: "Menengah",
        title: "2. Pattern Matching & Option Enum",
        instruction: "Penanganan nilai null-safe secara elegan via Option<T>.",
        code: `fn bagi(a: i32, b: i32) -> Option<i32> {
    if b == 0 { None } else { Some(a / b) }
}

fn main() {
    match bagi(50, 5) {
        Some(v) => println!("Hasil Bagi: {}", v),
        None => println!("Error: Pembagian oleh nol!"),
    }
}`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Mutable Borrowing Reference",
        instruction: "Ganti tanda '???' dengan mutable reference &mut.",
        code: `fn modifikasi(s: ??? String) {
    s.push_str(" World!");
}

fn main() {
    let mut pesan = String::from("Hello");
    modifikasi(&mut pesan);
    println!("{}", pesan);
}`
      },
      {
        level: "Expert",
        title: "4. Zero-Cost Traits Polymorphism",
        instruction: "Implementasi compile-time generic trait dispatch.",
        code: `trait Cetak { fn ringkas(&self) -> String; }
struct Artikel { judul: String }
impl Cetak for Artikel {
    fn ringkas(&self) -> String { format!("Judul: {}", self.judul) }
}
fn render<T: Cetak>(item: T) { println!("{}", item.ringkas()); }
fn main() { render(Artikel { judul: String::from("Rust Zero-Cost") }); }`
      }
    ]
  },

  // ==========================================
  // 12. PHP
  // ==========================================
  {
    id: "php",
    name: "PHP",
    category: "Modern",
    year: "1995",
    monacoLang: "php",
    description: "Hypertext Preprocessor. Bahasa backend web server side paling populer di dunia yang mentenagai jutaan situs CMS dan web dinamis.",
    modules: [
      {
        level: "Pemula",
        title: "1. Sintaks Variabel & String Concatenation",
        instruction: "Deklarasi variabel dollar sign ($) dan penggabungan string.",
        code: `<?php
$nama = "Doni Firmansyah";
$tahun = 1995;
echo "Bahasa: PHP (Rilis: " . $tahun . ")\\n";
echo "Developer: " . $nama . "\\n";`
      },
      {
        level: "Menengah",
        title: "2. Associative Arrays & Array Functions",
        instruction: "Mengelola associative array (key-value) dan transformasi data.",
        code: `<?php
$produk = [
    ["nama" => "Laptop", "harga" => 12000000],
    ["nama" => "Mouse", "harga" => 250000]
];
$total = array_sum(array_column($produk, "harga"));
echo "Total Inventaris: Rp" . number_format($total, 0, ",", ".");`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Anonymous Arrow Function",
        instruction: "Ganti tanda '???' dengan keyword arrow function fn.",
        code: `<?php
$angka = [1, 2, 3, 4, 5];
$kuadrat = array_map(???($n) => $n * $n, $angka);
print_r($kuadrat);`
      },
      {
        level: "Expert",
        title: "4. Strict Typing OOP & Dependency Injection",
        instruction: "Menerapkan class dengan type declaration ketat dan constructor property promotion.",
        code: `<?php
interface LoggerInterface { public function log(string $msg): void; }
class ConsoleLogger implements LoggerInterface {
    public function log(string $msg): void { echo "[LOG] " . $msg . "\\n"; }
}
class App {
    public function __construct(private LoggerInterface $logger) {}
    public function run(): void { $this->logger->log("Aplikasi Berhasil Berjalan."); }
}
$app = new App(new ConsoleLogger());
$app->run();`
      }
    ]
  },

  // ==========================================
  // 13. RUBY
  // ==========================================
  {
    id: "ruby",
    name: "Ruby",
    category: "Modern",
    year: "1995",
    monacoLang: "ruby",
    description: "Bahasa dinamis berorientasi objek murni karya Yukihiro Matsumoto yang mengutamakan kebahagiaan programmer dan produktivitas tinggi.",
    modules: [
      {
        level: "Pemula",
        title: "1. Block Iterators & String Interpolation",
        instruction: "Gunakan method iterator .times dan string interpolation #{}",
        code: `bahasa = "Ruby"
3.times do |i|
  puts "Iterasi #{i + 1}: Semangat Belajar #{bahasa}!"
end`
      },
      {
        level: "Menengah",
        title: "2. Enumerable Map, Select & Symbols",
        instruction: "Transformasi koleksi data dengan method chaining Enumerable.",
        code: `angka = [10, 15, 20, 25, 30]
genap_kuadrat = angka.select { |n| n.even? }.map { |n| n ** 2 }
puts "Hasil: #{genap_kuadrat.inspect}"`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Custom Block Yield Statement",
        instruction: "Ganti tanda '???' dengan keyword eksekusi blok (yield).",
        code: `def bungkus_pesan
  puts "=== AWAL PESAN ==="
  ???
  puts "=== AKHIR PESAN ==="
end

bungkus_pesan { puts "Halo dari dalam Block Ruby!" }`
      },
      {
        level: "Expert",
        title: "4. Metaprogramming & Dynamic Method Dispatch",
        instruction: "Mendefinisikan method secara dinamis pada saat runtime dengan define_method.",
        code: `class Robot
  [:maju, :mundur, :berhenti].each do |aksi|
    define_method(aksi) do
      puts "Robot sedang melakukan: #{aksi.to_s.upcase}"
    end
  end
end

bot = Robot.new
bot.maju
bot.berhenti`
      }
    ]
  },

  // ==========================================
  // 14. TYPESCRIPT
  // ==========================================
  {
    id: "typescript",
    name: "TypeScript",
    category: "Modern",
    year: "2012",
    monacoLang: "typescript",
    description: "Superset JavaScript bertipe statis ketat dari Microsoft yang mengamankan arsitektur aplikasi skala besar.",
    modules: [
      {
        level: "Pemula",
        title: "1. Type Annotations & Interfaces",
        instruction: "Mendefinisikan kontrak objek menggunakan Interface.",
        code: `interface User {
  id: number;
  username: string;
  isVerified: boolean;
}

const userBaru: User = { id: 101, username: "doni_dev", isVerified: true };
console.log(\`User: \${userBaru.username} (Verified: \${userBaru.isVerified})\`);`
      },
      {
        level: "Menengah",
        title: "2. Generics & Type Constraints",
        instruction: "Membuat fungsi reusable dengan generic type parameter <T>.",
        code: `function bungkusArray<T>(item: T): T[] {
  return [item, item];
}

console.log(bungkusArray<string>("TypeScript"));
console.log(bungkusArray<number>(999));`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Type Union & Narrowing",
        instruction: "Ganti tanda '???' dengan operator union type (|).",
        code: `type ID = string ??? number;

function cetakID(id: ID) {
  console.log(\`ID Terdaftar: \${id}\`);
}

cetakID("USR-99");
cetakID(1024);`
      },
      {
        level: "Expert",
        title: "4. Advanced Mapped Types & Conditional Types",
        instruction: "Mentransformasi seluruh properti interface menjadi readonly secara kondisional.",
        code: `type ReadOnlyKustom<T> = {
  readonly [P in keyof T]: T[P];
};

interface Konfigurasi {
  host: string;
  port: number;
}

const config: ReadOnlyKustom<Konfigurasi> = {
  host: "localhost",
  port: 8080
};

console.log("Config Frozen:", config);`
      }
    ]
  },

  // ==========================================
  // 15. JAVASCRIPT
  // ==========================================
  {
    id: "javascript",
    name: "JavaScript",
    category: "Modern",
    year: "1995",
    monacoLang: "javascript",
    description: "Bahasa dinamis yang mentenagai web interaktif dan asynchronous backend via Node.js.",
    modules: [
      {
        level: "Pemula",
        title: "1. ES6 Destructuring & Template Literals",
        instruction: "Destructuring objek dan string literals.",
        code: `const user = { nama: "Doni", role: "Frontend Architect" };
const { nama, role } = user;
console.log(\`Halo, saya \${nama} bekerja sebagai \${role}.\`);`
      },
      {
        level: "Menengah",
        title: "2. Array Map, Filter & Reduce",
        instruction: "Menghitung total tagihan belanjaan.",
        code: `const cart = [
  { item: "Kopi", harga: 25000, qty: 2 },
  { item: "Roti", harga: 15000, qty: 3 }
];
const total = cart.reduce((acc, curr) => acc + (curr.harga * curr.qty), 0);
console.log(\`Total Belanja: Rp \${total.toLocaleString("id-ID")}\`);`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Asynchronous Async/Await",
        instruction: "Ganti tanda '???' dengan keyword async dan await.",
        code: `const fetchAPI = () => new Promise(res => res("Data API Diterima!"));

??? function prosesData() {
  const data = ??? fetchAPI();
  console.log(data);
}

prosesData();`
      },
      {
        level: "Expert",
        title: "4. Reactive Observer Pattern (EventBus)",
        instruction: "Membangun sistem pub-sub reactive murni.",
        code: `class EventBus {
  constructor() { this.events = {}; }
  on(event, fn) { (this.events[event] = this.events[event] || []).push(fn); }
  emit(event, payload) { (this.events[event] || []).forEach(fn => fn(payload)); }
}

const bus = new EventBus();
bus.on("notif", (p) => console.log(\`[Notifikasi Saweria]: \${p.pesan}\`));
bus.emit("notif", { pesan: "Donasi baru masuk sebesar Rp 50.000!" });`
      }
    ]
  },

  // ==========================================
  // 16. PYTHON
  // ==========================================
  {
    id: "python",
    name: "Python",
    category: "Modern",
    year: "1991",
    monacoLang: "python",
    description: "Bahasa tingkat tinggi yang bersih dan ekspresif. Standar global untuk Data Science, AI, dan Automasi.",
    modules: [
      {
        level: "Pemula",
        title: "1. Variabel, Tipe Data & F-String",
        instruction: "Assignment variabel dan pencetakan data string modern.",
        code: `nama = "Doni Firmansyah"
umur = 20
profesi = "Software Developer"

print(f"Halo, nama saya {nama}, usia {umur} tahun sebagai {profesi}.")`
      },
      {
        level: "Menengah",
        title: "2. List & Dictionary Comprehension",
        instruction: "Menyaring bilangan genap dan kuadratkan dalam satu baris ekspresi.",
        code: `angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
kuadrat_genap = [x**2 for x in angka if x % 2 == 0]
print("Kuadrat Genap:", kuadrat_genap)`
      },
      {
        level: "Isi Kode",
        title: "3. [Latihan] Logika Slicing Palindrome",
        instruction: "Ganti tanda '???' dengan slicing string terbalik (::-1).",
        code: `def cek_palindrome(kata):
    # Lengkapi bagian slicing
    return kata == kata[???]

kata_uji = "katak"
print(f"Apakah '{kata_uji}' palindrome? {cek_palindrome(kata_uji)}")`
      },
      {
        level: "Expert",
        title: "4. Custom Function Decorator & Performance Tracker",
        instruction: "Membangun decorator untuk mengukur efisiensi eksekusi fungsi.",
        code: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        hasil = func(*args, **kwargs)
        durasi = time.perf_counter() - t0
        print(f"Eksekusi {func.__name__} selesai dalam {durasi:.6f}s")
        return hasil
    return wrapper

@timer
def hitung_kuadrat(n):
    return sum(i**2 for i in range(n))

print("Total Hasil:", hitung_kuadrat(50000))`
      }
    ]
  }
];