/* ============================================================
   Konten modul — Pelarut Organik: Studi Kasus Toksikologi Industri
   Sumber utama kasus: Chouanière dkk. (2002), Am J Ind Med 41:77–88
   (ajim.10030.pdf) + bahan ajar TM-10 (verifikasi lihat README).
   ============================================================ */

const MODULE = {
  meta: {
    title: "Pelarut Organik",
    subtitle: "Studi Kasus Toksikologi Industri",
    tagline: "Dari gangguan daya ingat di pabrik percetakan sampai makna sebuah angka Nilai Ambang Batas.",
    program: "Program Studi Kesehatan Masyarakat · UPN Veteran Jakarta",
    course: "Toksikologi Industri · Topik Mingguan 10",
    primarySource: "Chouanière D, Wild P, Fontana JM, dkk. Neurobehavioral disturbances arising from occupational toluene exposure. Am J Ind Med. 2002;41(1):77–88.",
    minutes: 115
  },

  outcomes: [
    "Menelusuri satu pertanyaan riset dalam toksikologi pekerjaan, dari keluhan di lapangan sampai desain studinya.",
    "Menjelaskan mengapa struktur kimia menentukan metabolisme, dan metabolisme menentukan organ sasaran.",
    "Membedakan dosis eksternal (udara) dan dosis internal, termasuk kontribusi penyerapan kulit.",
    "Menafsirkan Nilai Ambang Batas (TWA, STEL, notasi Kulit) berdampingan dengan OSHA PEL, NIOSH REL, dan ACGIH TLV.",
    "Menyusun simpulan yang berhati-hati dari bukti epidemiologi: apa yang ditemukan, apa yang tidak, dan mengapa."
  ],

  /* ================= GLOSSARIUM =================
     Penjelasan istilah yang muncul sebagai hotspot di dalam modul.
     Cara pakai: tulis {{slug}} di dalam teks; app.js menjadikannya tombol. */
  glossary: {
    "offset": { label: "Cetak offset", en: "offset printing", def: "Tinta dipindahkan dari plat ke silinder getah karet (blanket), lalu ke kertas. Dominan untuk kemasan, majalah, dan brosur. Jumlah pelarutnya jauh lebih kecil daripada proses gravure." },
    "heliogravure": { label: "Heliogravure", en: "heliogravure / intaglio printing", def: "Tinta mengisi cekungan pada silinder berlubang, dicabut rakel, lalu ditekan ke kertas. Agar tinta encer dan mudah mengalir, pelarut (mis. toluena) dipakai dalam jumlah besar — inilah sumber utama paparan di industri percetakan." },
    "rotogravure": { label: "Rotogravure", en: "rotary gravure", def: "Nama lain heliogravure yang lazim dipakai di Eropa (gravure putar). Keduanya menunjuk teknik yang sama: cetak intaglio dengan silinder berputar." },
    "flexo": { label: "Cetak flexo", en: "flexographic printing", def: "Cetak memakai plat karet fleksibel dan tinta berbasis air. Umum pada kemasan fleksibel dan kantong plastik." },
    "sablon": { label: "Sablon (screen printing)", en: "screen printing", def: "Tinta ditekan melewati jaring (saring) pada bidang datar; banyak dipakai pada tekstil dan stiker." },
    "ppm": { label: "ppm", en: "parts per million", def: "Satu bagian dalam sejuta bagian volume udara: 1 ppm berarti 1 L zat dalam 1.000.000 L udara. Satuan untuk batas udara kerja." },
    "twa": { label: "TWA", en: "time-weighted average", def: "Rata-rata tertimbang waktu selama periode kerja normal (umumnya 8 jam). Ini batas utama dalam tabel NAB; bila jam kerja berbeda, berlaku faktor koreksi harian/mingguan." },
    "stel": { label: "STEL", en: "short-term exposure limit", def: "Batas untuk paparan singkat selama 15 menit. Dipakai untuk zat yang memberi efek iritasi atau bahaya akut sebelum batas TWA tercapai." },
    "pel": { label: "PEL", en: "Permissible Exposure Limit (OSHA)", def: "Batas hukum yang ditetapkan OSHA Amerika Serikat. Karena memperhitungkan kelayakan teknis dan ekonomi, angkanya sering jauh lebih longgar daripada nilai yang murni berbasis kesehatan." },
    "rel": { label: "REL", en: "Recommended Exposure Limit (NIOSH)", def: "Rekomendasi NIOSH yang murni berbasis kesehatan pekerja, tanpa mempertimbangkan kelayakan ekonomi. Sering jauh lebih ketat daripada PEL untuk zat yang sama." },
    "tlv": { label: "TLV", en: "Threshold Limit Value (ACGIH)", def: "Nilai ambang disusun ACGIH berdasarkan efek kritis yang teridentifikasi. Bukan batasan hukum, melainkan panduan profesional." },
    "bei": { label: "BEI", en: "Biological Exposure Index", def: "Indeks pemantauan biologis dari NIOSH: nilai metabolit atau produk ekskresi yang dianggap mencerminkan paparan aman. Dibaca pada spesimen (urin atau darah), bukan pada udara." },
    "ipb": { label: "IPB", en: "Indeks Pemantauan Biologis", def: "Padanan Indonesia dari BEI — nilai metabolit ekskresi pada urin atau darah yang ditetapkan Permenaker untuk memantau dosis internal pekerja." },
    "notasi-kulit": { label: "Notasi Kulit", en: "skin notation", def: "Tanda pada tabel NAB bahwa zat juga terserap melalui kulit, sehingga dosis total bukan hanya dari udara. Konsekuensinya: pengukuran udara saja tidak memadai dan pelindung kulit wajib." },
    "lev": { label: "LEV", en: "local exhaust ventilation", def: "Ventilasi eksor lokal: udara dihisap tepat di sumber uap (mis. permukaan evaporasi tinta), bukan sekadar mengencerkan udara se-ruangan. Ini tingkat pengendalian tertinggi yang praktis." },
    "apd": { label: "APD", en: "personal protective equipment", def: "Alat pelindung diri (sarung tangan, respirator, pelindung mata). Dalam hierarki pengendalian, APD adalah lapis terakhir karena bergantung penuh pada kepatuhan individu." },
    "p2k": { label: "P2K", en: "occupational health centre", def: "Pusat Pelayanan Kesehatan Kerja di perusahaan — tempat skrining kesehatan berkala dan pencatatan keluhan pekerja." },
    "msds": { label: "MSDS", en: "material safety data sheet", def: "Lembar data keamanan bahan (kini disebut SDS): kandungan kimia, bahaya, dan cara penanganan. Memberitahu kandungan bahan, bukan berapa yang masuk ke udara kerja." },
    "nmam": { label: "NMAM", en: "NIOSH Manual of Analytical Methods", def: "Kitab metode analisis laboratorium NIOSH. Metode 8318 adalah metode resmi mengukur 2,5-heksandion dalam urin." },
    "dosimeter": { label: "Dosimeter pasif", en: "passive dosimeter", def: "Lencana kecil (mis. GABIE) yang dipasang di zona pernapasan untuk menyerap uap selama ±8 jam. Hasilnya mewakili dosis rata-rata yang benar-benar dihirup pekerja, bukan konsentrasi di suatu titik ruang." },
    "napas-hembusan": { label: "Udara hembusan", en: "exhaled breath", def: "Udara yang dihembuskan pekerja setelah periode bebas paparan. Digunakan untuk membuktikan tidak ada zat tersisa di dalam tubuh saat pemeriksaan dilakukan." },
    "washout": { label: "Jeda bebas pajanan (washout)", en: "washout period", def: "Selang waktu tanpa paparan sebelum pemeriksaan (mis. ≥48 jam), agar hasil mengukur efek kronis dan bukan sisa efek akut dari hari sebelumnya." },
    "heg": { label: "HEG", en: "homogeneous exposure group", def: "Kelompok paparan homogen: sekelompok pekerja yang tugas, ruang, dan pajanannya dianggap setara, sehingga beberapa pengukuran mewakili seluruh kelompok." },
    "gcfid": { label: "GC-FID", en: "gas chromatography–flame ionization detector", def: "Teknik laboratorium memisahkan dan mengukur komponen uap organik satu per satu dari sampel yang terserap pada lencana dosimeter." },
    "anova": { label: "ANOVA", en: "analysis of variance", def: "Uji statistik membandingkan rerata antar-kelompok (mis. antar-bengkel dan antar-era) untuk mengestimasi faktor pengali pajanan masa lalu." },
    "confounder": { label: "Confounder", en: "confounder", def: "Variabel lain yang ikut menjelaskan hasil (mis. usia, pendidikan), sehingga jika tidak disesuaiakan, hubungan antara paparan dan efek menjadi kabur atau salah arah." },
    "bias-seleksi": { label: "Bias seleksi", en: "selection bias", def: "Kelompok yang ikut dalam studi tidak mewakili populasi aslinya. Jika pekerja paling terpapar justru paling sedikit ikut, hubungan paparan–efek terestimasi lebih kecil daripada kenyataan." },
    "healthy-worker": { label: "Efek pekerja sehat", en: "healthy worker effect", def: "Bias khas studi pekerjaan: yang masih bekerja umumnya lebih sehat dari populasi umum, sehingga risiko nyata bisa tersembunyi." },
    "euroquest": { label: "EUROQUEST", en: "EUROQUEST questionnaire", def: "Kuesioner gejala neurotoksik berbahasa Eropa, 83 butir dalam lima domain, termasuk domain khusus untuk kecemasan dan kepekaan lingkungan agar bias pelaporan dapat dikoreksi." },
    "nes": { label: "Baterai NES", en: "NES computerized battery", def: "Set tes psikometrik komputer standar untuk fungsi kognitif: waktu reaksi, substitusi simbol-digit, digit span, memori pola, dan pembelajaran asosiatif." },
    "dsf": { label: "Digit Span Maju (DSF)", en: "digit span forward", def: "Mengingat deret angka pendek yang dibacakan berurutan lalu mengulang dari awal ke akhir. Mengukur daya ingat kerja jangka pendek." },
    "dsb": { label: "Digit Span Mundur (DSB)", en: "digit span backward", def: "Variasi digit span yang harus diulang terbalik, menuntut lebih banyak daya ingat kerja. Dalam studi percetakan, tes ini paling peka terhadap paparan toluena." },
    "cei": { label: "CEI", en: "cumulative exposure index", def: "Indeks paparan kumulatif seumur kerja = jumlah (intensitas ppm x tahun) di tiap bengkel. Mengukur total beban, bukan paparan saat ini." },
    "dcm": { label: "DCM", en: "dichloromethane / methylene chloride (CH2Cl2)", def: "Diklorometana: pelarut mudah menguap untuk menghapus cat dan lak. Di dalam tubuh sebagian diubah menjadi karbon monoksida, sehingga bahaya utamanya bukan iritasi, melainkan keracunan CO endogen." },
    "tce": { label: "TCE", en: "trichloroethylene", def: "Trikloroetilena: pelarut {{degreasing}} logam. Diklasifikasikan sebagai penyebab kanker ginjal oleh IARC (Golongan 1, 2014) melalui metabolit DCVC jalur glutathione." },
    "pce": { label: "PCE", en: "tetrachloroethylene / perchloroethylene", def: "Tetrakloroetilen: pelarut dry cleaning dan degreasing. Efek utamanya pada susunan saraf pusat; dikategorikan sebagai karsinogen yang memungkinkan." },
    "thf": { label: "THF", en: "tetrahydrofuran", def: "Tetrahidrofuran: pelarut eter sangat mudah menguap untuk resin dan cat. Titik nyala sekitar −14 °C, sehingga bahaya proses (kebakaran) sama pentingnya dengan bahaya toksiknya." },
    "cohb": { label: "COHb", en: "carboxyhemoglobin", def: "Persentase hemoglobin yang terikat karbon monoksida sehingga tak mampu membawa oksigen. Kenaikan COHb akibat DCM sering baru tampak berjam-jam setelah paparan berhenti." },
    "cyp2e1": { label: "CYP2E1", en: "cytochrome P450 2E1", def: "Enzim hati yang mengubah pelarut menjadi metabolit. CYP2E1-lah yang mengubah DCM menjadi karbon monoksida, serta benzena menjadi fenol lalu kuinon." },
    "gsh": { label: "Glutathione (GSH)", en: "glutathione", def: "Molekul pelindung sel yang menetralisir bahan berbahaya lewat konjugasi. Pada TCE, jalur konjugasi GSH justru menghasilkan DCVC — metabolit genotoksik yang menumpuk di ginjal." },
    "dcvc": { label: "DCVC", en: "dichloroacetylglycine", def: "Metabolit TCE hasil konjugasi glutathione yang genotoksik di ginjal dan diyakini penyebab kanker ginjal pada pekerja degreasing." },
    "kuinon": { label: "Kuinon benzena", en: "benzene quinone (hydroquinone / catechol)", def: "Produk oksidasi benzena (hidrokuinon, katekol) yang bereaksi dengan DNA — inilah mekanisme leukemia pada pekerja benzena." },
    "aduksi": { label: "Aduksi DNA", en: "DNA adduction", def: "Ikatan kimia antara metabolit dan untai DNA; bila tidak diperbaiki menjadi mutasi dan mendorong kanker." },
    "spma": { label: "SPMA", en: "S-phenylmercapturic acid", def: "Asam fenilmercapturat dalam urin — biomarker benzena jalur glutathione. Tidak terukur pada orang tanpa gen GSTT1 (fenotipe null)." },
    "mukonat": { label: "t,t-Mukonat", en: "trans,trans-muconic acid", def: "Asam trans,trans-mukonat dalam urin — biomarker benzena jalur glukuronida; tetap terukur meski fenotipe GSTT1 null." },
    "asam-hipurat": { label: "Asam hipurat", en: "hippuric acid", def: "Metabolit utama toluena dalam urin untuk memantau paparan. Kelemahannya: orang yang tak terpapar pun mengekskresi 1-1,5 g/hari dari makanan, sehingga kurang spesifik pada kadar rendah." },
    "asam-format": { label: "Asam format (formiat)", en: "formic acid", def: "Metabolit metanol yang justru lebih berbahaya daripada metanolnya: menghambat sitokrom c oksidase di sel retina dan menyebabkan asidosis metabolik." },
    "maa": { label: "MAA", en: "methoxyacetic acid", def: "Asam metoksiasetat dalam urin, metabolit 2-metoksetanol (glikol eter). Paruh hidupnya pada manusia ±77 jam — jauh lebih lama daripada tikus — sehingga spesimen diambil di akhir pekan kerja." },
    "baa": { label: "BAA", en: "2-butoxyacetic acid / ethoxyacetic acid", def: "Asam alkoksiasetat lain (2-butoksi- dan etoksiasetat) dari glikol eter; bersama MAA menjadi penanda paparan glikol eter." },
    "glikol-eter": { label: "Glikol eter (seri E)", en: "ethylene glycol ethers", def: "Kelompok pelarut ether turunan etilen glikol (2-ME, 2-EE, 2-BE, EGME, EGEE). Sering dipakai dalam cat dan proses semikonduktor; efeknya pada darah dan reproduksi." },
    "25hd": { label: "2,5-HD", en: "2,5-hexanedione", def: "γ-diketon hasil metabolisme n-heksana yang mengunci (cross-link) neurofilamen — penyebab neuropati perifer pada pekerja lem sepatu. Hilang dari tubuh setelah paparan berhenti." },
    "dyingback": { label: "Dying-back", en: "dying-back (dystrophic) neuropathy", def: "Pola neuropati aksonal yang mati dari ujung saraf terpanjang menuju badan sel — makanya keluhan mulai dari jari kaki dan tangan lalu menjalar naik secara simetris." },
    "coasting": { label: "Efek coasting", en: "coasting effect", def: "Gejala neuropati yang bertahan atau memburuk sesaat setelah paparan dihentikan, meskipun biomarker sudah kembali normal. Jangan dianggap sembuh hanya karena biomarker negatif." },
    "footdrop": { label: "Foot drop", en: "foot drop", def: "Kekuatan otot menggerakkan punggung kaki hilang sehingga kaki terjuntai dan terseret saat berjalan. Tanda khas kelemahan saraf peroneal distal." },
    "striper": { label: "Striper", en: "striper / stripping compound", def: "Cairan penghapus lapisan cat lama yang kandungan DCM-nya bisa 60-100%. Bahan inilah yang menewaskan belasan pekerja perbaikan bak mandi di Amerika Serikat." },
    "wallwash": { label: "Wall-wash test", en: "wall-wash test", def: "Uji kebersihan permukaan: menggosok dinding dengan kain penyerap lalu mengukur kontaminasinya. Memerlukan banyak pelarut di dalam ruang tertutup." },
    "idlh": { label: "IDLH", en: "immediately dangerous to life or health", def: "Kadar yang bisa membunuh dalam waktu singkat tanpa alat pernapasan pelindung (DCM: 2.300 ppm). Di atasnya diperlukan SCBA, bukan masker biasa." },
    "fomepizol": { label: "Fomepizol", en: "fomepizole", def: "Obat penghambat ADH kompetitif: menghentikan konversi metanol menjadi formiat. Etanol adalah alternatif bila fomepizol tidak tersedia." },
    "osmol-gap": { label: "Celah osmolal", en: "osmol gap", def: "Selisih antara osmolalitas yang diukur dan yang dihitung. Meningkatnya menandakan ada alkohol toksik (metanol, etilen glikol) dalam darah, tetapi tidak membedakan zatnya." },
    "dispatch": { label: "Pekerja kontrak gelap", en: "illegal dispatch worker", def: "Pekerja yang dikirim oleh agensi tidak berizin ke perusahaan induk, tanpa jaminan kesehatan kerja. Mayoritas korban keracunan metanol di pabrik ponsel Korea." },
    "cartridge": { label: "Kartrid respirator", en: "organic-vapour cartridge", def: "Filter serbuk arang untuk menahan uap organik. Kapasitasnya terbatas — pada DCM 1.000 ppm, kartrid standar sudah jebol dalam ±16 menit." },
    "scba": { label: "SCBA", en: "self-contained breathing apparatus", def: "Tabung pernapasan mandiri yang membawa udaranya sendiri; dipakai saat kadar jauh melampaui IDLH sehingga menyaring udara ruangan tidak lagi cukup." },
    "laminate": { label: "Laminat PE/EVOH", en: "PE/EVOH laminate glove", def: "Sarung tangan berlapis polietilena / etil-vinil-alkohol — satu-satunya yang masih tahan terhadap striper DCM. Sarung latex, nitril, neoprena, dan butyl semuanya tidak." },
    "sir": { label: "SIR", en: "standardized incidence ratio", def: "Rasio jumlah kasus yang diamati terhadap jumlah yang diharapkan pada populasi umum. SIR 7,97 berarti kira-kira enam kali lipat risiko kanker ginjal dibandingkan populasi pembanding." },
    "smr": { label: "SMR", en: "standardized mortality ratio", def: "Rasio mortalitas standar — cara mengukur apakah pekerja suatu kohort meninggal lebih banyak daripada populasi umum." },
    "or": { label: "OR", en: "odds ratio", def: "Rasio peluang suatu kejadian pada kelompok terpapar dibandingkan pembanding. {{or}} 1,76 berarti peluangnya naik 76 persen." },
    "cnc": { label: "CNC", en: "computer numerical control", def: "Mesin pemotong atau pemesinan yang dikendalikan komputer; cairan pendinginnya kerap berbasis pelarut seperti metanol." },
    "degreasing": { label: "Degreasing", en: "degreasing", def: "Pembersihan minyak dari logam, biasanya dengan pelarut klorinasi seperti TCE atau PCE — proses berisiko paparan sangat tinggi." },
    "bathtub": { label: "Bathtub refinishing", en: "bathtub refinishing", def: "Pelapisan ulang bak mandi memakai striper dan cat epoksi di ruang kecil tanpa ventilasi memadai. Sumber 13 kematian akibat DCM yang dilaporkan MMWR." },
    "sensasi-getar": { label: "Sensasi getar", en: "vibration sense", def: "Kemampuan membedakan getaran di kulit dan sendi, diuji dengan garpu tala. Penurunannya di bagian distal tubuh adalah salah satu tanda paling awal neuropati perifer." },
  },

  units: [
    /* ================= UNIT 1 ================= */
    {
      id: 1, slug: "unit-1", icon: "1",
      title: "Kasus: Gangguan Ingatan di Pabrik Percetakan",
      short: "Kasus: Gangguan Ingatan",
      minutes: 10,
      objectives: [
        "Memetakan pertanyaan riset dari keluhan gangguan ingatan (gampang lupa) pada pekerja.",
        "Mengenali keputusan desain yang menentukan kualitas sebuah studi pajanan."
      ],
      sections: [
        { type: "text", html: `
          <p class="lead">Perancis, pertengahan 1990-an. Dua pabrik percetakan menengah — <strong>Pabrik A</strong> dengan teknik percetakan {{offset}} (110 karyawan) dan <strong>Pabrik B</strong> dengan teknik {{heliogravure}} (252 karyawan). Keduanya baru pindah ke gedung baru yang lebih bersih — Pabrik A pada 1990, Pabrik B pada 1987.</p>
          <p>Bahan kimia kunci di kedua pabrik ini adalah <em class="hl">toluena</em> — pelarut tinta sekaligus cairan pembersih rol pada mesin cetak {{rotogravure}}. Kadar uapnya diukur dalam <strong>{{ppm}}</strong>, dan di kedua pabrik ini angkanya <em>rendah</em>: di bawah 50 ppm, bahkan jauh di bawah Nilai Ambang Batas (NAB) toluena.</p>
          <p>Pertanyaannya muncul dari sebuah keanehan: literatur menunjukkan neurotoksisitas toluena jelas pada pajanan <strong>lebih tinggi dari 50 ppm</strong> — tetapi diduga juga terjadi pada level lebih rendah. Apakah benar? Dan kalau benar, bagaimana membuktikannya dengan metodologi yang bisa dipertanggungjawabkan?</p>` },

        { type: "callout", variant: "data", title: "Skenario — Anda tim kesehatan kerja", html: `
          <p>Serikat pekerja mengeluh: <em>"rekan-rekan sulit mengingat angka, sering salah menghitung jumlah gulungan, dan sulit berkonsentrasi."</em> Manajemen menjawab: <em>"udara sudah jauh lebih bersih sejak pindah gedung baru; pengukuran rutin di bawah batas."</em></p>
          <p>Anda diminta menjawab satu pertanyaan: <strong>apakah pajanan toluena kadar rendah — di bawah batas — benar-benar memengaruhi otak?</strong></p>` },

        { type: "reveal", title: "Empat pertanyaan penyelidikan", lead: "Sebelum membuka jawaban, coba rumuskan sendiri: apa saja yang harus dijawab sebelum satu pekerja diukur?", items: [
          { q: "Siapa yang terpapar — dan siapa yang benar-benar bebas paparan?", a: `Seluruh bahan kimia yang dipakai (kini dan dulu) di semua bengkel diidentifikasi. Bengkel lalu dikelompokkan: <b>terpapar toluena</b>, <b>terpapar neurotoksin lain</b> (langsung dikeluarkan dari studi), dan <b>tanpa neurotoksin</b> (kelompok pembanding). Pekerja kantoran (kerah putih) tidak ikut.` },
          { q: "Berapa dosisnya — sekarang dan di masa lalu?", a: `Dosis <b>kini</b> diukur dengan dosimeter pasif {{dosimeter}} (lencana GABIE) yang dipakai ±7,5 jam di zona pernapasan, 231 sampel gabungan di kedua pabrik. Dosis <b>lampau</b> direkonstruksi dari data historis 1981 — sebelum pindah gedung — dengan asumsi rasio tetap antar-bengkel.` },
          { q: "Efek apa yang diukur, dan kapan?", a: `Dua hal: <b>gejala neurotoksik</b> (kuesioner {{euroquest}} (83 butir)) dan <b>kinerja psikometrik</b> (enam tes komputer dari baterai {{nes}}). Pengujiannya <b>di luar periode pajanan akut</b>: Senin pagi, atau setelah jeda ≥48 jam.` },
          { q: "Faktor apa lagi yang bisa menjelaskan hasilnya?", a: `Umur, jenis kelamin, tingkat pendidikan (skor uji kosakata), riwayat penyakit saraf pusat, alkohol, obat psikoaktif, kebiasaan komputer, hingga konsentrasi saat mengerjakan tes — semua dicatat untuk disesuaikan dalam analisis.` }
        ] },

        { type: "callout", variant: "warn", title: "Penting", html: `
          <p>Perhatikan keputusan <strong>"Senin pagi / ≥48 jam bebas pajanan"</strong>. Ini bukan detail administratif — ini desain untuk memastikan apa yang diukur adalah efek <em>pajanan kronis</em>, bukan sisa efek <em>akut</em> dari kemarin. Toluena larut dalam lemak (lipofilik) dan butuh waktu untuk dibersihkan dari tubuh; kalau tes dilakukan Jumat sore, hasilnya tercampur efek sisa hari itu.</p>` },

        { type: "timeline", title: "Kronologi studi", items: [
          { when: "1981", what: "Pengukuran udara kerja di lokasi lama Pabrik B — 24 sampel individual, yang kelak menjadi kunci rekonstruksi pajanan masa lalu." },
          { when: "1987 / 1990", what: "Pabrik B dan Pabrik A pindah ke gedung baru yang lebih bersih." },
          { when: "Apr–Jun 1994", what: "Pengambilan data di Pabrik A: dosimeter pasif 3 hari berturut-turut + tes perilaku." },
          { when: "Nov 1995", what: "Pengukuran udara di Pabrik B (145 sampel, semua bengkel dan shift)." },
          { when: "Jan–Feb 1996", what: "Pengambilan data individu Pabrik B: kuesioner + enam tes psikometrik komputer." }
        ] },

        { type: "stats", items: [
          { num: "129", lbl: "buruh dan petugas lapangan yang direkrut (analisis akhir: 128) — 39 Pabrik A, 89 Pabrik B" },
          { num: "231", lbl: "sampel udara personal dengan dosimeter pasif, ±7,5 jam per sampel" },
          { num: "0–27", lbl: "ppm rentang paparan toluena saat pengukuran — jauh di bawah 50 ppm" },
          { num: "48 jam", lbl: "jeda bebas pajanan minimum sebelum pemeriksaan, diverifikasi napas hembusan" }
        ] },

        { type: "quiz", title: "Cek pemahaman — Unit 1", questions: [
          {
            scenario: "Tim investigasi menguji para pekerja Senin pagi, dan pada 59 pekerja yang diragukan jeda 48 jamnya, toluena dalam napas hembusan diukur. Semua sampel di bawah ambang eksklusi 5 ppm (rata-rata 0,57 ppm).",
            stem: "Apa alasan utama desain 'jeda bebas pajanan ≥48 jam + verifikasi napas hembusan' ini?",
            opts: [
              "Memastikan hasil tes mencerminkan efek pajanan kronis, bukan sisa efek akut dari pajanan terakhir",
              "Meningkatkan tingkat partisipasi pekerja yang shift-nya padat",
              "Mengukur dosis paparan total selama satu minggu kerja penuh",
              "Menstandarkan kemampuan komputer antar-pekerja sebelum tes"
            ],
            answer: 0,
            explainGood: "Tepat. Toluena lipofilik; efek akutnya pulih dalam jam. Dengan menunggu ≥48 jam (dan membuktikan tidak ada toluena tersisa di napas hembusan), peneliti menguji efek pajanan kronis — inti pertanyaan risetnya.",
            explainBad: "Ingat tujuan desainnya: memisahkan efek akut dari efek kronis. Partisipasi dan standarisasi komputer adalah isu terpisah, dan dosis mingguan justru diukur dengan dosimeter, bukan dengan jeda tes."
          },
          {
            scenario: "Di Pabrik B, partisipasi keseluruhan 43% — tetapi di bengkel mesin cetak (yang paling terpapar, mean 27,6 ppm) hanya 24% yang ikut.",
            stem: "Bias apa yang paling mengancam penafsiran hasil?",
            opts: [
              "{{bias-seleksi}}: pekerja paling terpapar kurang terwakili, sehingga hubungan pajanan–efek bisa terlalu rendah",
              "Bias pengingat: pekerja melupa riwayat pajanan mereka",
              "Bias pengamat: penguji mengetahui status pajanan pekerja",
              "{{healthy-worker}}: pekerja lebih sehat dari populasi umum"
            ],
            answer: 0,
            explainGood: "Benar. Ketika kelompok paling terpapar hanya 24% ikut, rentang pajanan dalam sampel menyempit — kekuatan statistik turun dan estimasi efek condong ke nol. Penulis studi sendiri menyoroti ini dalam pembahasan.",
            explainBad: "{{healthy-worker}} (pekerja tetap bekerja karena cukup sehat) memang relevan dalam toksikologi kerja, tetapi ancaman spesifik di sini adalah kurangnya partisipasi justru pada kelompok paling terpapar — itu bias seleksi."
          },
          {
            stem: "Mengapa bengkel yang memakai neurotoksin lain (bukan toluena) dikeluarkan alih-alih dimasukkan sebagai 'terpapar sedikit'?",
            opts: [
              "Agar perbandingan bersih: perbedaan efek antara kelompok dapat diatribusikan pada toluena, bukan campuran neurotoksin",
              "Karena toluena selalu lebih berbahaya daripada semua neurotoksin lain",
              "Karena jumlah pekerja di bengkel itu terlalu kecil untuk statistik",
              "Karena neurotoksin lain tidak dapat diukur di udara kerja"
            ],
            answer: 0,
            explainGood: "Benar — ini disiplin klasik epidemiologi: satu pertanyaan, satu agen. Campuran neurotoksin akan membingungkan penafsiran (confounding), karena efeknya tidak bisa dipisahkan dari toluena.",
            explainBad: "Persoalannya bukan keberbahayaan relatif maupun jumlah pekerja; banyak neurotoksin justru bisa diukur di udara. Masalahnya adalah kebingungan atribusi: efek campuran tidak bisa dikaitkan hanya pada toluena."
          }
        ] }
      ],
      keyPoints: [
        "Pertanyaan riset menentukan desain: efek kronis → tes di luar jendela pajanan akut (≥48 jam).",
        "Kelompok pembanding harus bebas dari agen yang diteliti — bukan sekadar 'kurang terpapar'.",
        "Partisipasi yang tidak merata (bengkel paling terpapar hanya 24%) adalah ancaman validitas yang harus diakui saat menafsirkan hasil."
      ]
    },

    /* ================= UNIT 2 ================= */
    {
      id: 2, slug: "unit-2", icon: "2",
      title: "Pelarut Organik: Apa Itu?",
      short: "Pelarut Organik: Apa Itu?",
      minutes: 15,
      objectives: [
        "Mengelompokkan pelarut organik dalam enam kelas kimia dan contoh industrinya.",
        "Mengaitkan dua sifat fisik (volatilitas, lipofilisitas) dengan dua pintu masuk pajanan.",
        "Memprediksi organ sasaran pelarut umum sebelum mempelajari mekanismenya."
      ],
      sections: [
        { type: "text", html: `
          <p class="lead">Pelarut organik adalah senyawa berbasis karbon yang melarutkan zat lain — perekat, tinta, cat, lemak, minyak, resin. Skalanya sulit dibayangkan:</p>
          <blockquote class="quote">Ratusan bahan kimia individu menyusun lebih dari 30.000 pelarut industri.<span class="q-src">Harrison &amp; Roisman, dalam LaDou, CURRENT Occupational &amp; Environmental Medicine (5th ed.), Bab 32</span></blockquote>
          <p>Tidak ada satu cerita toksikologi untuk semua pelarut. Kelas kimia menentukan di mana pelarut ditemukan, dan — setelah dihirup atau diserap kulit — <strong>apa yang terjadi padanya di dalam tubuh</strong>. Peta enam kelas ini menjadi kompas seluruh modul.</p>` },

        { type: "callout", variant: "data", title: "Dua sifat, dua pintu masuk", html: `
          <p><strong>Volatilitas</strong> mengisi udara ruang kerja → pintu masuk <em>pernapasan</em>. <strong>Lipofilisitas</strong> menembus lapisan lemak kulit → pintu masuk <em>dermal</em>. Serapan paru pelarut 40–80% saat istirahat, dan kerja fisik menaikkan serapan paru 2–3 kali.</p>
          <p>Angka eksperimen yang paling meyakinkan untuk pintu kulit: <strong>menyelup tangan 15 menit ke dalam xilena murni ≈ menghirup 100 ppm xilena pada periode yang sama</strong>; satu penyelupan tangan 2 menit ke metanol ≈ menghirup 50 mg/m³ metanol selama 8 jam kerja (Löf &amp; Johanson 1998; Dutkiewicz 1980).</p>` },

        { type: "cards", title: "Enam kelas pelarut", lead: "Setiap kelas punya 'watak' toksikologinya sendiri. Buka satu per satu.", items: [
          { name: "Alifatik", ex: "n-heksana", jobs: "lem sepatu/tas, {{sablon}}, percetakan {{flexo}}", tox: "Neuropati perifer kronis — racunnya bukan pelarutnya, tapi metabolitnya: 2,5-heksandion." },
          { name: "Aromatik", ex: "benzena, toluena, stirena", jobs: "percetakan {{rotogravure}}, petrokimia, fiberglass", tox: "Benzena → sumsum tulang & leukemia; toluena/stirena → susunan saraf pusat. Satu cincin, nasib berbeda." },
          { name: "Halogen alifatik", ex: "{{dcm}} (diklorometana), TCE, PCE", jobs: "degreasing logam, dry cleaning, penghilang cat", tox: "DCM → CO di dalam tubuh (hipoksia); {{tce}} → kanker ginjal (IARC Group 1); {{pce}} → SSP, penyebab kanker potensial (NIOSH Ca)." },
          { name: "Halogen aromatik", ex: "klorobenzena, 1,4-diklorobenzena", jobs: "pewarna, pestisida, deodoran ruang", tox: "Batas regulasinya ditentukan oleh efek kritis tiap zat, bukan oleh nama keluarganya — satu keluarga kimia bisa punya kebijakan yang bertentangan." },
          { name: "Alkohol", ex: "metanol", jobs: "anti-beku, cairan proses CNC, pelarut industri", tox: "Metabolitnya (format) melumpuhkan mesin sel di retina — kebutaan. Bau tidak menolong: ambang bau ±1.500 ppm, jauh di atas batas kerja." },
          { name: "Eter", ex: "THF, {{glikol-eter}} (2-ME, 2-EE, 2-BE)", jobs: "lem PVC, fotolitografi semikonduktor, cat", tox: "{{thf}}: risiko kebakaran proses (titik nyala ≈ −14 °C); glikol eter: darah & reproduksi via asam alkoksiasetat — dan menipu pemantauan udara." }
        ] },

        { type: "match", title: "Aktivitas prediksi — lima racun, lima organ sasaran",
          lead: "Coba prediksi dulu, tanpa catatan: klik satu pelarut, lalu klik organ sasarannya. Pasangan benar terkunci hijau.",
          left: [
            { t: "n-Heksana", s: "pelarut lem sepatu" },
            { t: "Benzena", s: "pelarut lem & bensin" },
            { t: "Diklorometana (DCM)", s: "penghilang cat" },
            { t: "Metanol", s: "anti-beku, cairan CNC" },
            { t: "Glikol eter (2-ME/2-BE)", s: "fotolitografi, cat" }
          ],
          right: [
            { t: "Sumsum tulang → leukemia", s: "via metabolit {{kuinon}}" },
            { t: "Saraf perifer → neuropati", s: "melalui 2,5-heksandion" },
            { t: "Retina → kebutaan", s: "melalui format" },
            { t: "Darah (COHb) & jantung", s: "melalui CO endogen" },
            { t: "Reproduksi & darah", s: "via MAA/BAA" }
          ],
          pairs: [[0,1],[1,0],[2,3],[3,2],[4,4]] },

        { type: "text", html: `
          <h2>Efek umum yang selalu hadir: narkosis</h2>
          <p>Di samping watak khasnya, hampir semua pelarut punya efek akut yang sama: <strong>depresi susunan saraf pusat tergantung dosis</strong> — dari euforia dan pusing sampai anestesi. Narkosis ini efek dari <em>molekul induknya</em>: cepat muncul, cepat pulih, tanpa lesi spesifik. Kedalamannya mengikuti kelarutan lemak (relasi Meyer–Overton) — aseton lebih lemah dan lebih cepat dibersihkan daripada toluena.</p>
          <p>Pada campuran (yang di lapangan hampir selalu ada), efek tiap pelarut <strong>paling tidak aditif dan bisa sinergis</strong>. Ada pula cerita klasik 'toleransi akhir pekan': gejala pusing yang justru 'terobati' dengan alkohol adalah pola yang harus mengingatkan kita pada pajanan pelarut, bukan sekadar gaya hidup.</p>` },

        { type: "quiz", title: "Cek pemahaman — Unit 2", questions: [
          {
            stem: "Seorang teknisi mencuci tangan dengan pelarut di ruang tanpa ventilasi dan mulai merasa ringan-kepala. Sifat fisik apa yang paling menjelaskan paparan lewat napas, dan sifat apa yang menjelaskan paparan lewat kulit?",
            opts: [
              "Volatilitas menjelaskan paparan uap; lipofilisitas menjelaskan penetrasi kulit",
              "Volatilitas menjelaskan penetrasi kulit; lipofilisitas menjelaskan paparan uap",
              "Keduanya ditentukan titik didih, bukan struktur",
              "Volatilitas menentukan kedua jalur; lipofilisitas hanya menentukan bau"
            ],
            answer: 0,
            explainGood: "Tepat. Volatilitas = kecenderungan menguap → konsentrasi uap di zona pernapasan. Lipofilisitas = afinitas lemak → menembus lapisan lipid kulit. Dua pintu masuk, dua sifat.",
            explainBad: "Terbalik jika memilih B: yang menguap masuk lewat napas; yang larut lemak masuk lewat kulit. Titik didih dan bau bukan penentu jalur toksiknya."
          },
          {
            scenario: "Dua pekerja bertugas sama di satu bengkel. Pekerja A mengoleskan lem dari kaleng terbuka; Pekerja B menyalurkan lem dari sistem tertutup.",
            stem: "Perbedaan praktik ini paling relevan menjelaskan perbedaan apa?",
            opts: [
              "Paparan uap (inhalasi) — wadah terbuka memperbesar konsentrasi di zona pernapasan",
              "Tingkat narkosis kronis yang tidak dapat dipulihkan",
              "Jumlah metabolit yang dihasilkan hati, terlepas dari jalur pajanan",
              "Tidak ada perbedaan dosis internal karena NAB udara sama"
            ],
            answer: 0,
            explainGood: "Benar. Wadah terbuka = permukaan evaporasi besar = uap lebih banyak di zona pernapasan. Inilah dasar kontrol rekayasa tertutup dan penutup kaleng.",
            explainBad: "NAB udara adalah alat ukur pajanan, bukan penentu dosis internal. Narkosis akut reversibel; dan jumlah metabolit tetap bergantung dosis yang masuk — yang di sini memang berbeda lewat jalur uap."
          },
          {
            stem: "Mengapa 'bau pelarut' tidak dapat dijadikan sistem peringatan yang andal di tempat kerja?",
            opts: [
              "Ambang bau banyak pelarut jauh di atas Nilai Ambang Batasnya",
              "Semua pelarut tidak berbau pada konsentrasi berbahaya",
              "Penciuman menjadi lebih tajam seiring pajanan kronis",
              "Bau pelarut hanya muncul setelah efek kesehatan terjadi"
            ],
            answer: 0,
            explainGood: "Contoh ekstremnya metanol: ambang bau ±1.500 ppm, sementara NAB-nya 200 ppm — pada saat tercium, pajanan sudah jauh melewati batas. Narkosis justru menumpulkan penciuman.",
            explainBad: "Kebanyakan pelarut berbau — justru itu jebakannya. Dan penciuman tidak menjadi lebih tajam; ia kehilangan kepekaan pada pajanan terus-menerus (olfactory fatigue)."
          },
          {
            scenario: "Seorang pekerja memakai pelarut komersial 'heksana' yang sebenarnya campuran isomer (20–80% n-heksana).",
            stem: "Bagaimana komposisi ini mengubah penilaian risiko?",
            opts: [
              "Fraksi n-heksana adalah yang menghasilkan 2,5-heksandion, sehingga label 'heksana' harus dibaca menurut kadarnya",
              "Isomer bercabang sama berbahayanya dengan n-heksana",
              "Campuran selalu lebih toksik daripada zat murni karena efek sinergis",
              "Komposisi tidak relevan karena toksisitas ditentukan NAB udara semata"
            ],
            answer: 0,
            explainGood: "Benar. Yang bersifat γ-diketon (menyumbat transport akson) hanya metabolit n-heksana lurus. Perbellini (1981): pada konsentrasi udara setara, metabolit total n-heksana 3× dan 15× lebih tinggi daripada 2-metilpentana dan 3-metilpentana — isomer bercabang jauh lebih lemah.",
            explainBad: "Justru inilah poinnya: isomer bercabang tidak menghasilkan 2,5-HD secara berarti. 'Sinergis' berlaku untuk efek akut antar-pelarut, bukan alasan menyamakan isomer."
          }
        ] }
      ],
      keyPoints: [
        "Enam kelas = enam watak toksikologi; struktur kimia menentukan sumber kerja dan organ sasaran.",
        "Volatilitas → pintu napas; lipofilisitas → pintu kulit. Kerja fisik menaikkan serapan paru 2–3×.",
        "Narkosis adalah efek umum molekul induk (reversibel); toksisitas kronik khas biasanya karya metabolit."
      ]
    },

    /* ================= UNIT 3 ================= */
    {
      id: 3, slug: "unit-3", icon: "3",
      title: "Dosis: Udara yang Sama, Dosis yang Berbeda",
      short: "Dosis & NAB",
      minutes: 15,
      objectives: [
        "Menjelaskan rantai udara kerja → dosis internal dan faktor yang menggesernya.",
        "Membaca empat komponen NAB: TWA, STEL, C, dan notasi Kulit.",
        "Membandingkan kerangka OSHA PEL, NIOSH REL, ACGIH TLV, dan Permenaker 5/2018."
      ],
      sections: [
        { type: "text", html: `
          <p class="lead">Pengukuran udara memberi tahu kita <strong>dosis eksternal</strong> — konsentrasi di udara yang dihirup. Tetapi efek kesehatan dipicu oleh <strong>dosis internal</strong>: berapa yang benar-benar masuk, di mana, dan seberapa cepat dibersihkan. Keduanya dipisahkan oleh faktor-faktor yang bisa kita kendalikan — dan yang tidak.</p>` },

        { type: "chain", title: "Rantai pajanan", nodes: [
          { t: "Pekerjaan" }, { t: "Jalur (napas/kulit)" }, { t: "Dosis internal" }, { t: "Metabolit", hot: true }, { t: "Biomarker" }, { t: "Organ sasaran" }, { t: "NAB" }, { t: "Pengendalian" }
        ] },

        { type: "stats", items: [
          { num: "40–80%", lbl: "serapan paru pelarut pada keadaan istirahat" },
          { num: "2–3×", lbl: "kenaikan serapan paru saat kerja fisik" },
          { num: "±5×", lbl: "serapan aseton/n-butanol/xilena/stirena pada kerja berat (150 W) vs istirahat (Löf & Johanson)" },
          { num: "10×", lbl: "toluena jaringan lemak setelah kerja ringan vs istirahat" }
        ] },

        { type: "callout", variant: "data", title: "Keragaman biologis", html: `
          <p>Paparan udara yang sama dapat menghasilkan dosis internal berbeda karena: <strong>kerja fisik</strong>, <strong>lemak tubuh</strong> (toluena 10× lebih tinggi setelah kerja ringan), <strong>merokok/alkohol/obat</strong>, dan <strong>genetik metabolisme</strong> — mis. varian ADH2 cepat 5–20% orang Eropa vs ±85% orang Asia; GST-theta hilang pada 10–25% Eropa vs ±60% Asia. Penyerapan kulit antarindividu juga dapat berbeda minimal 4 kali.</p>` },

        { type: "spectrum", title: "Spektrum: zat induk membius vs metabolit merusak",
          lead: "Geser perhatian dari kiri ke kanan: makin ke kanan, makin penting biomarker metabolit dan observasi berjam-jam.",
          pins: [
            { label: "Toluena", x: 12 },
            { label: "PCE", x: 22 },
            { label: "THF", x: 32 },
            { label: "DCM", x: 50, mid: true },
            { label: "Metanol", x: 72, mol: true },
            { label: "n-Heksana", x: 86, mol: true },
            { label: "Glikol eter", x: 97, mol: true }
          ] },

        { type: "text", html: `
          <h2>Membaca angka NAB</h2>
          <p>Permenaker No. 5/2018 menetapkan Nilai Ambang Batas sebagai <strong>{{twa}} 8 jam</strong> (rata-rata tertimbang waktu, dengan faktor koreksi harian/mingguan bila jam kerja berbeda), <strong>{{stel}} 15 menit</strong> (pajanan jangka pendek), nilai <strong>C</strong> (plafon), serta <strong>{{notasi-kulit}}</strong> — tanda bahwa penyerapan dermal ikut menentukan dosis total, sehingga pemantauan udara saja tidak memadai.</p>` },

        { type: "table", title: "NAB pelarut kunci (Permenaker 5/2018, ppm; keterangan mengikuti tabel Kemnaker)", head: ["Pelarut", "TWA", "STEL/C", "Keterangan"], rows: [
          ["Toluena", "20", "—", "A4"],
          ["Benzena", "0,5", "2,5 (STEL)", "A1, Kulit"],
          ["n-Heksana", "500", "1.000 (STEL)", "—"],
          ["Diklorometana (DCM)", "50", "—", "A3, {{bei}}"],
          ["Perkloretilen (PCE)", "25", "100 (STEL)", "A3, BEI"],
          ["Metanol", "200", "250 (STEL)", "Kulit, BEI"],
          ["2-Metoksietil asetat", "0,1", "—", "Kulit, IPB (MAA)"]
        ], note: "Untuk toluena: NAB TWA 20 ppm — sama dengan ACGIH TLV yang diturunkan dari perlindungan penglihatan warna (biru–kuning) dan kehamilan. Stirena 20/40 ppm (A4)." },

        { type: "callout", variant: "rule", title: "Empat kerangka, empat logika", html: `
          <p><strong>{{pel}}</strong> = hukum (memperhitungkan kelayakan teknis-ekonomi) · <strong>{{rel}}</strong> = rekomendasi kesehatan · <strong>{{tlv}}</strong> = panduan profesional berbasis efek kritis · <strong>NAB Permenaker</strong> = hukum Indonesia.</p>
          <p>Bedanya bukan formalitas — selisihnya bisa tiga orden. EGME: OSHA PEL 25 ppm tetapi NIOSH REL <strong>0,1 ppm</strong>; EGEE: PEL 200 vs TLV 5 ppm; batas nasional TCE membentang <strong>3,3 mg/m³ (Austria) sampai 550 mg/m³ (Inggris)</strong> — 166 kali antar-negara untuk zat yang sama.</p>` },

        { type: "callout", variant: "warn", title: "Kesimpulan penting", html: `
          <p><strong>NAB adalah alat ukur, bukan jaminan aman.</strong> Angka berbeda antar-lembaga karena efek kritis yang dipilih dan kerangka kebijakannya berbeda. Karena dosis internal tidak pernah persis mengikuti udara, praktik terbaik: udara personal per tugas + perhatian jalur kulit + biomarker pada waktu yang tepat.</p>` },

        { type: "quiz", title: "Cek pemahaman — Unit 3", questions: [
          {
            scenario: "Pekerja bengkel lem sepatu: TWA n-heksana 480 ppm — 'di bawah NAB 500'. Ia bekerja tanpa sarung tangan; larutan lem basah di sarung kain yang dipakai berjam-jam.",
            stem: "Mengapa penilaian 'di bawah NAB' ini bisa menyesatkan?",
            opts: [
              "Penyerapan dermal dapat menambah dosis hingga ±50% dari dosis total, sehingga dosis internal bisa melampaui yang diwakili NAB",
              "Karena NAB n-heksana seharusnya 100 ppm",
              "Karena TWA tidak boleh dihitung untuk pelarut",
              "Karena pelarut campuran membatalkan validitas pengukuran"
            ],
            answer: 0,
            explainGood: "Benar. Cardona (1993): tanpa sarung tangan, ekskresi 2,5-HD 2,5 mg/L lebih tinggi pada paparan udara yang sama — serapan melalui kulit (percutaneous) bisa sampai 50% dosis total. Kulit basah + kontak lama = pintu kedua yang tidak terbaca oleh alat ukur udara.",
            explainBad: "TWA memang sah untuk pelarut, dan campuran tidak membatalkan pengukuran. Masalahnya adalah jalur masuk kedua (kulit) yang tidak diukur oleh sampel udara."
          },
          {
            stem: "Dua pekerja terpapar konsentrasi udara toluena yang sama; satu bekerja ringan di ruang terkontrol, satu mengangkat beban berat di ruang panas. Pernyataan mana yang paling tepat?",
            opts: [
              "Dosis internal pekerja yang bekerja berat bisa berkali-kali lipat lebih besar — pemantauan udara saja tidak pernah lengkap",
              "Dosis internal pasti sama karena konsentrasi udara sama",
              "Perbedaan dosis internal hanya relevan untuk pelarut halogen",
              "Ruang panas menurunkan serapan karena vasodilatasi"
            ],
            answer: 0,
            explainGood: "Benar. Kerja fisik menaikkan ventilasi dan aliran darah — serapan paru naik 2–3×, dan pada kerja berat hingga ±5× untuk beberapa pelarut. Ventilasi termal justru menaikkan evaporasi dan serapan.",
            explainBad: "Konsentrasi udara sama ≠ dosis internal sama. Dan pembeda ini berlaku untuk semua pelarut yang diserap paru — bukan hanya halogen."
          },
          {
            stem: "Untuk satu zat yang sama, OSHA PEL 200 ppm tetapi ACGIH TLV 5 ppm. Penjelasan paling tepat?",
            opts: [
              "Keduanya memilih efek kritis dan kerangka berbeda — PEL memperhitungkan kelayakan teknis-hukum, TLV berbasis kesehatan; batas terlindungi dipakai sebagai target desain",
              "Salah satu dari kedua angka pasti salah hitung",
              "TLV hanya berlaku untuk pekerja di bawah 40 tahun",
              "Selisih itu menandakan zat berubah sifat sejak PEL ditetapkan"
            ],
            answer: 0,
            explainGood: "Benar. Contoh riil: EGEE PEL 200 vs TLV 5 ppm; EGME PEL 25 vs NIOSH REL 0,1 ppm. Angka regulasi adalah pilihan kebijakan atas efek kritis + kelayakan — bukan kebenaran fisika tunggal.",
            explainBad: "Selisih tiga orden memang mencolok, tapi itu bukan salah hitung: ia mencerminkan tahun penetapan, basis hukum, dan efek kritis yang berbeda."
          },
          {
            scenario: "Permenaker menuliskan '2-Metoksietil asetat — 0,1 ppm — Kulit, IPB (MAA 1 mg/g kreatinin)'.",
            stem: "Apa konsekuensi praktis notasi 'Kulit' dan IPB pada baris ini?",
            opts: [
              "Kontrol harus menutup jalur dermal (sarung tahan pelarut) DAN memantau metabolit urin (MAA) — bukan hanya udara",
              "Cukup menaikkan frekuensi pengukuran udara dua kali",
              "Notasi Kulit berarti pelarut tidak boleh menyentuh pakaian, pengukuran udara tetap memadai",
              "IPB berarti batas untuk air minum, bukan pekerja"
            ],
            answer: 0,
            explainGood: "Benar. Notasi Kulit menandai kontribusi dermal terhadap dosis total; {{ipb}} mengukur metabolitnya (asam metoksiasetat) pada waktu spesimen yang tepat. Volatilitas rendah + serapan dermal besar membuat udara saja menipu.",
            explainBad: "Notasi Kulit justru sinyal bahwa pengukuran udara TIDAK memadai. IPB adalah indeks biologis pekerja (urin/darah), bukan air minum."
          }
        ] }
      ],
      keyPoints: [
        "Udara → dosis internal dipisahkan oleh kerja fisik, lemak tubuh, merokok/alkohol/obat, dan genetik.",
        "NAB punya empat komponen: TWA, STEL, C, notasi Kulit — plus IPB untuk pemantauan biologis.",
        "PEL/REL/TLV/NAB berbeda karena efek kritis dan kerangkanya berbeda; pilih batas paling protektif sebagai target."
      ]
    },

    /* ================= UNIT 4 ================= */
    {
      id: 4, slug: "unit-4", icon: "4",
      title: "Metabolisme: Zat Induk Membius, Metabolit Merusak",
      short: "Zat Induk vs Metabolit",
      minutes: 20,
      objectives: [
        "Menghubungkan jalur metabolisme tujuh pelarut dengan organ sasaran dan biomarkernya.",
        "Mengenali pola klinis enam kasus lapangan akibat paparan pelarut organik."
      ],
      sections: [
        { type: "text", html: `
          <p class="lead">Tabel lima baris ini tulang punggung TM 10 — dan inti kasus kita. Struktur menentukan <strong>kinetika</strong>; metabolisme menentukan <strong>toksisitas kronik</strong>. Molekul induk biasanya yang membius (narkosis); metabolit yang merusak (lesi organ, kanker, kebutaan).</p>` },

        { type: "flipcards", title: "Tujuh jalur metabolisme, tujuh organ sasaran", lead: "Klik kartu untuk membalik: sisi depan pelarut, sisi belakang metabolisme → efek → biomarker.", items: [
          { chem: "Alifatik", name: "n-Heksana", klass: "pelarut lem sepatu/tas",
            back: `CYP450 → heksanol → <b>{{25hd}}</b> (γ-diketon) → cross-linking neurofilamen → transport akson macet → <b>neuropati aksonal distal ({{dyingback}})</b>. Isomer bercabang jauh lebih lemah. Biomarker: 2,5-HD urin (IPB 0,4 mg/L, akhir pekan kerja). Setelah pajanan berhenti: metabolit hilang, gejala bisa berlanjut (efek {{coasting}}).` },
          { chem: "Aromatik", name: "Benzena", klass: "lem & bensin",
            back: `{{cyp2e1}} (hati) → fenol → hidrokuinon/katekol → ke sumsum tulang → {{aduksi}} DNA + stres oksidatif → <b>sitopenia → leukemia</b>. Efek darah terdokumentasi bahkan di bawah 1 ppm (Lan 2004: WBC 5.540 vs 6.480/µL pada mean 0,57 ppm). Biomarker: {{spma}}, {{mukonat}} (IPB 25 / 500 µg/g kreatinin).` },
          { chem: "Aromatik", name: "Toluena", klass: "percetakan rotogravure — pelarut kasus kita",
            back: `Narkosis oleh molekul induk; metabolit utama <b>{{asam-hipurat}}</b> (urin) — biomarker, bukan racun utama. Kronik: gangguan neuroperilaku & daya ingat (studi kasus kita), gangguan penglihatan warna, interaksi dengan bising (OR asam hipurat 1,76/g kreatinin untuk gangguan pendengaran). NAB TWA 20 ppm.` },
          { chem: "Halogen alifatik", name: "Diklorometana (DCM)", klass: "penghilang cat, degreasing",
            back: `Sebagian dimetabolisme CYP2E1 menjadi <b>CO endogen</b> → {{cohb}} naik perlahan dan bertahan lama → narkosis + hipoksia; pekerja jantung paling rentan. 100 ppm DCM ≈ 50 ppm CO. COHb bisa terus naik <b>setelah</b> keluar ruangan — observasi berjam-jam. OSHA: PEL 25/STEL 125 ppm.` },
          { chem: "Alkohol", name: "Metanol", klass: "anti-beku, cairan CNC",
            back: `ADH → formaldehida → <b>format</b> → hambat sitokrom c oksidase → <b>asidosis metabolik + cedera retina</b> (sel Müller). Jeda laten dua fase: narkosis awal → 10–30 jam tenang → gangguan visus. Antidot: {{fomepizol}}/etanol (blok ADH) + folat + bikarbonat + hemodialisis. IPB metanol urin 15 mg/L.` },
          { chem: "Eter", name: "Glikol eter (E-seri)", klass: "fotolitografi, cat, lem",
            back: `ADH/ALDH → <b>asam alkoksiasetat</b> (2-ME→MAA; 2-EE→EAA) → <b>toksisitas reproduksi & darah</b>. t½ MAA manusia 77 jam vs 9–14 jam tikus → sampling akhir pekan kerja. Volatilitas rendah + serapan dermal besar → udara saja menipu. IPB: MAA 1 / {{baa}} 100 mg/g kreatinin.` },
          { chem: "Halogen alifatik", name: "Trikloroetilena (TCE)", klass: "degreasing logam",
            back: `Dua jalur paralel: oksidasi P450 (→ TCA/TCOH; efek sistemik) vs <b>konjugasi GSH (→ {{dcvc}})</b> — genotoksin ginjal in situ. Kohort pekerja karton Henschler: 5 kanker ginjal vs 0 kontrol ({{sir}} 7,97). <b>IARC Group 1</b> (2014). Meta-RR ginjal 1,6 (1,3–2,0) pada paparan lebih tinggi.` }
        ] },

        { type: "accordion", title: "Enam kasus lapangan", lead: "Setiap cerita membuktikan satu baris tabel di atas.", items: [
          { t: "🥿 Klaster Istanbul — benzena & leukemia (Aksoy 1974)", html: `26 leukemia/preleukemia pada 28.500 pekerja sepatu; insidens 13/100.000 (latar 6/100.000; puncak 19,7). Konsentrasi udara saat lem dipakai: <b>210–650 ppm</b>; durasi pajanan rata-rata 9,7 tahun; usia diagnosis 34,2 tahun. AML 53,9%, eritroleukemia 11,5% — 'tanda tangan' benzena. Kohort Italia: lem mengandung 72–87% benzena sampai regulasi 1963; {{smr}} leukemia ≥200 ppm·tahun = 7,0 (1,9–18,0).` },
          { t: "🛁 Kamar mandi yang berubah jadi tempat kematian — DCM (MMWR 2012; OSHA/NIOSH 2013)", html: `13 kematian pekerja yang memperbaiki bak mandi ({{bathtub}}) pada 2000–2011. Rekonstruksi kasus indeks: kamar 5×8 ft, exhaust fan mati, {{striper}} 60–100% DCM; model: <b>92.949–154.916 ppm di dalam bak</b> ({{idlh}} 2.300). Enam ons striper cukup membunuh. COHb korban 0–5% → penyebab kematian <b>narkosis</b>, bukan keracunan CO klasik. Latex/nitrile tidak melindungi; kipas kamar mandi bukan ventilasi yang memadai.` },
          { t: "🖨️ Pendengaran printer — toluena + bising (Morata 1997)", html: `124 pekerja rotogravure (campuran ±90% toluena); 49% penurunan pendengaran frekuensi tinggi bilateral. Dalam model akhir hanya <b>usia dan asam hipurat</b> yang tersisa (OR 1,76 per g/g kreatinin; ≈4,4 pada BEI 2,5 g/g). Solusi ganda: kendalikan bising <b>dan</b> pelarut.` },
          { t: "📱 Metanol ilegal di pabrik ponsel — Korea 2018 (Kang dkk.)", html: `Subkontrak lapis ketiga mencuci aluminium {{cnc}} dengan metanol 99,9%. Udara <b>228,5–2.220 ppm</b> (±10× OEL); metanol urin 6,2× BEI. Gangguan penglihatan 29,7%, gejala SSP 31,6%. <b>80% {{dispatch}} (illegal dispatch), 41,3% migran, 49,7% berusia <29 tahun</b>; coolant etanol 4× lebih mahal — penyebab ekonominya jelas.` },
          { t: "🚢 Kebutaan setelah 27 jam — metanol di kapal (Alrougi 2025)", html: `Pelaut membuka drum metanol 99% untuk <i>{{wallwash}}</i> di ruang tertutup: inhalasi singkat + kontak dermal. <b>27 jam kemudian kebutaan bilateral total</b> (edema papil), pH 7,607 — alkalosis respiratorik, bukan asidosis klasik. Fomepizol 13 dosis, hemodialisis 4 sesi — kebutaan permanen.` },
          { t: "💻 Haid memanjang di fab semikonduktor — glikol eter (Hsieh 2005)", html: `606 pekerja perempuan; siklus &gt;35 hari: non-fab 11,3% vs <b>fotolitografi 27,0%</b>; OR terkontrol EGE+IPA <b>5,0 (1,7–14,1)</b>. {{maa}} menembus plasenta primata; sinyal terkuat pada ko-eksposisi EGE + isopropanol — satu studi positif bukan kuantifikasi risiko, melainkan sinyal kerja yang harus direspons.` }
        ] },

        { type: "callout", variant: "practice", title: "Tatalaksana metanol — tiga langkah", html: `
          <p><strong>1. Hentikan pembentukan formiat.</strong> Fomepizol atau etanol menghambat ADH secara kompetitif, sehingga metanol tidak lagi dioksidasi menjadi formiat (etanol memblokir total selama kadar etanolnya di atas 0,2 g/kg — Haffner 1992). <strong>2. Koreksi asidosis.</strong> Bikarbonat intravena bila pH &lt;7,2 agar formiat lebih mudah dibuang. <strong>3. Buang formiat dari tubuh.</strong> Hemodialisis bila ada asidemia, kadar metanol tinggi, atau gangguan penglihatan. Folat mempercepat pemecahan formiat. Jendela 10–30 jam adalah kesempatan terapi — jangan memulangkan cepat hanya karena pasien 'sudah di udara segar'.</p>` },

        { type: "quiz", title: "Cek pemahaman — Unit 4", questions: [
          {
            scenario: "Pria 28 tahun, pekerja pabrik sepatu, lima bulan kesemutan kaki yang makin naik, kini {{footdrop}} bilateral; {{sensasi-getar}} menurun di bagian distal, simetris. Tidak ada riwayat diabetes.",
            stem: "Metabolit mana yang paling mungkin menjadi penyebab pola ini?",
            opts: [
              "2,5-heksandion — γ-diketon dari n-heksana",
              "Asam hipurat — metabolit toluena",
              "Karbon monoksida — dari DCM",
              "{{asam-format}} — metabolit metanol"
            ],
            answer: 0,
            explainGood: "Benar. Pola neuropati aksional distal simetris yang kronis pada pekerja lem = aksonopati dying-back; racunnya 2,5-heksandion yang cross-link neurofilamen. Toluena menekan SSP (bukan pola ini); DCM hipoksia/COHb; format menyerang retina.",
            explainBad: "Asam hipurat adalah biomarker ekskresi toluena, bukan racun saraf perifer; CO menyerang darah/jantung; format menyerang retina. Pola distal dying-back adalah tanda tangan 2,5-HD."
          },
          {
            scenario: "Pekerja bathtub refinishing keluar dari kamar mandi kecil setelah 1 jam menggunakan striper DCM; di ruang terbuka ia justru makin lesu selama jam-jam berikutnya.",
            stem: "Penjelasan mekanistik yang paling tepat?",
            opts: [
              "DCM yang tersimpan di jaringan terus dimetabolisme menjadi CO setelah pajanan berhenti — COHb bisa terus naik, jadi observasi berjam-jam diperlukan",
              "Efek vasodilatasi pasca-pajanan yang jinak dan pulih sendiri",
              "Reaksi alergi terhadap pelarut yang baru muncul",
              "Keracunan CO dari udara luar yang lebih buruk"
            ],
            answer: 0,
            explainGood: "Benar. Leikin (1990): COHb bisa naik 2% → 8% dalam 8–9 jam meski korban sudah di O₂ 40–50%. Cadangan DCM di jaringan terus dipakai sebagai substrat oleh CYP2E1. Implikasi tatalaksana: observasi lanjutan + O₂ tinggi.",
            explainBad: "Ini bukan reaksi alergi maupun efek jinak; dan persoalannya justru CO yang dihasilkan dari dalam tubuh, bukan CO dari luar."
          },
          {
            scenario: "Dua pasien datang bersamaan: satu terpapar metanol, satu etilen glikol. Keduanya asidosis metabolik dengan anion gap tinggi.",
            stem: "Uji apa yang paling tepat membedakan keduanya — dan mengapa antidotnya sama?",
            opts: [
              "Metabolit urin: metanol → format; glikol → glikolat/oksalat. Keduanya dioksidasi ADH, sehingga blokade ADH (fomepizol/etanol) menolong keduanya",
              "CT kepala; keduanya menunjukkan lesi putamen",
              "{{osmol-gap}} saja; nilainya membedakan zat secara spesifik",
              "Gas darah arteri; pola pH berbeda spesifik per zat"
            ],
            answer: 0,
            explainGood: "Benar. Keduanya 'racun ADH' — antidot kompetitifnya sama, organ sasarannya berbeda karena metabolitnya berbeda (format → mitokondria retina; oksalat → tubulus ginjal). {{osmol-gap}} menandai adanya alkohol, bukan menentukan zatnya.",
            explainBad: "CT tidak diagnostik dini; osmol gap tidak spesifik; pola ABG tidak membedakan zat — yang membedakan adalah metabolit spesifik di urin."
          },
          {
            stem: "Mengapa toksisitas glikol eter (mis. 2-metoksigletanol) sering luput dari pemantauan udara?",
            opts: [
              "Volatilitas rendah dan serapan dermal besar — dosis total paling baik didekati dengan biomarker metabolit (MAA) di urin",
              "Karena efeknya hanya muncul lewat ingesti yang tidak diatur NAB",
              "Karena metabolitnya tidak dapat diukur di urin",
              "Karena NAB-nya terlalu rendah untuk diukur instrumen"
            ],
            answer: 0,
            explainGood: "Benar. Smallwood (1984): 'traditional air monitoring may be ineffective because of the low volatility of these solvents and the possible significant exposure via the skin.' MAA terukur di urin dengan t½ 77 jam pada manusia — sampling akhir pekan kerja.",
            explainBad: "Justru metabolitnya (MAA/BAA) adalah yang paling mudah diukur — dasar IPB Indonesia. Masalahnya bukan instrumen NAB, melainkan jalur masuk yang tak terbaca alat udara."
          },
          {
            scenario: "Sebuah kohort pekerja degreasing menunjukkan 5 kanker sel ginjal vs 0 di kelompok pembanding (SIR 7,97; latensi ≥18 tahun).",
            stem: "Pelarut dan jalur metabolisme mana yang paling konsisten dengan temuan ini?",
            opts: [
              "TCE — metabolit jalur konjugasi glutation (DCVC) yang genotoksik di ginjal; IARC Group 1",
              "Toluena — asam hipurat yang menumpuk di tubulus",
              "THF — iritasi membran mukosa berulang",
              "Benzena — {{kuinon}} mengaduksi DNA di tubulus ginjal"
            ],
            answer: 0,
            explainGood: "Benar — pola kohort karton Henschler (1995). Hati ← metabolit oksidatif; ginjal ← metabolit jalur {{gsh}} ({{dcvc}}). Ekskresi N-acetyl-DCVC lebih tinggi pada manusia daripada tikus — manusia mungkin lebih sensitif. IARC Vol. 106 menaikkan TCE ke Group 1.",
            explainBad: "Asam hipurat adalah biomarker toluena yang diekskresi, bukan genotoksin ginjal; THF bukan karsinogen ginjal; kuinon benzena menyerang sumsum tulang, bukan tubulus."
          }
        ] }
      ],
      keyPoints: [
        "Enam baris wajib: heksana→2,5-HD (saraf perifer); benzena→{{kuinon}} (sumsum); DCM→CO (darah/jantung); metanol→format (mata); glikol eter→MAA/BAA (reproduksi/darah); TCE→DCVC (ginjal).",
        "Metabolit menentukan organ sasaran; biomarker yang tepat harus dipilih pada waktu spesimen yang tepat.",
        "Waktu adalah terapi: DCM (COHb naik setelah pajanan) dan metanol (jeda laten 10–30 jam) mengajarkan observasi berjam-jam."
      ]
    },

    /* ================= UNIT 5 ================= */
    {
      id: 5, slug: "unit-5", icon: "5",
      title: "Investigasi: Membedah Studi Percetakan",
      short: "Investigasi Studi",
      minutes: 20,
      objectives: [
        "Mengevaluasi kualitas pengukuran pajanan (dosimetri, rekonstruksi masa lalu, verifikasi washout).",
        "Membaca hasil studi: hubungan pajanan kini dengan daya ingat, dan ketiadaan hubungan dengan gejala serta pajanan kumulatif.",
        "Menarik simpulan berhati-hati: apa yang dibuktikan, apa yang belum."
      ],
      sections: [
        { type: "text", html: `
          <p class="lead">Kembali ke kasus Unit 1. Studi yang menanggapi kekhawatiran itu kini sudah kita pahami kerangkanya. Sebelum melihat hasilnya, bedah dulu <strong>caranya mengukur</strong> — karena kualitas simpulan tidak pernah lebih baik daripada kualitas pengukurannya.</p>` },

        { type: "accordion", title: "Bagaimana mereka mengukur", items: [
          { t: "📏 Pajanan kini — 231 dosimeter pasif", html: `Lencana GABIE di zona pernapasan, ±7,5 jam. Pabrik A: seluruh relawan terpapar dipasangi dosimeter 3 hari berturut-turut. Pabrik B: pengukuran 4 hari mencakup semua bengkel, jenis kerja, dan tiga shift; tiap pekerja diberi nilai rata-rata bengkelnya ({{heg}}). Analisis {{gcfid}} sesuai AFNOR NF X 43-251. Hasil: Pabrik A 0–18 ppm; Pabrik B 2–27 ppm. Sampel terbanyak ditaruh di bengkel tertinggi (32 sampel untuk bengkel I₁, rata-rata 27,6 ppm).` },
          { t: "🕰️ Pajanan masa lalu — faktor K = 6,6", html: `24 sampel individual dari 1981 (lokasi lama Pabrik B) dibandingkan dengan pengukuran kini: rasio lampau/kini diasumsikan sama antar-bengkel, diestimasi dengan {{anova}} dua faktor (bengkel × era). Hasil: <b>K = 6,6</b> — pindah gedung menurunkan paparan 6,6 kali. Estimasi pajanan lampau: 0–179 ppm. Estimasi ini dicek terhadap database pajanan okupasional nasional dan dinyatakan serupa.` },
          { t: "🫁 Verifikasi washout — udara hembusan", html: `59 sampel {{napas-hembusan}} pada pekerja yang jeda {{washout}} ≥48 jamnya diragukan. Semua di bawah ambang eksklusi 5 ppm: rentang 0–1 ppm (mean 0,57; SD 0,53), satu mencapai 4 ppm — terlacak ke aktivitas mengecat hobi sehari sebelumnya. Desain bekerja: tak ada efek akut yang tercampur.` },
          { t: "🧠 Efek — EUROQUEST + enam tes NES", html: `{{euroquest}} (83 butir; lima domain termasuk domain koreksi kepribadian: kecemasan & kepekaan lingkungan). Enam tes komputer NES: waktu reaksi sederhana (SRT), substitusi simbol-digit (SDS), <b>{{dsf}} dan {{dsb}}</b>, memori pola (PM), pembelajaran asosiatif & recall (AL/AR). Timer kuarsa eksternal mengoreksi lag 7–21 ms antar-komputer. {{confounder}} yang disesuaikan: jenis kelamin, umur, skor kosakata, riwayat penyakit SSP, alkohol, obat psikoaktif 24 jam, konsentrasi mengerjakan tes, pengalaman komputer.` },
          { t: "⚖️ Indeks kumulatif — {{cei}}", html: `{{cei}} = Σ(intensitas ppm × tahun per bengkel); rentang 0–2.353 ppm·tahun (mean 392 ± 526). Ini pengujian terpisah: apakah <b>total pajanan seumur kerja</b> (efek kumulatif-ireversibel) berkaitan dengan efek — berbeda dari pertanyaan paparan kini.` }
        ] },

        { type: "bars", title: "Paparan per bengkel — Pabrik B (ppm, rata-rata)", lead: "Kuning = estimasi lokasi lama 1981 (sebelum K=6,6); teal = saat pengukuran 1996. Pindah gedung benar-benar membersihkan udara — dan justru itu yang membuat pertanyaan kadar rendah penting.", rows: [
          { name: "Bengkel I₁ (mesin cetak 1)", sub: "32 sampel — tertinggi", val: 27.6, old: 179 },
          { name: "Bengkel J₁ (penyelesaian & pengiriman)", sub: "17 sampel", val: 28.6, old: 168 },
          { name: "Bengkel I₂ (mesin cetak 2)", sub: "19 sampel", val: 23.4, old: 146 },
          { name: "Bengkel K₂ (elistrik)", sub: "15 sampel", val: 23.6, old: 155 },
          { name: "Bengkel J₂ (pembentukan/kirim 2)", sub: "22 sampel", val: 20.7 },
          { name: "Bengkel K₁ (mesin)", sub: "9 sampel", val: 24.5, old: 135 },
          { name: "Bengkel G (mutu)", sub: "5 sampel", val: 16.8 },
          { name: "Bengkel H (blok cetak)", sub: "16 sampel", val: 5.6, old: 54 },
          { name: "Bengkel F (reprografi)", sub: "10 sampel", val: 2.0 }
        ] },

        { type: "reveal", title: "Prediksi dulu — lalu buka hasilnya", lead: "Anda sudah tahu desainnya. Sebelum membuka, prediksikan: apa yang akan ditemukan?", items: [
          { q: "Bagaimana hubungan paparan KINI dengan tes daya ingat (Digit Span)?", a: `<b>Turun, signifikan.</b> Setelah penyesuaian konfounder: DSF turun ±1 digit per 36–40 ppm (P=0,04); DSB turun ±1 digit per 25–26 ppm (P=0,01). Penurunan DSB setara menua 14 tahun; DSF setara menua 25 tahun (kecepatan menua normal menurunkan 1 digit per ±25 tahun).` },
          { q: "Bagaimana dengan tes lain — waktu reaksi, substitusi simbol, memori pola?", a: `<b>Tidak konsisten dengan efek neurotoksik.</b> SRT dan SDS tidak berhubungan dengan paparan; AL/AR turun (arah efek) tapi tidak signifikan setelah penyesuaian. Daya ingat jangka pendek tampaknya fungsi paling awal yang terganggu.` },
          { q: "Apakah gejala neurotoksik (EUROQUEST) ikut naik dengan paparan?", a: `<b>Tidak signifikan.</b> Domain gejala akut dan kognisi-suasana sedikit naik dengan paparan kini, tapi tidak bermakna statistik (P=0,23 dan 0,49) — setelah skor dikoreksi trait kepribadian (kecemasan, kepekaan lingkungan).` },
          { q: "Apakah pajanan KUMULATIF (CEI) menunjukkan hubungan?", a: `<b>Tidak.</b> CEI tidak berhubungan dengan tes maupun gejala (satu-satunya sinyal lemah: PM-SD, P=0,05). Tiga penjelasan: kekuatan statistik terbatas, ketidakpastian rekonstruksi pajanan lampau, dan kemungkinan toksisitas toluena <b>reversibel</b> — efek mengikuti paparan kini, bukan menumpuk.` }
        ] },

        { type: "chart", title: "Dose–effect: Digit Span vs paparan toluena kini (Chouanière dkk., 2002, Tabel IV)" },

        { type: "callout", variant: "data", title: "Cara membaca angka ini", html: `
          <p>Pada bengkel dengan paparan rerata <strong>±27 ppm</strong> — sementara <strong>NAB-nya 20 ppm TWA</strong> dan seluruh angkanya di bawah 50 ppm — rerata penurunan Digit Span mundur kira-kira <strong>satu digit</strong>, setara menua ±14 tahun. Yang kecil justru pesannya: efek ini muncul <em>di bawah</em> rentang yang dulu dianggap hampir aman (50 ppm), dan pengujiannya menyingkirkan efek akut.</p>` },

        { type: "callout", variant: "warn", title: "Keterbatasan yang harus diakui", html: `
          <p><strong>1)</strong> Partisipasi Pabrik B 43%; bengkel paling terpapar hanya 24% — rentang pajanan menyempit. <strong>2)</strong> Paparan lampau direkonstruksi (tak terukur langsung); asumsi rasio tetap bisa salah klasifikasi. <strong>3)</strong> Ketiadaan hubungan CEI tidak membuktikan keamanan dari pajanan lama — bisa jadi masalah kekuatan statistik. <strong>4)</strong> Satu studi; penulis meminta studi lanjutan dengan desain longitudinal dan tes memori kerja yang lebih spesifik.</p>` },

        { type: "quiz", title: "Cek pemahaman — Unit 5", questions: [
          {
            scenario: "Tabel IV studi: DSB rerata per strata paparan kini — 6,33 (bebas), 5,89 (<5 ppm), 5,54 (5–15), 5,03 (15–25), 4,56 (≥25 ppm).",
            stem: "Pola ini paling tepat dibaca sebagai…",
            opts: [
              "Hubungan dosis–efek monoton: makin tinggi paparan kini, makin rendah kinerja daya ingat mundur",
              "Efek acak tanpa arah karena selisihnya kecil",
              "Bukti kelompok tak terpapar lebih sehat secara umum (healthy worker effect)",
              "Bukti kausal yang final karena desainnya eksperimental"
            ],
            answer: 0,
            explainGood: "Benar — tren menurun monoton dari 6,33 ke 4,56, dengan slope terkontrol −3,9/100 ppm (P=0,01). Peneliti menunjukkan hubungan dosis–efek, bukan sekadar beda dua kelompok.",
            explainBad: "Selisih kecil per orang tetap bermakna secara statistik dengan n=128 dan penyesuaian konfounder. {{healthy-worker}} bekerja ke arah menutupi efek, bukan menciptakan tren ini. Dan ini studi observasional — bukan eksperimen."
          },
          {
            stem: "Kesimpulan penulis bahwa efeknya 'bukan efek akut' bertumpu terutama pada…",
            opts: [
              "Pengujian di luar jendela pajanan akut (≥48 jam) yang diverifikasi napas hembusan — semua di bawah 5 ppm",
              "Fakta bahwa tes komputer diambil di ruang tenang di pabrik",
              "Rerata usia kelompok yang tinggi",
              "Ketiadaan keluhan subjektif pada kuesioner"
            ],
            answer: 0,
            explainGood: "Benar. Tanpa verifikasi washout, kinerja rendah bisa jadi sisa pajanan kemarin. Udara hembusan (mean 0,57 ppm; satu 4 ppm dari mengecat hobi) menutup pintu itu.",
            explainBad: "Ruang tenang menjaga kualitas tes, bukan menyingkirkan efek akut. Keluhan subjektif justru tidak berhubungan dengan paparan. Usia adalah konfounder yang disesuaikan, bukan bukti."
          },
          {
            stem: "Mengapa skor gejala EUROQUEST bisa 'tidak berhubungan' sementara tes kinerja 'berhubungan'?",
            opts: [
              "Pelaporan gejala dipengaruhi trait (kecemasan, kepekaan lingkungan) yang dikoreksi dalam analisis; efek dini sering sub-klinis dan baru tampak pada tes",
              "Karena kuesionernya terlalu pendek",
              "Karena pekerja tidak jujur tentang gejalanya",
              "Karena tes komputer lebih mudah daripada kuesioner"
            ],
            answer: 0,
            explainGood: "Benar. Domain 4–5 EUROQUEST mengukur trait untuk mengoreksi bias pelaporan; sisa sinyalnya tidak signifikan (P=0,23/0,49). Literatur: tes kinerja bisa terganggu sebelum gejala dilaporkan.",
            explainBad: "Panjang kuesioner (83 butir) dan kejujuran bukan inti penjelasan metodologisnya; koreksi trait-lah yang mengubah hasil."
          },
          {
            scenario: "CEI (ppm·tahun) tidak berhubungan dengan satu pun tes utama maupun gejala.",
            stem: "Penjelasan yang PALING adil menurut penulis studi adalah…",
            opts: [
              "Kombinasi kekuatan statistik terbatas, ketidakpastian rekonstruksi pajanan lampau, dan kemungkinan toksisitas yang reversibel (mengikuti paparan kini)",
              "Bukti pasti bahwa pajanan lama tidak berpengaruh apa pun",
              "Bukti bahwa CEI salah dihitung",
              "Bukti bahwa efek toluena murni psikologis"
            ],
            answer: 0,
            explainGood: "Benar — penulis mengakui tiga kemungkinan itu terbuka. Tidak adil menyimpulkan 'pajanan lama aman' dari ketiadaan hubungan; bisa jadi kekuatan statistik atau salah klasifikasi yang menyembunyikannya.",
            explainBad: "Ketiadaan bukti bukan bukti ketiadaan. CEI dihitung dengan metode yang dinyatakan dan dicek silang — dan simpulan 'psikologis' tidak didukung oleh adanya hubungan dosis–efek pada paparan kini."
          },
          {
            scenario: "Anda merancang studi lanjutan sesuai saran penulis.",
            stem: "Perbaikan desain mana yang paling langsung menjawab kelemahan utama studi ini?",
            opts: [
              "Desain longitudinal yang mengikuti pekerja (termasuk setelah pajanan turun/berhenti) + tes memori kerja yang lebih spesifik",
              "Menambah jumlah sampel udara di bengkel bebas pajanan",
              "Mengganti kuesioner dengan wawancara bebas",
              "Menyamarkan nama pelarut dari pekerja saat tes"
            ],
            answer: 0,
            explainGood: "Benar — dua usulan eksplisit penulis: longitudinal (menangkap evolusi dan pemulihan, menjawab pertanyaan reversibilitas) dan tes memori spesifik (memori jangka pendek/kerja).",
            explainBad: "Sampel tambahan di kelompok bebas tidak menjawab kelemahan utama; wawancara bebas justru kurang terstandar; membutakan nama pelarut tidak mengubah desain silang yang statis."
          }
        ] }
      ],
      keyPoints: [
        "Kekuatan studi: pajanan kini terukur baik (231 sampel), washout terverifikasi, konfounder disesuaikan — sehingga hubungan dosis–efeknya kredibel.",
        "Hasil inti: DSB −1 digit per ~25 ppm (P=0,01), DSF −1 digit per ~36–40 ppm (P=0,04) — pada paparan jauh di bawah 50 ppm.",
        "Gejala subjektif dan pajanan kumulatif tidak berhubungan — lembutkan simpulan, jangan melampaui bukti."
      ]
    },

    /* ================= UNIT 6 ================= */
    {
      id: 6, slug: "unit-6", icon: "6",
      title: "Simpul: Dari Bukti ke Tindakan",
      short: "Dari Bukti ke Tindakan",
      minutes: 15,
      objectives: [
        "Menerjemahkan temuan studi menjadi keputusan pengendalian bertingkat.",
        "Mengaitkan NAB, IPB, dan hierarki pengendalian pada kasus percetakan."
      ],
      sections: [
        { type: "text", html: `
          <p class="lead">Kesimpulan studi berbunyi tenang namun tegas:</p>
          <blockquote class="quote">Studi ini menunjukkan bahwa neurotoksisitas toluena dapat terjadi bahkan pada kadar paparan kini yang rendah. Tes daya ingat tampak terganggu paling awal oleh toluena.<span class="q-src">Chouanière dkk., 2002 — diterjemahkan dari Conclusion</span></blockquote>
          <p>Apa artinya bagi pabrik, regulator, dan pekerja? Tiga langkah: <strong>membaca angka regulasi dengan benar</strong>, <strong>menata pengendalian bertingkat</strong>, dan <strong>memantau pada waktu yang tepat</strong>.</p>` },

        { type: "table", title: "Toluena: satu angka, banyak konteks", head: ["Kerangka", "Nilai", "Catatan"], rows: [
          ["NAB Permenaker 5/2018", "TWA 20 ppm", "Hukum Indonesia; faktor koreksi harian/mingguan bila jam kerja berbeda"],
          ["ACGIH TLV", "20 ppm (A4)", "Diturunkan untuk melindungi penglihatan warna biru–kuning & kehamilan"],
          ["Level studi kita", "0–27 ppm", "Efek memori terukur pada rentang ini — di bawah 50 ppm"],
          ["Pajanan lampau (estimasi)", "hingga 179 ppm", "K = 6,6 setelah pindah gedung — rekayasa bekerja"]
        ], note: "A4 = tidak tergolong karsinogen manusia (ACGIH). Bandingkan benzena: A1 + notasi Kulit + IPB — satu cincin aromatik, kebijakan berbeda." },

        { type: "chain", title: "Hierarki pengendalian — diterapkan ke percetakan", nodes: [
          { t: "Substitusi tinta/limbah rendah toluena" }, { t: "Sistem tertutup + {{lev}}" }, { t: "Rotasi & jadwal tanpa kelebihan jam" }, { t: "Respirator sebagai cadangan terakhir" }
        ] },

        { type: "flipcards", title: "Pelajaran pengendalian dari kasus-kasus lain", lead: "Empat kartu — satu prinsip per kartu.", items: [
          { chem: "Rekayasa", name: "K = 6,6", klass: "pindah gedung & mesin baru",
            back: `Pabrik percetakan menurunkan paparan <b>6,6×</b> hanya dengan pindah ke gedung/mesin bersih. Frederick (1984): LEV lokal menurunkan paparan metanol duplikator sampai <b>96%</b>. Rekayasa bekerja — bila mau diterapkan.` },
          { chem: "Substitusi", name: "Etanol vs metanol", klass: "ekonomi penggantian",
            back: `Pabrik ponsel Korea memakai metanol karena 4× lebih murah dari etanol — hasilnya kebutaan pekerja. Substitusi harus dinilai dari toksisitas <b>metabolitnya</b>, bukan harga per liter. Di-/tri-glikol eter (MAA 0,5–1,1%) adalah contoh substitusi yang didasarkan metabolisme.` },
          { chem: "APD", name: "Batas sarung tangan", klass: "ketika {{apd}} satu-satunya pilihan",
            back: `Untuk DCM 1.000 ppm, {{cartridge}} uap organik standar jebol dalam <b>15,8 menit</b>; latex/nitrile/neoprene/butyl <b>tidak</b> melindungi dari striper — hanya {{laminate}}. Kipas kamar mandi dan jendela bukan ventilasi yang memadai (OSHA/NIOSH 2013).` },
          { chem: "Biologi", name: "Waktu spesimen", klass: "biomonitoring yang benar",
            back: `2,5-HD: awal pekan + <b>akhir shift akhir pekan</b> ({{nmam}} 8318). MAA: akhir pekan kerja (t½ 77 jam). COHb/DCM: puncak tertunda — ukur berjam-jam. Merokok menaikkan 2,5-HD; TTMA dipengaruhi diet & rokok; GSTT1-null tidak menghasilkan SPMA — pilih penanda sesuai pajanan (Rahimpoor 2023).` }
        ] },

        { type: "callout", variant: "practice", title: "Rencana aksi untuk pabrik percetakan", html: `
          <ol style="margin:0;padding-left:20px;color:var(--ink-soft)">
            <li><strong>Ukur per tugas</strong>, bukan hanya rata-rata pabrik: sampling personal per bengkel/shift, perhatikan puncak (loading mesin, pembersihan rol).</li>
            <li><strong>Tutup pintu napas</strong>: sistem tinta tertutup + LEV pada zona evaporasi; verifikasi dengan pengukuran ulang.</li>
            <li><strong>Tutup pintu kulit</strong>: sarung tahan pelarut untuk kontak tinta/limbah; larang sarung kain.</li>
            <li><strong>Biomonitoring</strong>: asam hipurat urin akhir shift untuk pekerja paparan tinggi; jangan lupakan ko-paparan bising (pendengaran).</li>
            <li><strong>Skrining kesehatan</strong>: pertanyaan daya ingat/konsentrasi pada P2K; intervensi dini jauh sebelum gangguan klinis.</li>
          </ol>` },

        { type: "quiz", title: "Cek pemahaman — Unit 6", questions: [
          {
            stem: "NAB toluena menurut Permenaker 5/2018 adalah…",
            opts: [
              "TWA 20 ppm",
              "TWA 50 ppm",
              "STEL 20 ppm tanpa TWA",
              "TWA 0,5 ppm"
            ],
            answer: 0,
            explainGood: "Benar — TWA 20 ppm (dengan faktor koreksi bila jam kerja tidak standar). Angka ini sejajar ACGIH TLV; 0,5 ppm adalah TWA benzena.",
            explainBad: "50 ppm adalah angka lama/level literatur yang dulu dianggap batas neurotoksisitas jelas — justru studi kita menunjukkan efek di bawahnya. STEL 20 bukan bentuk penetapannya."
          },
          {
            scenario: "Manajemen pabrik percetakan meminta satu langkah pengendalian paling efektif dengan anggaran terbatas.",
            stem: "Menurut hierarki pengendalian, mana yang benar?",
            opts: [
              "Substitusi/sistem tertutup + ventilasi eksor lokal pada sumber evaporasi — sebelum APD",
              "Membagikan masker debu kepada semua pekerja",
              "Rotasi pekerja agar tiap orang paparannya pendek",
              "Menurunkan target ke 'hanya di bawah NAB' tanpa mengukur ulang"
            ],
            answer: 0,
            explainGood: "Benar. Hierarki: eliminasi/substitusi → rekayasa (tertutup, LEV) → administratif → APD terakhir. Bukti studinya sendiri: rekayasa (gedung baru) menurunkan paparan 6,6×; LEV menurunkan paparan metanol hingga 96%.",
            explainBad: "Masker debu tidak menyaring uap organik; rotasi membagi dosis ke lebih banyak orang tanpa menurunkan bahaya; dan 'lolos NAB' bukan target desain melainkan batas minimum."
          },
          {
            scenario: "Seorang inspektur menemukan pekerja bathtub refinishing memakai sarung latex dan kipas kamar mandi saat memakai striper DCM.",
            stem: "Penilaian yang paling tepat?",
            opts: [
              "Kontrol tidak memadai: latex tidak melindungi dari DCM dan kipas kamar mandi/jendela bukan ventilasi memadai — diperlukan sarung laminate PE/EVOH + ventilasi mekanis/{{scba}} sesuai kondisi",
              "Kontrol memadai karena DCM volatil dan cepat hilang",
              "Cukup menambah waktu kerja istirahat",
              "Masalah hanya muncul jika tercium bau menyengat"
            ],
            answer: 0,
            explainGood: "Benar — langsung dari Hazard Alert OSHA/NIOSH 2013. 13–14 kematian terdokumentasi dengan pola kontrol yang persis gagal seperti ini; ruang kecil + uap berat (tergenang di zona napas) memperparah.",
            explainBad: "DCM memang volatil — justru itu masalahnya. Bau bukan pemicu aman; narkosis bisa datang sebelum alarm penciuman bermakna."
          },
          {
            stem: "Untuk pekerja percetakan yang berencana biomonitoring asam hipurat, keputusan 'waktu spesimen' yang tepat dan alasannya…",
            opts: [
              "Urin akhir shift pada hari kerja — asam hipurat ber-t½ pendek mencerminkan pajanan hari tersebut",
              "Urin Senin pagi — memantau akumulasi mingguan",
              "Darah saat istirahat panjang — asam hipurat menumpuk dalam darah",
              "Rambut — untuk pajanan tiga bulan terakhir"
            ],
            answer: 0,
            explainGood: "Benar. Asam hipurat cepat diekskresi; sampel akhir shift mencerminkan paparan hari itu. (Kebalikannya untuk 2,5-HD dan MAA yang ber-t½ panjang → akhir pekan kerja.) Perlu diingat latar diet asam hipurat 1–1,5 g/hari menjadikannya kurang spesifik di bawah ~50 ppm.",
            explainBad: "Senin pagi justru mengukur sisa akhir pekan (untuk metabolit lama). Asam hipurat tidak menumpuk di darah; rambut bukan spesimen standar biomonitoring pelarut."
          }
        ] }
      ],
      keyPoints: [
        "Kesimpulan studi → kebijakan: efek memori di bawah 50 ppm menjustifikasi TLV 20 ppm & pengendalian yang tidak menunggu gejala.",
        "Hierarki pengendalian bekerja dan terbukti: K=6,6 dari rekayasa gedung; 96% dari LEV.",
        "Biomonitoring tepat waktu adalah penutup mata rantai: penanda yang tepat, spesimen yang tepat, waktu yang tepat."
      ]
    }
  ],

  /* ================= ASESMEN AKHIR ================= */
  assessment: {
    title: "Asesmen Akhir: Kasus Progresif",
    minutes: 15,
    intro: `
      <p class="lead">Sekarang giliran Anda. Kasus berikut menggabungkan semua unit — jawab lapis demi lapis. Setiap jawaban akan langsung diberi umpan balik.</p>
      <div class="callout data"><div class="co-title">📋 Lapis 1 — Keluhan</div>
      <p>Sebuah percetakan kemasan (rotogravure) menerima laporan: beberapa operator mesin cetak <em>"sering salah menghitung, susah mengingat instruksi baru"</em>. {{p2k}} mencatat TWA toluena area 15–27 ppm per bengkel — semua "di bawah NAB 20". Manajemen berpendapat tidak ada masalah.</p></div>`,
    questions: [
      {
        scenario: "Lapis 1 — Keluhan & angka NAB.",
        stem: "Sebagai anggota tim kesehatan kerja, sikap paling tepat terhadap angka 'di bawah NAB' adalah…",
        opts: [
          "NAB adalah alat ukur pajanan udara, bukan jaminan bebas efek — terutama karena bukti menunjukkan efek memori pada rentang yang sama, dan dosis internal bisa berbeda dari udara",
          "Menerima angka itu sebagai bukti tidak adanya risiko kesehatan",
          "Mengabaikan keluhan karena keluhan subjektif tidak dapat diukur",
          "Menunggu keluhan menjadi penyakit klinis yang jelas sebelum bertindak"
        ],
        answer: 0,
        explainGood: "Tepat. Studi percetakan Perancis mendokumentasikan penurunan Digit Span pada 0–27 ppm. Angka NAB membaca pajanan udara; efek kesehatan dibaca dari dosis internal, waktu, dan kerentanan individual.",
        explainBad: "Justru pelajaran utama kasus ini: 'di bawah NAB' bukan 'tanpa efek', dan keluhan neuroperilaku justru dapat diukur secara objektif dengan tes kinerja."
      },
      {
        scenario: "Lapis 2 — Pengukuran. Anda diberi anggaran satu kampanye pengukuran di bengkel mesin cetak (tiga shift, banyak tugas).",
        stem: "Rancangan pengukuran yang paling tepat?",
        opts: [
          "Sampling personal dengan dosimeter pasif pada sampel pekerja per tugas dan per shift (homogeneous exposure groups), disertai catatan tugas puncak",
          "Satu alat statis di tengah ruang selama satu shift pagi",
          "Mengukur hanya saat manajemen berkunjung",
          "Mengandalkan data {{msds}} tinta untuk menghitung paparan"
        ],
        answer: 0,
        explainGood: "Benar — ini yang dilakukan studi: dosimeter personal ±7,5 jam, diperbanyak pada bengkel tertinggi (32 sampel untuk I₁), mencakup ketiga shift, per kelompok paparan homogen. Sampel statis melewatkan puncak tugas; MSDS tidak menggantikan pengukuran.",
        explainBad: "Sampel statis dan satu shift tidak mewakili variabilitas tugas; MSDS menyebut kandungan, bukan paparan udara; pengukuran sewaktu berkunjung bias seleksi paling parah."
      },
      {
        scenario: "Lapis 3 — Pemeriksaan. Anda menguji kinerja kognitif dan gejala para operator.",
        stem: "Keputusan desain pemeriksaan yang paling penting agar hasil terbaca sebagai efek kronis?",
        opts: [
          "Menguji setelah jeda bebas pajanan ≥48 jam (mis. Senin pagi), diverifikasi toluena udara hembusan bila diragukan",
          "Menguji Jumat sore agar paparan mingguan penuh terwakili",
          "Menguji sambil bekerja agar kondisi nyata",
          "Menguji hanya pekerja yang mengeluh"
        ],
        answer: 0,
        explainGood: "Benar — replikasi langsung desain Chouanière: 48 jam bebas pajanan + verifikasi napas hembusan (semua <5 ppm di studi) menutup efek akut.",
        explainBad: "Jumat sore justru mencampur efek sisa hari itu; menguji sambil bekerja mengukur narkosis akut; menguji hanya pengeluh memecah validitas pembanding."
      },
      {
        scenario: "Lapis 4 — Hasil. Tes Anda menunjukkan kinerja Digit Span mundur menurun mengikuti paparan bengkel; skor gejala tidak berbeda dari kelompok admin.",
        stem: "Penafsiran yang paling tepat?",
        opts: [
          "Konsisten dengan literatur: tes kinerja bisa terganggu sebelum gejala dilaporkan; laporkan sebagai temuan dini yang perlu ditindak dan diverifikasi longitudinal",
          "Karena gejala tidak naik, tidak perlu tindakan",
          "Hasil ini membuktikan penyebabnya pasti toluena tanpa perlu mempertimbangkan faktor lain",
          "Hasil harus dibuang karena tidak sejalan dengan keluhan pekerja"
        ],
        answer: 0,
        explainGood: "Benar. Pola yang sama dengan studi percetakan: tes kinerja berhubungan, gejala tidak (setelah koreksi trait). Tindakan pengendalian tidak menunggu gejala; simpulan kausal tetap berhati-hati (konfounder, validitas tes, desain silang).",
        explainBad: "Ketiadaan gejala bukan ketiadaan efek (unit 5); bukti kausal dari studi silang tidak pernah 'pasti'; dan data yang tidak searah keluhan tetap data — justru di situlah triangulasi bekerja."
      },
      {
        scenario: "Lapis 5 — Satu operator memakai sarung tangan kain yang basah oleh lem untuk membersihkan rol; toluena di tinta, pelarut pembersih berbasis glikol eter.",
        stem: "Risiko tambahan yang paling mungkin terlewat oleh pemantauan udara?",
        opts: [
          "Serapan dermal — dari toluena kontak kulit dan glikol eter ber-volatilitas rendah yang paling baik dipantau lewat metabolit urin",
          "Ingesti kronis dari makanan di kantin",
          "Radiasi dari mesin cetak",
          "Alergi terhadap kertas"
        ],
        answer: 0,
        explainGood: "Benar. Dua pintu dermal sekaligus: toluena (lipofilik) dan glikol eter (serapan dermal besar, volatilitas rendah — notasi Kulit + IPB MAA/BAA). Ingat Dutkiewicz: penyelupan tangan metanol 2 menit ≈ menghirup 50 mg/m³ 8 jam.",
        explainBad: "Ingesti dan radiasi bukan jalur utama di sini; alergi kertas bukan risiko toksikologis pelarut. Yang terlewat pemantauan udara adalah kulit."
      },
      {
        scenario: "Lapis 6 — Keputusan. Manajemen meminta satu prioritas pengendalian tahun ini.",
        stem: "Prioritas pertama yang paling tepat?",
        opts: [
          "Rekayasa di sumber: sistem tinta/limbah tertutup + ventilasi eksor lokal pada zona evaporasi, lalu verifikasi dengan pengukuran ulang",
          "Menyediakan masker debu kepada seluruh pekerja",
          "Menambah kipas plafon di ruang produksi",
          "Memindahkan keluhan ke unit HR untuk pendampingan psikologis"
        ],
        answer: 0,
        explainGood: "Benar — hierarki pengendalian. Bukti dari unit 6: pindah gedung menurunkan paparan 6,6×; LEV menurunkan paparan metanol 96%. Rekayasa di sumber menaikkan seluruh populasi paparan turun, tanpa bergantung kepatuhan individu.",
        explainBad: "Masker debu tidak menyaring uap; kipas plafon hanya mendaur ulang udara ruang; dan mengalihkan isu ke psikologis mengabaikan bukti dosis–efek yang sudah ada."
      },
      {
        scenario: "Lapis 7 — Dua tahun kemudian, sebuah bengkel lain di perusahaan (pabrik sepatu, grup yang sama) melaporkan kesemutan kaki pekerja lem.",
        stem: "Langkah paling awal yang paling tepat?",
        opts: [
          "Riwayat tugas + pemeriksaan neurologis pola distal + biomonitoring 2,5-HD urin pada akhir pekan kerja — mengantisipasi neuropati n-heksana",
          "Menunggu semua pekerja sakit untuk memastikan wabah",
          "Mengganti semua pelarut dengan DCM yang 'lebih ringan'",
          "Melakukan pengukuran udara satu kali di titik keluhan"
        ],
        answer: 0,
        explainGood: "Benar. Pola kesemutan distal pada pekerja lem = tanda bahaya (red flag) neuropati 2,5-HD; biomarkernya punya aturan waktu (akhir pekan kerja; hilang setelah pajanan berhenti — biomarker negatif 3 minggu kemudian tidak meniadakan diagnosis).",
        explainBad: "Menunggu wabah menunda diagnosis yang justru bisa dicegah; DCM jauh lebih berbahaya (CO endogen); satu titik pengukuran tidak menangkap variabilitas tugas."
      },
      {
        scenario: "Lapis 8 — Refleksi. Anda diminta melatih tim baru.",
        stem: "Satu kalimat inti yang paling merangkum seluruh modul ini?",
        opts: [
          "Baca angka NAB sebagai titik awal, bukan titik akhir: struktur menentukan metabolisme, metabolisme menentukan organ — dan dosis internal tidak pernah persis sama dengan udara",
          "Pelarut organik aman selama di bawah NAB",
          "Semua efek pelarut bersifat akut dan reversibel",
          "Pemantauan udara cukup untuk semua pelarut tanpa kecuali"
        ],
        answer: 0,
        explainGood: "Tepat — inilah benang merah dari Chouanière (efek di bawah 50 ppm), Cardona (dermal 50%), Lan (efek <1 ppm + genetik), sampai glikol eter (volatilitas rendah menipu udara).",
        explainBad: "Tiga opsi lain persis kesalahan yang dibantah modul ini: NAB sebagai jaminan, efek hanya akut, dan udara sebagai satu-satunya pintu."
      }
    ]
  },

  /* ================= REFERENSI ================= */
  references: [
    "<b>Chouanière D, Wild P, Fontana JM, Héry M, Fournier M, Baudin V, Subra I, Rousselle D, Toamain JP, Saurin S, Ardiot MR.</b> Neurobehavioral disturbances arising from occupational toluene exposure. <i>Am J Ind Med.</i> 2002;41(1):77–88. doi:10.1002/ajim.10030 — <em>studi kasus utama modul ini (ajim.10030.pdf)</em>",
    "<b>Bruckner JV, Anand SS, Warren DA.</b> Solvents. Dalam: <i>Casarett &amp; Doull's Toxicology: The Basic Science of Poisons</i>, 9th ed. McGraw-Hill; 2019: Bab 24.",
    "<b>Harrison R, Roisman G.</b> Solvents. Dalam: LaDou J, Harrison R, ed. <i>CURRENT Occupational &amp; Environmental Medicine</i>, 5th ed. McGraw-Hill; 2014: Bab 32.",
    "<b>Hammond D, Roberts S, dkk.</b> <i>Hamilton &amp; Hardy's Industrial Toxicology</i>, 6th ed. Wiley; 2015.",
    "<b>Kementerian Ketenagakerjaan RI.</b> Peraturan Menteri Ketenagakerjaan No. 5 Tahun 2018 tentang Keselamatan dan Kesehatan Kerja Lingkungan Kerja (NAB Faktor Kimia, Faktor Fisika, FBE) — Lampiran I–II.",
    "<b>Morata TC, Figuerola MA, dkk.</b> Toluene and hearing loss. <i>Scand J Work Environ Health.</i> 1997;23(4):289–298. doi:10.5271/sjweh.222",
    "<b>Aksoy M, Dinçol K, Erdem S, Akgun T.</b> Leukemia in shoe-workers exposed chronically to benzene. <i>Blood.</i> 1974;44(6):837–841.",
    "<b>Lan Q, Zhang L, Li G, dkk.</b> Hematotoxicity in workers exposed to low levels of benzene. <i>Science.</i> 2004;306(5702):1774–1776.",
    "<b>Seniori Costantini A, dkk.</b> Benzene exposure and leukemia/mortality dalam kohort percetakan Italia. <i>Scand J Work Environ Health.</i> 2003;29(1):51–59.",
    "<b>Cardona A, dkk.</b> Biological monitoring of occupational exposure to n-hexane by measurement of urinary 2,5-hexanedione. <i>Int Arch Occup Environ Health.</i> 1993;65:71–74.",
    "<b>Perbellini L, dkk.</b> Metabolit n-heksana vs isomernya pada manusia dan tikus. <i>Br J Ind Med.</i> 1981;38:20–26.",
    "<b>Löf A, Johanson G.</b> Toxicokinetics of organic solvents. <i>Crit Rev Toxicol.</i> 1998;28(6):571–650.",
    "<b>MMWR.</b> Deaths from acute exposure to methylene chloride (2000–2011). <i>Morb Mortal Wkly Rep.</i> 2012;61(8):119–122.",
    "<b>OSHA/NIOSH.</b> Hazard Alert — Methylene Chloride Hazards for Bathtub Refinishers. 2013.",
    "<b>Leikin JB, dkk.</b> Keracunan diklorometana: laporan kasus dan mekanisme COHb tertunda. <i>Am J Emerg Med.</i> 1990.",
    "<b>Henschler D, Vamvakas S, Lammert M, dkk.</b> Increased incidence of renal cell tumors in a cohort of cardboard workers exposed to trichloroethylene. <i>Arch Toxicol.</i> 1995;69(5):291–299.",
    "<b>IARC.</b> Trichloroethylene, Tetrachloroethylene, and Some Other Chlorinated Agents. <i>IARC Monographs</i> Vol. 106. Lyon; 2014.",
    "<b>Kang CW, Kim H, Shin K, Ryu J, Jung-Choi K, Lim KH, Kim JH.</b> Toxic effects of methanol among illegally dispatched workers at aluminum CNC cutting process… <i>Int J Environ Res Public Health.</i> 2018;15(7):1332.",
    "<b>Alrougi A, dkk.</b> Metanol blindness aboard a merchant vessel — case report. <i>Front Med.</i> 2025;12:1545428. doi:10.3389/fmed.2025.1545428",
    "<b>Hsieh GY, dkk.</b> Prolonged menstrual cycles in female workers exposed to ethylene glycol ethers in the semiconductor manufacturing industry. <i>Occup Environ Med.</i> 2005;62:510–516.",
    "<b>Kelsey KT, dkk.</b> Glycol ethers — kinetic & toxicologic review (E-series). <i>Regul Toxicol Pharmacol.</i> 2022;129:105113.",
    "<b>Rahimpoor R, dkk.</b> Biological monitoring of benzene exposure — systematic review of 66 studies. 2023.",
    "<b>Mayan O, dkk.</b> 2,5-Hexanedione as biomarker of n-hexane exposure. <i>Int Arch Occup Environ Health.</i> 2002.",
    "<b>NIOSH.</b> Manual of Analytical Methods (NMAM), 5th ed. — Method 8318: 2,5-Hexanedione in urine. 2020."
  ]
};
