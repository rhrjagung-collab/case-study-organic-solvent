# Pelarut Organik — Studi Kasus Toksikologi Industri

Modul studi kasus interaktif untuk **Toksikologi Industri (TM 10)**, Program Studi Kesehatan Masyarakat, UPN Veteran Jakarta. Terinspirasi format modul studi kasus [UC Davis toxmsdt](https://ucdavis.github.io/toxmsdt/pesticides/#/), dibangun ulang sebagai aplikasi web statis murni (HTML + CSS + vanilla JS, tanpa build step).

**Kasus utama:** Chouanière D, Wild P, Fontana JM, dkk. *Neurobehavioral disturbances arising from occupational toluene exposure.* Am J Ind Med. 2002;41(1):77–88 (file `ajim.10030.pdf` di folder REFERENSI bahan ajar).

## Struktur modul

| Bagian | Isi | Interaktivitas |
|---|---|---|
| Unit 1 — Kasus: Gangguan Ingatan di Pabrik Percetakan | Skenario & keputusan desain studi (Chouanière 2002) | Reveal-pertanyaan penyelidikan, kronologi, kuis 3 soal |
| Unit 2 — Pelarut Organik: Apa Itu? | Enam kelas, dua pintu masuk, narkosis | Kartu kelas, aktivitas mencocokkan pelarut→organ, kuis 4 soal |
| Unit 3 — Dosis: Udara yang Sama, Dosis yang Berbeda | Udara vs dosis internal, TWA/STEL/C/Notasi Kulit, PEL/REL/TLV/NAB | Rantai pajanan, spektrum induk↔metabolit, tabel NAB, kuis 4 soal |
| Unit 4 — Metabolisme | 7 jalur pelarut→metabolit→organ + 6 kasus lapangan | 7 flip-card + akordeon kasus, kuis 5 soal |
| Unit 5 — Investigasi | Metode & hasil studi percetakan | Akordeon metode, grafik batang paparan per bengkel, grafik dosis–efek Digit Span (SVG animasi), prediksi-hasil, kuis 5 soal |
| Unit 6 — Simpul | NAB toluena, hierarki pengendalian, biomonitoring | Tabel regulasi, flip-card pengendalian, kuis 4 soal |
| Asesmen Akhir | Kasus progresif 8 lapis | Kuis berskorsi dengan umpan balik per lapis |
| Referensi | 24 sumber primer | — |
| Kamus Istilah | 70 istilah teknis modul ini, dikelompokkan per huruf awal | Popover definisi dari istilah di dalam teks; halaman daftar lengkap |

Progres (skor kuis, unit selesai) tersimpan di `localStorage` per peramban; tombol **Atur ulang** menghapusnya. Soal mengikuti prinsip *single-best-answer* (pilihan homogen, umpan balik untuk setiap opsi).

Istilah teknis yang tidak punya padanan Indonesia (DCM, TCE, IPB, BEI, *heliogravure*, *2,5-HD*, dst.) dipertahankan dalam bahasa Inggris dan dijelaskan lewat **Kamus Istilah**.

## Teknis

- **Router hash** (`#/unit/1`, `#/asesmen`, `#/referensi`, `#/kamus`) — kompatibel GitHub Pages tanpa konfigurasi 404.
- **Tanpa dependensi eksternal** — tidak ada CDN, font, atau framework; seluruh aset di `assets/`.
- `assets/content.js` memisahkan **konten** dari **logika** (`assets/app.js`) — mengubah/menterjemahkan konten cukup edit satu berkas.
- **Kamus istilah (hotspot)** — satu objek `MODULE.glossary` (70 entri) menjadi sumber tunggal definisi. Di dalam konten istilah ditulis sebagai penanda `{{slug}}` (mis. `{{dcvc}}`, `{{offset}}`, `{{footdrop}}`); saat halaman dirender, `applyGlossary()` mengubah setiap penanda menjadi `<span class="g" data-term>` yang berketuk di mana pun ia muncul — unit, flip-card, akordeon, tabel, maupun opsi kuis — dan membuka popover definisi. Halaman `#/kamus` merender daftar lengkapnya per huruf. Penyambutan memakai listener fase *capture* supaya mengetuk istilah di dalam opsi kuis hanya membuka penjelasan, bukan menjawab soal.
- Responsif (sidebar jadi drawer di layar sempit), dukungan `prefers-reduced-motion`, navigasi papan tuts untuk flip-card.

## Menjalankan lokal

Buka `index.html` langsung di peramban, atau:

```bash
python -m http.server 8080
# → http://localhost:8080
```

## Menerbitkan ke GitHub Pages

Cukup satu kali. Di halaman repositori: **Settings → Pages → Build and deployment → Source: *Deploy from a branch*** → pilih branch **`main`** dan path **`/`** → **Save**. Alamatnya lalu menjadi `https://rhrjagung-collab.github.io/case-study-organic-solvent/` (build biasanya 1–2 menit).

Karena modul memakai router hash, tidak perlu konfigurasi `404.html`; setiap alamat (`/`, `/#/unit/5`, `/#/asesmen`) langsung valid dan bisa dibagikan maupun di-*bookmark*.

## Sumber angka

Seluruh angka pada konten berasal dari artikel primer yang dikutip (lihat halaman Referensi) dan telah diverifikasi terhadap salinan di folder `REFERENCES/` bahan ajar TM-10. Catatan: abstrak Chouanière (2002) menyebut penurunan DSF 1 digit/40 ppm dan DSB 1 digit/25 ppm; bagian pembahasan artikel menyebut 36 ppm dan 26 ppm — modul menampilkan keduanya sebagai rentang 25–40 ppm.
