# Next.js İleri Seviye Kavramlar — Haftalık Notlar

---

## İçindekiler

1. [Dependency Array ve Observer Pattern](#1-dependency-array-ve-observer-pattern)
2. [Loading, Suspense ve Streaming](#2-loading-suspense-ve-streaming)
3. [Error Handling](#3-error-handling)
4. [Routing Patterns](#4-routing-patterns)
5. [API Endpoints ve Veri Akışı](#5-api-endpoints-ve-veri-akışı)
6. [Middleware](#6-middleware)
7. [İlk İki Hafta ile Bağlantı](#7-i̇lk-i̇ki-hafta-ile-bağlantı)

---

## 1. Dependency Array ve Observer Pattern

### Dependency Array (Bağımlılık Dizisi)

React'e **"Bu işlemi sadece şu değerler değiştiğinde tekrar yap"** dediğimiz kontrol mekanizmasıdır.

**Arka planda çalışma prensibi:**

- **Referans Eşitliği** prensibini kullanır
- Adımlar: Saklama → Karşılaştırma → Sığ Karşılaştırma

React bir bileşeni tekrar render ederken `useEffect`'in yanına gelir, cebindeki eski değerlerle dizideki yeni değerleri karşılaştırır. Dependency array bir **"güvenlik kapısı"** gibi çalışır.

---

### Observer Design Pattern (Gözlemci Tasarım Kalıbı)

Bir nesnede meydana gelen değişiklikleri, bu nesneye bağımlı olan diğer tüm nesnelere otomatik olarak bildiren **davranışsal (behavioral)** bir tasarım kalıbıdır.

> **Örnek:** YouTube'a video yüklendiğinde her aboneye bildirim gitmesi.

Bir olay gerçekleştiğinde **Subject** (Konu), elindeki listedeki herkesi tek tek arayıp güncelleme yapmalarını ister. Bu nesneler arası bir diyalogdur.

---

### Karşılaştırma

| Kavram | Tür | Açıklama |
|--------|-----|----------|
| Observer | Tasarım Kalıbı | State değişimini bileşeni uyandırmak için kullanır |
| Dependency Array | Kontrol Mekanizması | Uyanan bileşenin hangi yan etkilerinin çalışacağını filtreler |

- **State Değişimi:** Observer mantığıyla bileşeni uyandırır.
- **Dependency Array:** Uyanan bileşenin içindeki hangi yan etkilerin (side-effects) gerçekten çalışması gerektiğini filtreler.

---

## 2. Loading, Suspense ve Streaming

### 2.1. `loading.tsx` Konvansiyonu

`loading.tsx` = O route yüklenirken geçici olarak gösterilen ekran.

```
app/dashboard/loading.tsx
```

Bu dosya varsa, `/dashboard` sayfası yüklenirken **önce `loading.tsx` görünür**, ardından gerçek sayfa render olur.

---

### 2.2. Manual Suspense Boundaries

| Özellik | Route-Level | Component-Level |
|---------|-------------|-----------------|
| Dosya | `loading.tsx` | `<Suspense>` |
| Yönetim | Otomatik | Manuel |
| Kapsam | Tüm segment | Tek component |
| Loading | Genel | Spesifik |

**Component-Level Suspense:**
- Sayfanın sadece **bir kısmı** geç yüklensin, diğerleri hemen görünsün.
- Genelde `async` olan, yani bekleyen component'leri `<Suspense>` içine alırız.

> **Not:** `fallback` içeriğini ilgili component'in bağlamına göre özelleştirin. Her Suspense için aynı "Yükleniyor…" yazısını kullanmayın.

| Kavram | Nedir? | Ne işe yarar? |
|--------|--------|---------------|
| Suspense | React Bileşeni (Araç) | Veri bekleyen bir parçayı sarmalamak için kullanılan etikettir |
| Boundary (Sınır) | Mimari Kavram (Sonuç) | Suspense ile sarmaladığın bölgenin oluşturduğu "yükleme etki alanı"dır |

---

### 2.3. Streaming Davranışı

Streaming şunu der: **Hazır olan kısmı hemen gönder, geç gelen kısmı sonra gönder.**

HTML parça parça akar. Kullanıcı deneyimi:
1. Sayfa hemen açıldı
2. Bazı bölümler sonra doldu

> **Not:** Suspense = streaming **değildir**, ama streaming'in çalışmasını sağlayan araçtır. Suspense olmasa streaming olmaz.

**Parçalı Render Akışı:**

```
Server render başlar
│
├── Header hazır         → hemen gönder
│
├── StatsPanel bekliyor  → fallback gönder
│
└── 4 saniye sonra       → gerçek veri gönder
```

---

### Node.js Runtime ve Edge Runtime

**Normal Sistem (Node.js Runtime):**
```
Türkiye → Almanya (Server) → cevap → Türkiye
```
Mesafe var, biraz gecikme var.

**Edge Runtime:**
```
Türkiye → İstanbul Edge Server → cevap
```
Daha yakın, daha hızlı. Kodun kullanıcının bulunduğu yere en yakın sunucuda çalışması.

| Runtime | Nerede Çalışır | Streaming |
|---------|---------------|-----------|
| Node.js | Normal server | Var |
| Edge | CDN kenarı | Var |

---

## 3. Error Handling

### 3.1. Expected Error (Beklenen Hata)

Olabileceğini bildiğimiz, **normal bir durum**. Bug değil, sistem bozulmadı.

**Örnekler:**
- Şifre yanlış
- Email formatı hatalı
- Form boş gönderildi
- API 404 döndü
- Ürün bulunamadı

**Form boş gönderildi — Server tarafı:**
```ts
if (!name) {
  return NextResponse.json(
    { error: "İsim alanı zorunludur." },
    { status: 400 }
  )
}
```

**Client tarafında:**
```ts
if (!res.ok) {
  setMessage(data.error)
}
```

**API başarısız oldu — Teknik hata:**
```ts
catch (err) {
  console.error(err)
  return NextResponse.json(
    { error: "Sunucu hatası oluştu." },
    { status: 500 }
  )
}
```

---

### 3.2. Uncaught Exceptions (Beklenmeyen İstisnalar)

Uygulama içinde oluşan ve kod tarafından **yakalanıp kontrol altına alınmamış** hatadır.

| Özellik | Expected Error | Uncaught Exception |
|---------|---------------|-------------------|
| Beklenti | Beklenen | Beklenmeyen |
| Durum | Normal durum | Bug |
| Kontrol | Kontrollü | Kontrolsüz |
| throw | Etmeyiz | Genelde throw olur |

> Her uncaught exception bir bug'dır. Ama her bug uncaught exception değildir.

**Error Boundary mekanizması:**

```
Component → hata fırlatır (throw)
     ↓
Error boundary yakalar
     ↓
Uygulama crash olmaz
     ↓
Hata UI gösterilir
```

Error boundary varsa kullanıcıya "Tekrar dene" gibi seçenek sunulabilir.

---

## 4. Routing Patterns

Routing patterns, web uygulamalarında sayfa yönlendirmeyi nasıl organize ettiğimizi anlatan mimari yaklaşımlardır.

### 4.1. Parallel Routes

- Aynı sayfada birden fazla panel render edilir
- Paneller birbirinden **bağımsız** çalışır
- `@` prefix kullanılır

```
Örnek: Sol panel (menu) + Sağ panel (content)
```

---

### 4.2. Intercepting Routes

Route navigation'ı "yakalar", modal veya overlay açmak için kullanılır.

> **Örnek:** Fotoğrafa tıklayınca sayfayı tamamen değiştirmeden modal açılması.

**Doğrudan URL erişimi (Direct navigation):**
- Kullanıcı URL'i tarayıcıya manuel yazar
- Sayfa baştan full render edilir
- Intercepting modal behavior garanti değildir

**Uygulama içi geçiş (Intercepted navigation):**
- Kullanıcı uygulama içindeki linke tıklar
- Route navigation yakalanır
- İçerik modal overlay şeklinde gösterilir
- Mevcut sayfa context'i korunur

> **Önemli:** Intercepting Routes çalışması için sayfanın yenilenmemesi gerekir. `<a>` etiketi yerine `next/link` kullanmalısınız.

**`(.)detail` ne işe yarar?**
`/inbox/detail` sayfasına gitmek yerine, `(.)detail` klasöründeki içeriği (modalı) mevcut sayfanın üzerine açar.

---

### 4.3. Tutarlı İsimlendirme Kuralları

| Segment Türü | Yazım Kuralı | Örnek Dosya Yolu |
|-------------|-------------|-----------------|
| Statik Route | Küçük harf ve tire (kebab-case) | `app/user-settings/page.tsx` |
| Dinamik Route | Köşeli parantez içinde küçük harf | `app/posts/[id]/page.tsx` |
| Catch-all | Üç nokta ve isim | `app/docs/[...slug]/page.tsx` |
| Özel Dosyalar | Sabit Next.js konvansiyon isimleri | `loading.tsx`, `error.tsx`, `layout.tsx` |

---

### 4.4. Dosya Sisteminin URL'e Yansıması

| Dosya Yolu | URL Adresi | Açıklama |
|-----------|-----------|---------|
| `app/page.tsx` | `/` | Ana sayfa (Root) |
| `app/about/page.tsx` | `/about` | Statik segment |
| `app/blog/[slug]/page.tsx` | `/blog/merhaba-dunya` | Dinamik segment |
| `app/inbox/(.)detail/page.tsx` | `/inbox/detail` | Intercepting Route |
| `app/api/posts/route.ts` | `/api/posts` | API endpoint |

---

## 5. API Endpoints ve Veri Akışı

API Endpoints, bir yazılımın veya sunucunun dış dünya ile iletişim kurduğu **"kapılar"** veya **"adresler"**dir.

### HTTP Metotları

| Metot | Kullanım |
|-------|---------|
| `GET` | Sunucudan veri almak |
| `POST` | Sunucuya yeni veri göndermek |
| `PUT/PATCH` | Mevcut veriyi güncellemek |
| `DELETE` | Veriyi silmek |

---

### Pages Router vs App Router

| Özellik | Pages Router (`pages/api/*`) | App Router (`app/api/*/route.ts`) |
|---------|------------------------------|-----------------------------------|
| Mimari Yapı | Node.js tabanlı (Express.js benzeri) | Web Standard API tabanlı |
| HTTP Metotları | Tek fonksiyonda if/switch ile | Her metot için ayrı fonksiyon |
| Runtime | Genellikle Node.js | Hem Node.js hem Edge Runtime |
| Performans | Yüksek cold start süresi | Düşük gecikme, streaming desteği |
| Veri Önbellekleme | Manuel cache-control header'ları | Next.js yerleşik fetch cache |
| Kod Okunabilirliği | Uzun switch bloklarına açık | Temiz, modüler, fonksiyon odaklı |

> Yeni bir projeye başlıyorsan **App Router (route.ts)** kullanman önerilir.

---

### 5.1. Static vs Dynamic Endpoints

**Statik Endpoint:** URL adresi sabit, her çağrıldığında aynı türde genel veri kümesi döner.

**Dinamik Endpoint:** URL'in bir kısmı değişken (parametre). Belirli bir öğenin detayına ulaşmak için kullanılır.

---

### Dynamic Segment vs Catch-all Segment

| Özellik | Dynamic Segment (`[id]`) | Catch-all (`[...slug]`) |
|---------|--------------------------|------------------------|
| Görünüm | `[değişken]` | `[...değişken]` |
| Kapasite | Sadece 1 parça yakalar | Sınırsız sayıda parça yakalar |
| Sonuç Tipi | String | Array |
| Hata Durumu | `/api/posts/1/detay` → hata | `/api/posts/1/detay/resim` → çalışır |

---

### 5.2. Caching (Önbellekleme)

**"Bir veriyi bir kez al, sakla ve tekrar tekrar sorma"** mantığı.

**Caching uygun olan endpoint'ler:**
- Blog yazıları ve haber içerikleri
- Ürün katalogları
- Şehir/kategori listeleri
- Hava durumu (belirli aralıklarla)

**Caching uygun OLMAYAN endpoint'ler:**
- Kullanıcı profil bilgileri
- Banka bakiyesi / cüzdan bilgisi
- Canlı borsa ve döviz verileri
- Alışveriş sepeti

**Süreli önbellekleme (Revalidation):**
```ts
fetch(url, { next: { revalidate: 60 } })
```
Veriyi 60 saniyede bir tazeler.

---

### 5.3. Streaming Response

Geleneksel API: Tüm veri hazır → tek paket gönderilir.

Streaming: Verinin ilk kısmı hazır olunca hemen gönderilir, geri kalanı arkadan gelir.

> Tıpkı bir YouTube videosunun tamamının inmesini beklemeden izlemeye başlamak gibi.

---

## 6. Middleware

Middleware, Next.js uygulamalarında **request server'a ulaşmadan önce** çalışan ara katman mekanizmasıdır. **Edge Runtime** üzerinde çalışır.

**Yapabilecekleri:**
- Request'in kaynağını kontrol etmek
- Authentication doğrulaması yapmak
- Koşula göre route yönlendirmesi yapmak
- Cookies veya headers bilgisine bakmak

**Çalışma sırası:**
```
1. Request → Kullanıcı linke tıklar (/dashboard)
2. Middleware → İsteği yakalar, kodu çalıştırır
3. Karar → next() veya redirect()
4. Route Render → page.tsx veya route.ts çalışır
5. Response → Sayfa kullanıcıya gönderilir
```

---
# Middleware Analizi

## Ne Yapar?

| # | Görev | Açıklama |
|---|-------|----------|
| 1 | **Maskeleme** | `/kutuphane` → arkada `/api/books` çalışır, URL değişmez |
| 2 | **Güvenlik** | `/api/member-only` yollarında cookie yoksa `403` ile keser |
| 3 | **Header Ekleme** | Her response'a `X-Library-Name` ve `X-Request-ID` ekler |

## Akış

```
İstek gelir
  ↓
/kutuphane       → rewrite → /api/books
/api/member-only → cookie yok mu? → 403 kes
diğer            → header ekle → geç
```

## Matcher

```typescript
matcher: ['/api/:path*', '/kutuphane']
```

Sadece bu iki yolda çalışır, geri kalanına dokunmaz.

### 6.1. Matcher

Middleware'in hangi URL'lerde çalışacağını belirler.

```ts
export const config = {
  matcher: ["/dashboard/:path*"]
};
```

| Tür | Kullanım | Örnek |
|----|---------|-------|
| Tek Route | Sadece bir sayfayı korumak | `matcher: '/dashboard'` |
| Route Grubu | Klasörün altındaki her şeyi korumak | `matcher: '/api/:path*'` |
| Hariç Tutma | "Şunlara dokunma" (negative lookahead) | Resimler ve logolar için |

---

### 6.2. Cookies ve Headers

| Özellik | Headers | Cookies |
|---------|---------|---------|
| Amaç | Request metadata taşımak | Kullanıcı veri saklamak |
| Kalıcılık | Genelde geçici | Tarayıcıda saklanabilir |
| Kullanım | Authentication kontrol | Session yönetimi |
| Odak | Request bilgisi | User state |

---

### 6.3. Middleware İşlem Türleri

| İşlem | URL Değişir mi? | Sayfa Render Olur mu? | Temel Amaç |
|-------|----------------|----------------------|-----------|
| Redirect | Evet | Hayır (yeni sayfaya gider) | Kullanıcıyı başka yere taşımak |
| Rewrite | Hayır | Evet (gizlice) | URL yapısını bozmadan içerik değiştirmek |
| Header | Hayır | Evet | Ekstra bilgi eklemek |
| Direct Response | Hayır | Hayır | İsteği anında sonlandırmak |

---

### 6.4. Middleware Kullanım Prensipleri

**"Minimum İş, Maksimum Hız"** prensibiyle çalışmalıdır.

1. **Karmaşık işlemlerden kaçının** — Ağır veritabanı sorguları veya büyük kütüphaneler çalıştırmayın
2. **Matcher ile kapsamı daraltın** — Sadece gerçekten kontrol gerektiren yollarla sınırlandırın
3. **İş mantığını buraya taşımayın** — Middleware bir sayfanın içeriğini hazırlama yeri değildir
4. **"Early Return" stratejisi** — İstek uygun değilse en üstte işlemi bitirin

---

## 7. İlk İki Hafta ile Bağlantı

### İlk Hafta → Bu Hafta Karşılaştırması

| Özellik | İlk Hafta Mantığı (React) | Bu Hafta Mantığı (Next.js) |
|---------|--------------------------|---------------------------|
| Loading | `if (loading) return <Loading />` | `loading.tsx` — Dosya tabanlı otomatik state |
| Error | `try { ... } catch (err) { setError(err) }` | `error.tsx` — Error Boundaries |
| Streaming | Sayfanın tamamını bekleme | `Suspense` ile ağır bileşenleri state'ten bağımsız yükleme |

> Bu hafta öğrenilen yapılar, ilk hafta öğrenilen React yapılarını **otomatik hale getirdi**.

---

### İkinci Hafta Bağlantısı

2. Hafta dosya düzeni ve "Her şeyin bir yeri var" mantığı, bu haftaki `route.ts` ya da `(.)detail` gibi yapıların daha kolay kavranmasını sağladı.

---

### Stories Projesi Güçlendirme Önerileri

- **Intercepting Routes** `((..)stories)` → Hikaye kısmı modal olarak sayfa üzerinde açılabilir
- **Parallel Routes** `(@stories)` → Hikaye ekle, eklenen hikayeler, story viewer, story bar kısımları birleştirilebilir
- **Middleware** → Kullanıcı etkinlikleri kontrol altına alınabilir
- **Suspense** → Her hikaye verisini Suspense içine alarak kullanıcı akışı daha akıcı hale getirilebilir

---

### Full Stack Perspektifi

- **Veri Güvenliği ve Doğrulama** — Bu veriyi isteyen kişi gerçekten üye mi? Gönderdiği veriler güvenli mi?
- **Durum Kodları ve Hata Yönetimi** — Sistemin "neden" hata verdiğini anlatmak gerekir
- **Gizli Bilgilerin Korunması** — Middleware ile frontend kodunun dışarıya açık olması kontrol altına alınabilir
- **İstek ve Yanıt Başlıklarının Yönetimi** — Artık "zarfın üzerindeki bilgilerle" de ilgileniyoruz
- **Performans ve Kaynak Yönetimi** — Frontend'den farklı olarak sunucu kaynaklarını yönetiyoruz